import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuLeftItem } from '../../components/menu/MenuLeft/MenuLeft';
import { useDispatch } from 'react-redux';
import { setMenuLeftItems } from '../../store/menuSlice';
import { Header1 } from '../../components/global/Headers';

const calendarMenuLeftItems: MenuLeftItem[] = [];

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Setting menu left..');
    dispatch(setMenuLeftItems(calendarMenuLeftItems));
  }, [dispatch]);

  return (
    <div>
      <Header1>This is page called CALENDAR</Header1>
      <Outlet />
    </div>
  );
};

export default Calendar;
