import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';
import ScreenSegments from '../../components/global/ScreenSegments';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.CALENDAR));
  }, [dispatch]);

  return (
    <div>
      <ScreenSegments displayGraphView={false} />
      <Outlet />
    </div>
  );
};

export default Calendar;
