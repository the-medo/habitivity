import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header1 } from '../../components/global/Headers';

const Calendar: React.FC = () => {
  return (
    <div>
      <Header1>This is page called CALENDAR</Header1>
      <Outlet />
    </div>
  );
};

export default Calendar;
