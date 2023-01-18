import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header1 } from '../../components/global/Headers';
import { useDispatch } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.CALENDAR));
  }, [dispatch]);

  return (
    <div>
      <Header1>This is page called CALENDAR</Header1>
      <Outlet />
    </div>
  );
};

export default Calendar;
