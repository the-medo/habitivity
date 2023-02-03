import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardGraphView, DashboardSubpage, setSubpage } from './dashboardSlice';
import styled from 'styled-components';
import { ReduxState } from '../../store';
import { useGetCompletedDaysQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { Dayjs } from 'dayjs';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import DayOverview from './DashboardOverview/DayOverview';
import { RowGap } from '../../components/global/RowGap';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import LineDashboardOverview from './DashboardOverview/LineDashboardOverview';
import { getDateRange } from '../../helpers/date/getDateRange';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import { Segmented } from '../../components/global/Segmented';
import { RowGapCentered } from '../../components/global/RowGapCentered';

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 500px;
`;

const Row1 = styled(RowGap)`
  gap: 1rem;
`;

const segmentedAverageOptions: SegmentedLabeledOption[] = [
  {
    label: 'Daily trend',
    value: 'daily-trend',
    // icon: <DynamicIcon icon="MdOutlineStackedLineChart" />,
  },
  {
    label: 'Average',
    value: 'average',
    // icon: <DynamicIcon icon="MdOutlineStackedLineChart" />,
  },
];

const segmentedUnitOptions: SegmentedLabeledOption[] = [
  {
    label: 'Points',
    value: 'points',
    // icon: <DynamicIcon icon="MdOutlineStackedLineChart" />,
  },
  {
    label: 'Values',
    value: 'units',
    // icon: <DynamicIcon icon="MdOutlineStackedLineChart" />,
  },
];

const DashboardOverview: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskListId();

  const { data: existingTasks, isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups, isFetching: isFetchingGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const [displayAverage, setDisplayAverage] = useState(false);
  const [displayUnits, setDisplayUnits] = useState(false);

  const dateRange = useSelector((state: ReduxState) => state.dashboard.dateRange);
  const taskGroup = useSelector((state: ReduxState) => state.dashboard.segmentTaskGroup);
  const task = useSelector((state: ReduxState) => state.dashboard.segmentTask);
  const groupsOrTasks = useSelector((state: ReduxState) => state.dashboard.segmentGroupsOrTasks);
  const stacked = useSelector(
    (state: ReduxState) => state.dashboard.segmentGraphView === DashboardGraphView.STACKED,
  );
  const { data: lastWeekData } = useGetCompletedDaysQuery(dateRange);

  useEffect(() => {
    console.log('completed daaaayyyys: ', lastWeekData);
  }, [lastWeekData, selectedTaskListId]);

  useEffect(() => {
    dispatch(setSubpage(DashboardSubpage.OVERVIEW));
  }, [dispatch]);

  const days: Dayjs[] = useMemo(() => {
    const dates = getDateRange(dateRange).reverse();
    dates.pop();
    return dates;
  }, [dateRange]);

  const handleSegmentedAverage = useCallback(
    (value: SegmentedLabeledOption['value']) => setDisplayAverage(value === 'average'),
    [],
  );

  const handleSegmentedUnits = useCallback(
    (value: SegmentedLabeledOption['value']) => setDisplayUnits(value === 'units'),
    [],
  );

  return (
    <Row1>
      <OverviewWrapper>
        <RowGapCentered>
          <Segmented
            options={segmentedAverageOptions}
            onChange={handleSegmentedAverage}
            value={displayAverage ? 'average' : 'daily-trend'}
            block
          />
          <Segmented
            options={segmentedUnitOptions}
            onChange={handleSegmentedUnits}
            value={displayUnits ? 'units' : 'points'}
            block
          />
        </RowGapCentered>
        {days.map(day => (
          <DayOverview
            key={day.toString()}
            date={day}
            completedDaysData={lastWeekData}
            selectedTaskListId={selectedTaskListId}
            displayAverage={displayAverage}
            displayUnits={displayUnits}
          />
        ))}
      </OverviewWrapper>

      <LineDashboardOverview
        taskGroup={taskGroup}
        task={task}
        groupsOrTasks={groupsOrTasks}
        dateRange={dateRange}
        completedDaysData={lastWeekData}
        taskInfo={existingTasks}
        taskGroupInfo={existingGroups}
        stacked={stacked}
      />
    </Row1>
  );
};

export default DashboardOverview;