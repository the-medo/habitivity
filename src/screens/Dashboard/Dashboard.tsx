import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';
import ScreenSegments from '../../components/global/ScreenSegments';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.DASHBOARD));
  }, [dispatch]);

  return (
    <div>
      <ScreenSegments displayDashboardViewOptions={true} />
      <Outlet />
    </div>
  );
};

export default Dashboard;
