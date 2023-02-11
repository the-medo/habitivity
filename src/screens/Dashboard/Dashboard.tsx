import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';
import ScreenSegments from '../../components/global/ScreenSegments';
import dayjs from 'dayjs';
import { setSelectedDay } from '../screenSlice';
import { ReduxState } from '../../store';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state: ReduxState) => state.screen.selectedDay);

  useEffect(() => {
    //after opening the dashboard every time, we want to set the selected day to today
    const today = dayjs();
    if (today.format('YYYY-MM-DD') !== selectedDay) {
      dispatch(setSelectedDay(today.format('YYYY-MM-DD')));
    }

    //  --we want to run this only once, so selectedDay is not included in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
