import React, { useEffect } from 'react';
import { DashboardSubpage } from './dashboardSlice';
import { getItem, LSKey } from '../../store/localStore';
import { useNavigate } from 'react-router-dom';

const DashboardDefault: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const defaultSubpage = getItem(LSKey.DASHBOARD_SUBPAGE) ?? DashboardSubpage.OVERVIEW;
    navigate(`${defaultSubpage}`);
  }, [navigate]);

  return <div>DashboardDefault</div>;
};

export default DashboardDefault;
