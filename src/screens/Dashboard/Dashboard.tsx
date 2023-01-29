import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';
import { useGetCompletedDaysQuery } from '../../apis/apiTasks';
import DashboardSubpageSelector from './DashboardSubpageSelector';
import { ReduxState } from '../../store';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const dateRange = useSelector((state: ReduxState) => state.dashboard.dateRange);
  const { data: lastWeekData } = useGetCompletedDaysQuery(dateRange);

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.DASHBOARD));
  }, [dispatch]);

  useEffect(() => {
    console.log('completed daaaayyyys: ', lastWeekData);
  }, [lastWeekData]);

  return (
    <div>
      <DashboardSubpageSelector />
      <Outlet />
    </div>
  );
};

export default Dashboard;
