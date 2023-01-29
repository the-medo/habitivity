import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';

const DashboardMonth: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubpage(DashboardSubpage.MONTH));
  }, [dispatch]);

  return <div>DashboardMonth</div>;
};

export default DashboardMonth;
