import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DashboardGraphView,
  DashboardGroupsOrTasks,
  DashboardSubpage,
  setSubpage,
} from './dashboardSlice';
import styled from 'styled-components';
import { ReduxState } from '../../store';
import { useGetCompletedDaysQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import dayjs from 'dayjs';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import DayOverview from './DashboardOverview/DayOverview';
import { RowGap } from '../../components/global/RowGap';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import LineDashboardOverview from './DashboardOverview/LineDashboardOverview';

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
`;

const Row1 = styled(RowGap)`
  gap: 1rem;
`;

const DashboardOverview: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskListId();

  const { data: existingTasks, isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups, isFetching: isFetchingGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const dateRange = useSelector((state: ReduxState) => state.dashboard.dateRange);
  const taskGroup = useSelector((state: ReduxState) => state.dashboard.segmentTaskGroup);
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

  const today = useMemo(() => dayjs(), []);
  const yesterday = useMemo(() => dayjs().subtract(1, 'day'), []);
  const twoDaysAgo = useMemo(() => dayjs().subtract(2, 'day'), []);
  const threeDaysAgo = useMemo(() => dayjs().subtract(3, 'day'), []);
  const fourDaysAgo = useMemo(() => dayjs().subtract(4, 'day'), []);

  return (
    <Row1>
      <OverviewWrapper>
        <DayOverview
          date={today}
          completedDaysData={lastWeekData}
          selectedTaskListId={selectedTaskListId}
        />
        <DayOverview
          date={yesterday}
          completedDaysData={lastWeekData}
          selectedTaskListId={selectedTaskListId}
        />
        <DayOverview
          date={twoDaysAgo}
          completedDaysData={lastWeekData}
          selectedTaskListId={selectedTaskListId}
        />
        <DayOverview
          date={threeDaysAgo}
          completedDaysData={lastWeekData}
          selectedTaskListId={selectedTaskListId}
        />
        <DayOverview
          date={fourDaysAgo}
          completedDaysData={lastWeekData}
          selectedTaskListId={selectedTaskListId}
        />
      </OverviewWrapper>

      <LineDashboardOverview
        taskGroup={taskGroup}
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
