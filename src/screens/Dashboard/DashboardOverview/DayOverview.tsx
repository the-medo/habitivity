import React, { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { CompletedDay, CompletedDays } from '../../../helpers/types/CompletedDay';
import { Spin } from 'antd';
import StatisticRow from '../../../components/global/StatisticRow';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { getDateRange } from '../../../helpers/date/getDateRange';
import { useGetTasksByTaskListQuery } from '../../../apis/apiTasks';
import { TaskType } from '../../../types/Tasks';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { formatUnits } from '../../../helpers/numbers/formatUnits';

interface DayOverviewProps {
  date: Dayjs;
  displayAverage: boolean;
  displayUnits: boolean;
  completedDaysData: CompletedDays | undefined;
  selectedTaskListId: string | undefined;
}

const getValueFromDay = (
  data: false | CompletedDay | undefined,
  selectedTaskListId: string,
  taskGroup: string,
  task: string,
  takeUnits: boolean,
) => {
  let val;
  if (taskGroup === 'all') {
    val = data ? data.taskLists[selectedTaskListId] ?? 0 : 0;
  } else {
    if (task === 'all') {
      val = data ? data.taskGroups[taskGroup] ?? 0 : 0;
    } else {
      val = data ? (takeUnits ? data.tasks[task]?.value : data.tasks[task]?.points) ?? 0 : 0;
    }
  }

  return val;
};

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
    if (!displayUnits || task === 'all') {
      return 'Points';
    }

    if (taskDefinition) {
      if (taskDefinition.taskType === TaskType.TIME) {
        return 'Time';
      } else if (taskDefinition.taskType === TaskType.CHECKBOX) {
        return 'Completion';
      } else if (taskDefinition.taskType === TaskType.OPTIONS) {
        return 'Points';
      } else {
        return capitalizeFirstLetter(taskDefinition.taskUnits.twoAndMore);
      }
    }
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

      let sum = 0;
      let count = 0;
      if (displayAverage) {
        getDateRange(dateRange).forEach(date => {
          const completedDay = completedDaysData[date.format('YYYY-MM-DD')];
          if (completedDay !== undefined) {
            sum += getValueFromDay(completedDay, selectedTaskListId, taskGroup, task, displayUnits);
            count++;
          }
        });

        lastValue = count > 0 ? sum / count : 0;
      } /*else {
      }*/

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
