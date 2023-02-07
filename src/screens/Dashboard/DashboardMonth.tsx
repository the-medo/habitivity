import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { useGetCompletedDaysQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import { ReduxState } from '../../store';
import dayjs from 'dayjs';
import LineDashboardOverview from './DashboardOverview/LineDashboardOverview';
import DashboardStatisticBox from './DashboardStatisticBox';
import { setDateRange, setSelectedDay } from '../screenSlice';
import { GraphView } from '../../types/GraphView';

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
    <>
      <DashboardStatisticBox
        dateRange={dateRange}
        completedDaysData={lastMonthData}
        taskGroup={taskGroup}
        task={task}
        isUnits={false}
        description="Data for last 30 days, up until yesterday"
      />
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
    </>
  );
};

export default DashboardMonth;
