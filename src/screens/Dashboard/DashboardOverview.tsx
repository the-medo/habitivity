import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';
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
      </OverviewWrapper>

      <LineDashboardOverview
        dateRange={dateRange}
        completedDaysData={lastWeekData}
        selectedTaskListId={selectedTaskListId}
        taskInfo={existingTasks}
        taskGroupInfo={existingGroups}
      />
    </Row1>
  );
};

export default DashboardOverview;
