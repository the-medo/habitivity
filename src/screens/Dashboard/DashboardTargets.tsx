import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';

const DashboardTargets: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubpage(DashboardSubpage.TARGETS));
  }, [dispatch]);

  return <div>DashboardTargets</div>;
};

export default DashboardTargets;
