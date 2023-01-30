import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';
import Overview from '../../components/global/Overview';
import styled from 'styled-components';
import { ReduxState } from '../../store';
import { useGetCompletedDaysQuery } from '../../apis/apiTasks';
import DateDisplay from '../../components/global/DateDisplay';
import dayjs from 'dayjs';
import { Divider } from 'antd';

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DashboardOverview: React.FC = () => {
  const dispatch = useDispatch();
  const dateRange = useSelector((state: ReduxState) => state.dashboard.dateRange);
  const { data: lastWeekData } = useGetCompletedDaysQuery(dateRange);

  useEffect(() => {
    console.log('completed daaaayyyys: ', lastWeekData);
  }, [lastWeekData]);

  useEffect(() => {
    dispatch(setSubpage(DashboardSubpage.OVERVIEW));
  }, [dispatch]);

  return (
    <OverviewWrapper>
      <Overview arrowContent={<DateDisplay date={dayjs().format('YYYY-MM-DD')} />}>
        Ranxdom content
        <Divider type="vertical" /> Ranxdom content
      </Overview>
      <Overview
        arrowContent={<DateDisplay date={dayjs().subtract(1, 'day').format('YYYY-MM-DD')} />}
      >
        Ranxdom content
        <Divider type="vertical" />
        Ranxdom content
      </Overview>
      <Overview
        arrowContent={<DateDisplay date={dayjs().subtract(2, 'day').format('YYYY-MM-DD')} />}
      >
        Ranxdom content
        <Divider type="vertical" /> Ranxdom content
      </Overview>
    </OverviewWrapper>
  );
};

export default DashboardOverview;
