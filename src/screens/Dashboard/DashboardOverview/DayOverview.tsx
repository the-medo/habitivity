import React, { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { CompletedDays } from '../../../helpers/types/CompletedDay';
import { Spin } from 'antd';
import StatisticRow from '../../../components/global/StatisticRow';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useGetTasksByTaskListQuery } from '../../../apis/apiTasks';
import { TaskType } from '../../../types/Tasks';
import { formatUnits } from '../../../helpers/numbers/formatUnits';
import { getValueFromDay } from '../../../helpers/points/getValueFromDay';
import { getStatsInDateRange } from '../../../helpers/points/getStatsInDateRange';
import { getTaskUnit } from '../../../helpers/tasks/getTaskUnit';

interface DayOverviewProps {
  date: Dayjs;
  displayAverage: boolean;
  displayUnits: boolean;
  completedDaysData: CompletedDays | undefined;
  selectedTaskListId: string | undefined;
}

const DayOverview: React.FC<DayOverviewProps> = ({
  date,
  displayAverage,
  displayUnits,
  completedDaysData,
  selectedTaskListId,
}) => {
  const taskGroup = useSelector((state: ReduxState) => state.dashboard.segmentTaskGroup);
  const task = useSelector((state: ReduxState) => state.dashboard.segmentTask);
  const dateRange = useSelector((state: ReduxState) => state.dashboard.dateRange);
  // const groupsOrTasks = useSelector((state: ReduxState) => state.dashboard.segmentGroupsOrTasks);

  const { data: existingTasks, isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);

  const isLoading = useMemo(
    () => isFetchingTasks || !completedDaysData || !selectedTaskListId,
    [completedDaysData, isFetchingTasks, selectedTaskListId],
  );

  const taskDefinition = useMemo(() => {
    return existingTasks?.find(t => t.id === task);
  }, [task, existingTasks]);

  const formatter = useMemo(() => {
    if (taskDefinition) {
      if (
        [TaskType.UNITS, TaskType.UNIT_CHECKPOINTS, TaskType.DURATION].includes(
          taskDefinition.taskType,
        )
      ) {
        return (value: number) => value.toString();
      }
      return (value: number) => formatUnits(taskDefinition, value);
    }
  }, [taskDefinition]);

  const units = useMemo(() => {
    if (!displayUnits || task === 'all') return 'Points';
    if (taskDefinition) return getTaskUnit(taskDefinition);
    return 'Points';
  }, [displayUnits, task, taskDefinition]);

  const data = useMemo(() => {
    if (completedDaysData && selectedTaskListId) {
      const today = date.format('YYYY-MM-DD');
      const yesterday = date.subtract(1, 'day').format('YYYY-MM-DD');

      const completedToday = completedDaysData[today];
      const completedYesterday = completedDaysData[yesterday];

      const currentValue = getValueFromDay(
        completedToday,
        selectedTaskListId,
        taskGroup,
        task,
        displayUnits,
      );
      let lastValue = getValueFromDay(
        completedYesterday,
        selectedTaskListId,
        taskGroup,
        task,
        displayUnits,
      );

      if (displayAverage) {
        const stats = getStatsInDateRange({
          dateRange,
          completedDaysData,
          selectedTaskListId,
          taskGroup,
          task,
          takeUnits: displayUnits,
          includeLastDay: false,
        });
        lastValue = stats.avg ?? 0;
      }

      return {
        currentValue: currentValue,
        lastValue: lastValue,
      };
    }

    return undefined;
  }, [
    completedDaysData,
    selectedTaskListId,
    date,
    taskGroup,
    task,
    displayUnits,
    displayAverage,
    dateRange,
  ]);

  return (
    <Spin spinning={isLoading}>
      <StatisticRow
        date={date}
        valueCurrent={data?.currentValue}
        valueLast={data?.lastValue}
        isUnits={displayUnits}
        isAverage={displayAverage}
        units={units}
        formatter={formatter}
        taskType={taskDefinition?.taskType}
      />
    </Spin>
  );
};

export default DayOverview;
