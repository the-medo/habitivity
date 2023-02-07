import React, { useCallback, useEffect } from 'react';
import { DashboardSubpage } from './dashboardSlice';
import { getItem, LSKey } from '../../store/localStore';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { PointCircle } from '../../components/global/PointCircle';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { setDateRange } from '../screenSlice';
import { useGetCompletedDaysQuery } from '../../apis/apiTasks';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';

const CalendarStyled = styled(Calendar)`
  .ant-picker-calendar-date-content {
    display: flex;
    //align-items: center;
    justify-content: center;
  }
`;

const CalendarDefault: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskListId();
  const selectedDay = useSelector((state: ReduxState) => state.screen.selectedDay);
  const dateRange = useSelector((state: ReduxState) => state.screen.dateRange);
  const { data: monthlyData } = useGetCompletedDaysQuery(dateRange);

  console.log('DATE RANGE: ', dateRange);

  useEffect(() => {
    dispatch(
      setDateRange({
        startDate: dayjs(selectedDay).startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs(selectedDay).endOf('month').format('YYYY-MM-DD'),
      }),
    );
  }, [dispatch, selectedDay]);

  const dateCellRender = useCallback(
    (value: Dayjs) => {
      if (selectedTaskListId) {
        if (!dayjs(selectedDay).isSame(value, 'month')) return null;
        if (!monthlyData) return null;

        const completedDay = monthlyData[value.format('YYYY-MM-DD')];
        if (!completedDay) return null;

        console.log(completedDay.taskLists?.[selectedTaskListId]);

        return (
          <PointCircle $size="ultra">
            {completedDay ? completedDay.taskLists[selectedTaskListId].toFixed(2) : '-'}
          </PointCircle>
        );
      }
    },
    [selectedDay, monthlyData, selectedTaskListId],
  );

  return <CalendarStyled dateCellRender={dateCellRender} />;
};

export default CalendarDefault;
