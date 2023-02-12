import React, { useCallback, useMemo } from 'react';
import { getStatsInDateRange } from '../../helpers/points/getStatsInDateRange';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import StatisticBoxDisplay from './StatisticBoxDisplay';
import { useGetCompletedDaysQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { getTaskUnit } from '../../helpers/tasks/getTaskUnit';
import { Spin } from 'antd';
import { formatUnits } from '../../helpers/numbers/formatUnits';
import {
  taskTypesWithNumericUnits,
  taskTypesWithUnitAverages,
  taskTypesWithUnitMax,
  taskTypesWithUnitTotal,
} from '../../helpers/types/TaskTypeOperations';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import { setDisplayUnits } from '../../screens/screenSlice';

interface DashboardStatBoxProps {
  description: string;
  includeLastDay?: boolean;
}

const StatisticBox: React.FC<DashboardStatBoxProps> = ({ description, includeLastDay = true }) => {
  const selectedTaskListId = useSelectedTaskListId();
  const dispatch = useDispatch();

  const displayUnits = useSelector((state: ReduxState) => state.screen.displayUnits);
  const dateRange = useSelector((state: ReduxState) => state.screen.dateRange);
  const taskGroup = useSelector((state: ReduxState) => state.screen.segmentTaskGroup);
  const task = useSelector((state: ReduxState) => state.screen.segmentTask);
  const { data: completedDaysData } = useGetCompletedDaysQuery(dateRange);

  const { data: existingTasks, isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);

  const taskDefinition = useMemo(() => {
    return existingTasks?.find(t => t.id === task);
  }, [task, existingTasks]);

  const handleSegmentedUnits = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      dispatch(setDisplayUnits(value === 'units'));
    },
    [dispatch],
  );

  const units = useMemo(() => {
    if (!displayUnits || task === 'all') return 'Points';
    if (taskDefinition) return getTaskUnit(taskDefinition);
    return 'Points';
  }, [displayUnits, task, taskDefinition]);

  const data = useMemo(() => {
    if (selectedTaskListId && completedDaysData) {
      const stats = getStatsInDateRange({
        dateRange,
        completedDaysData,
        selectedTaskListId,
        taskGroup,
        task,
        useUnits: displayUnits,
        includeLastDay,
      });

      if (displayUnits && task !== 'all' && taskDefinition) {
        if (!taskTypesWithUnitAverages.includes(taskDefinition.taskType)) stats.avg = undefined;
        if (!taskTypesWithUnitTotal.includes(taskDefinition.taskType)) stats.total = undefined;
        if (!taskTypesWithUnitMax.includes(taskDefinition.taskType)) stats.max = undefined;
      }

      return stats;
    }
  }, [
    completedDaysData,
    dateRange,
    displayUnits,
    selectedTaskListId,
    task,
    taskDefinition,
    taskGroup,
    includeLastDay,
  ]);

  const formatter = useMemo(() => {
    if (taskDefinition) {
      if (taskTypesWithNumericUnits.includes(taskDefinition.taskType)) {
        return (value: number) => value.toString();
      }
      return (value: number) =>
        displayUnits ? formatUnits(taskDefinition, value) : value.toString();
    }
    return (value: number) => value.toString();
  }, [displayUnits, taskDefinition]);

  const loading = useMemo(
    () => isFetchingTasks || !completedDaysData || !selectedTaskListId,
    [completedDaysData, isFetchingTasks, selectedTaskListId],
  );

  return (
    <Spin spinning={loading}>
      <StatisticBoxDisplay
        displayUnits={task !== 'all' ? displayUnits : false}
        setDisplayUnits={task !== 'all' ? handleSegmentedUnits : undefined}
        dateRange={data?.dateRange ?? dateRange}
        description={description}
        units={displayUnits ? units : 'Points'}
        total={data?.total !== undefined ? formatter(data.total) : '-'}
        max={data?.max !== undefined ? formatter(data.max) : '-'}
        average={data?.avg !== undefined ? formatter(data.avg) : '-'}
      />
    </Spin>
  );
};

export default StatisticBox;
