import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { useGetCompletedDaysQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import { ReduxState } from '../../store';
import dayjs from 'dayjs';
import LineDashboardOverview from './DashboardOverview/LineDashboardOverview';
import StatisticBox from '../../components/global/StatisticBox';
import { setDateRange, setSelectedDay } from '../screenSlice';
import { GraphView } from '../../types/GraphView';
import DashboardDayWrapper from './DashboardOverview/DashboardDayWrapper';
import { RowGapWrap } from '../../components/global/RowGap';
import { WrapperColumn } from '../../components/global/Wrapper';

const DashboardMonth: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskListId();

  const { data: existingTasks } = useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  useEffect(() => {
    dispatch(setSubpage(DashboardSubpage.MONTH));
    dispatch(
      setDateRange({
        startDate: dayjs().subtract(31, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      }),
    );
  }, [dispatch]);

  const dateRange = useSelector((state: ReduxState) => state.screen.dateRange);
  const taskGroup = useSelector((state: ReduxState) => state.screen.segmentTaskGroup);
  const task = useSelector((state: ReduxState) => state.screen.segmentTask);
  const groupsOrTasks = useSelector((state: ReduxState) => state.screen.segmentGroupsOrTasks);
  const stacked = useSelector(
    (state: ReduxState) => state.screen.segmentGraphView === GraphView.STACKED,
  );
  const selectedDay = useSelector((state: ReduxState) => state.screen.selectedDay);
  const { data: lastMonthData } = useGetCompletedDaysQuery(dateRange);

  const setSelectedDayHandler = useCallback(
    (x: string) => {
      dispatch(setSelectedDay(x));
    },
    [dispatch],
  );

  return (
    <RowGapWrap $gap="1rem">
      <WrapperColumn $gap="1rem" $basis="45rem" $grow={1}>
        <LineDashboardOverview
          taskGroup={taskGroup}
          task={task}
          groupsOrTasks={groupsOrTasks}
          dateRange={dateRange}
          completedDaysData={lastMonthData}
          taskInfo={existingTasks}
          taskGroupInfo={existingGroups}
          stacked={stacked}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDayHandler}
        />
        <StatisticBox
          description="Data for last 30 days, up until yesterday"
          includeLastDay={false}
        />
      </WrapperColumn>
      <WrapperColumn $gap="1rem" $basis="20rem" $grow={15}>
        <DashboardDayWrapper />
      </WrapperColumn>
    </RowGapWrap>
  );
};

export default DashboardMonth;
