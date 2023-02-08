import React, { useCallback, useEffect } from 'react';
import { Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { setDateRange } from '../screenSlice';
import { useGetCompletedDaysQuery } from '../../apis/apiTasks';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { COLORS } from '../../styles/CustomStyles';
import { PointCircle } from '../../components/global/PointCircle';

const CalendarStyled = styled(Calendar)`
  .ant-picker-cell {
    transition: all 0.3s ease-in-out;

    .ant-picker-cell-inner {
      transition: all 0.3s ease-in-out;
      margin: 0;
      border-left: 2px solid transparent !important;
      border-right: 2px solid transparent !important;
      border-bottom: 2px solid transparent !important;
    }

    &.ant-picker-cell-selected {
      transition: all 2s ease-in-out;

      .ant-picker-calendar-date-value {
        font-weight: 500;
      }

      .ant-picker-cell-inner {
        border: 2px solid ${COLORS.PRIMARY} !important;
      }
    }
  }

  .ant-picker-calendar-date-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem !important;
    transform: translateY(-20%);
  }
`;

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
  border: 1px solid black;
`;

const CalendarDayPoints = styled(PointCircle)`
  font-size: 1rem;
  font-weight: 500;
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

        console.log(completedDay.taskLists[selectedTaskListId]);

        return (
          <CalendarDayPoints
            $size="ultra"
            $color="rgba(255, 255, 255, .5)"
            $colorText={COLORS.PRIMARY_DARK}
            $mode="dark"
          >
            {completedDay ? completedDay.taskLists[selectedTaskListId].toFixed(2) : '-'}
          </CalendarDayPoints>
        );
      }
    },
    [selectedDay, monthlyData, selectedTaskListId],
  );

  return (
    <AllWrapper>
      <CalendarWrapper>
        <CalendarStyled dateCellRender={dateCellRender} />
      </CalendarWrapper>
      <DayOverviewWrapper>Day Overview</DayOverviewWrapper>
    </AllWrapper>
  );
};

export default CalendarDefault;
