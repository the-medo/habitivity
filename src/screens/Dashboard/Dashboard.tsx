import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';
import DashboardSubpageSelector from './DashboardSubpageSelector';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.DASHBOARD));
  }, [dispatch]);

  return (
    <div>
      <DashboardSubpageSelector />
      <Outlet />
    </div>
  );
};

export default Dashboard;
