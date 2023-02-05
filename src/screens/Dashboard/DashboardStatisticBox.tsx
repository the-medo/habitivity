import React, { useMemo } from 'react';
import { getStatsInDateRange } from '../../helpers/points/getStatsInDateRange';
import { CompletedDays } from '../../helpers/types/CompletedDay';
import { DateRange } from '../../helpers/types/DateRange';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import StatisticBox from '../../components/global/StatisticBox';
import { useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { getTaskUnit } from '../../helpers/tasks/getTaskUnit';
import { Spin } from 'antd';
import { formatUnits } from '../../helpers/numbers/formatUnits';
import {
  taskTypesWithNumericUnits,
  taskTypesWithUnitAverages,
  taskTypesWithUnitMax,
  taskTypesWithUnitTotal,
} from '../../helpers/types/TaskTypeOperations';

interface DashboardStatBoxProps {
  dateRange: DateRange;
  completedDaysData: CompletedDays | undefined;
  taskGroup: string;
  task: string;
  isUnits: boolean;
}

const DashboardStatisticBox: React.FC<DashboardStatBoxProps> = ({
  dateRange,
  completedDaysData,
  taskGroup,
  task,
  isUnits,
}) => {
  const selectedTaskListId = useSelectedTaskListId();

  const { data: existingTasks, isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);

  const taskDefinition = useMemo(() => {
    return existingTasks?.find(t => t.id === task);
  }, [task, existingTasks]);

  const units = useMemo(() => {
    if (!isUnits || task === 'all') return 'Points';
    if (taskDefinition) return getTaskUnit(taskDefinition);
    return 'Points';
  }, [isUnits, task, taskDefinition]);

  const data = useMemo(() => {
    if (selectedTaskListId && completedDaysData) {
      const stats = getStatsInDateRange({
        dateRange,
        completedDaysData,
        selectedTaskListId,
        taskGroup,
        task,
        takeUnits: isUnits,
        includeLastDay: false,
      });

      console.log('STATS:', task, taskGroup, stats);

      if (isUnits && task !== 'all' && taskDefinition) {
        if (!taskTypesWithUnitAverages.includes(taskDefinition.taskType)) stats.avg = undefined;
        if (!taskTypesWithUnitTotal.includes(taskDefinition.taskType)) stats.total = undefined;
        if (!taskTypesWithUnitMax.includes(taskDefinition.taskType)) stats.max = undefined;
      }

      return stats;
    }
  }, [completedDaysData, dateRange, isUnits, selectedTaskListId, task, taskDefinition, taskGroup]);

  const formatter = useMemo(() => {
    if (taskDefinition) {
      if (taskTypesWithNumericUnits.includes(taskDefinition.taskType)) {
        return (value: number) => value.toString();
      }
      return (value: number) => (isUnits ? formatUnits(taskDefinition, value) : value.toString());
    }
    return (value: number) => value.toString();
  }, [isUnits, taskDefinition]);

  const loading = useMemo(
    () => isFetchingTasks || !completedDaysData || !selectedTaskListId,
    [completedDaysData, isFetchingTasks, selectedTaskListId],
  );

  return (
    <Spin spinning={loading}>
      <StatisticBox
        dateRange={data?.dateRange ?? dateRange}
        description="Data for last 7 days, up until yesterday"
        units={isUnits ? units : 'Points'}
        total={data?.total !== undefined ? formatter(data.total) : '-'}
        max={data?.max !== undefined ? formatter(data.max) : '-'}
        average={data?.avg !== undefined ? formatter(data.avg) : '-'}
      />
    </Spin>
  );
};

export default DashboardStatisticBox;
