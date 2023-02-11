import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { setDateRange } from '../screenSlice';
import CalendarComponent from './CalendarComponent';
import DashboardDayWrapper from '../Dashboard/DashboardOverview/DashboardDayWrapper';

const AllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-basis: 40rem;
`;

const DayOverviewWrapper = styled.div`
  display: flex;
  flex-basis: 20rem;
  flex-grow: 1;
`;

const CalendarDefault: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state: ReduxState) => state.screen.selectedDay);

  useEffect(() => {
    dispatch(
      setDateRange({
        startDate: dayjs(selectedDay).startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs(selectedDay).endOf('month').format('YYYY-MM-DD'),
      }),
    );
  }, [dispatch, selectedDay]);

  return (
    <AllWrapper>
      <CalendarWrapper>
        <CalendarComponent />
      </CalendarWrapper>
      <DayOverviewWrapper>
        <DashboardDayWrapper />
      </DayOverviewWrapper>
    </AllWrapper>
  );
};

export default CalendarDefault;
