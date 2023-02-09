import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Calendar, CalendarProps, Spin } from 'antd';
import { COLORS } from '../../styles/CustomStyles';
import { PointCircle } from '../../components/global/PointCircle';
import dayjs from 'dayjs';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { useGetCompletedDaysQuery } from '../../apis/apiTasks';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import StatisticBox from '../../components/global/StatisticBox';
import { getValueFromDay } from '../../helpers/points/getValueFromDay';
import { formatPoints } from '../../helpers/numbers/formatPoints';
import { setSelectedDay } from '../screenSlice';

const CalendarStyled = styled(Calendar)`
  .ant-picker-cell {
    transition: all 0.3s ease-in-out;

    .ant-picker-cell-inner {
      transition: all 0.3s ease-in-out;
      margin: 0;
      border-left: 2px solid transparent !important;
      border-right: 2px solid transparent !important;
      border-bottom: 2px solid transparent !important;
      border-radius: 0.5rem;
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
    height: 3.7rem !important;
    transform: translateY(-20%);
  }
`;

const CalendarDayPoints = styled(PointCircle)`
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid ${COLORS.PRIMARY_LIGHT};
`;

const CalendarComponent: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskListId();
  const dateRange = useSelector((state: ReduxState) => state.screen.dateRange);
  const selectedDay = useSelector((state: ReduxState) => state.screen.selectedDay);
  const { data: monthlyData, isFetching } = useGetCompletedDaysQuery(dateRange);
  const taskGroup = useSelector((state: ReduxState) => state.screen.segmentTaskGroup);
  const task = useSelector((state: ReduxState) => state.screen.segmentTask);

  const onSelectHandler = useCallback(
    (day: dayjs.Dayjs) => {
      dispatch(setSelectedDay(day.format('YYYY-MM-DD')));
    },
    [dispatch],
  );

  const dateCellRender: CalendarProps<dayjs.Dayjs>['dateCellRender'] = useCallback(
    (day: dayjs.Dayjs) => {
      if (selectedTaskListId) {
        if (!dayjs(selectedDay).isSame(day, 'month')) return null;
        if (!monthlyData) return null;

        const completedDay = monthlyData[day.format('YYYY-MM-DD')];
        if (!completedDay) return null;

        const points = getValueFromDay(completedDay, selectedTaskListId, taskGroup, task, false);

        return (
          <CalendarDayPoints
            $size="ultra"
            $color="rgba(255, 255, 255, .5)"
            $colorText={COLORS.PRIMARY_DARK}
            $mode="dark"
          >
            {formatPoints(points)}
          </CalendarDayPoints>
        );
      }
    },
    [selectedTaskListId, selectedDay, monthlyData, taskGroup, task],
  );

  return (
    <Spin spinning={isFetching}>
      <StatisticBox description="" isUnits={false} />
      <CalendarStyled dateCellRender={dateCellRender} onSelect={onSelectHandler} />
    </Spin>
  );
};

export default CalendarComponent;
