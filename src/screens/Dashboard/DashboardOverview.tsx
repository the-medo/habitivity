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
import DashboardStatisticBox from './DashboardStatisticBox';

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-basis: 33rem;
  flex-grow: 1;
`;

const Row1 = styled(RowGap)`
  gap: 1rem;
  flex-wrap: wrap;
`;

const LineWrapper = styled.div`
  display: flex;
  flex-grow: 3;
  flex-basis: 20rem;
  width: 100%;
  height: 20rem;
`;

const segmentedAverageOptions: SegmentedLabeledOption[] = [
  {
    label: 'Daily trend',
    value: 'daily-trend',
  },
  {
    label: 'Average',
    value: 'average',
  },
];

const segmentedUnitOptions: SegmentedLabeledOption[] = [
  {
    label: 'Points',
    value: 'points',
  },
  {
    label: 'Values',
    value: 'units',
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
          {task !== 'all' && (
            <Segmented
              options={segmentedUnitOptions}
              onChange={handleSegmentedUnits}
              value={displayUnits ? 'units' : 'points'}
              block
            />
          )}
        </RowGapCentered>
        <DashboardStatisticBox
          dateRange={dateRange}
          completedDaysData={lastWeekData}
          taskGroup={taskGroup}
          task={task}
          isUnits={displayUnits}
        />
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
      <LineWrapper>
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
      </LineWrapper>
    </Row1>
  );
};

export default DashboardOverview;
