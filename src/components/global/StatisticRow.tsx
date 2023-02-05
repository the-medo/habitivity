import React, { Fragment, useCallback, useMemo } from 'react';
import { RowGapCentered } from './RowGapCentered';
import { Divider, Statistic } from 'antd';
import Overview from './Overview';
import { Dayjs } from 'dayjs';
import DateDisplay from './DateDisplay';
import { formatPoints } from '../../helpers/numbers/formatPoints';
import DynamicIcon from './DynamicIcon';
import styled from 'styled-components';
import { TaskType } from '../../types/Tasks';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../screens/Day/daySlice';
import { setDashboardSelectedDay } from '../../screens/Dashboard/dashboardSlice';

const StatisticStyled = styled(Statistic)`
  min-width: 7rem;

  .ant-statistic-content {
    font-size: 1.25rem;
  }
`;

const InfoText = styled.span`
  font-size: 1rem;
  font-style: italic;
`;

interface BoxType {
  key: number;
  title?: string;
  value?: string | number;
  valueStyle?: { color: string };
  prefix?: React.ReactNode;
  suffix?: string;
  color?: string;
  text?: string;
}

interface StatisticRowProps {
  units?: string;
  date: Dayjs;
  valueCurrent: number | undefined;
  valueLast: number | undefined;
  isUnits?: boolean;
  isAverage?: boolean;
  isActive?: boolean;
  formatter?: (value: number) => string;
  taskType?: TaskType;
  selectDayOnClick?: boolean;
}

const StatisticRow: React.FC<StatisticRowProps> = ({
  units = 'Points',
  date,
  valueCurrent,
  valueLast,
  isUnits = false,
  isAverage = false,
  isActive = false,
  formatter = formatPoints,
  taskType,
  selectDayOnClick = true,
}) => {
  const dispatch = useDispatch();
  const dateDisplay = useMemo(() => <DateDisplay date={date.format('YYYY-MM-DD')} />, [date]);

  const iconUp = useMemo(() => <DynamicIcon icon="AiOutlineArrowUp" />, []);
  const iconDown = useMemo(() => <DynamicIcon icon="AiOutlineArrowDown" />, []);

  const data = useMemo(() => {
    const valCurrent = valueCurrent ?? 0;
    const valLast = valueLast ?? 0;

    const valDiff = valCurrent - valLast;

    const percentage = valLast !== 0 ? (valDiff / valLast) * 100 : undefined;
    const isNegative = percentage !== undefined && valDiff < 0;

    const icon = isNegative ? iconDown : iconUp;
    const color = { color: isNegative ? '#cf1322' : '#3f8600' };

    const box1: BoxType = {
      key: 1,
      title: units,
      value: isUnits ? formatter(valCurrent) : valCurrent,
      valueStyle: undefined,
      prefix: undefined,
    };

    const box2: BoxType = {
      key: 2,
      title: isAverage ? 'Against average' : 'Day before',
      value: isUnits ? formatter(Math.abs(valDiff)) : Math.abs(valDiff),
      valueStyle: color,
      prefix: valDiff !== 0 ? icon : undefined,
    };

    const box3: BoxType = {
      key: 3,
      title: isAverage ? 'Trend' : 'Daily trend',
      value: Math.abs(percentage ?? 0),
      valueStyle: color,
      prefix: percentage ? icon : undefined,
      suffix: '%',
    };

    const boxes: BoxType[] = [];

    if (taskType === TaskType.CHECKBOX) {
      boxes.push({
        ...box1,
        title: isUnits ? 'Completion' : 'Points',
      });
      if (isAverage && isUnits) {
        boxes.push({
          key: 2,
          text: 'No "average" data to show about this task',
        });
      } else {
        if (!isUnits) {
          boxes.push(box2);
          boxes.push(box3);
        }
      }
    } else if (taskType === TaskType.TIME) {
      boxes.push({
        ...box1,
        title: isUnits ? 'Time' : 'Points',
      });
      boxes.push({ ...box2, valueStyle: isUnits ? undefined : color });
      if (!isUnits) {
        boxes.push({ ...box3 });
      }
    } else if (taskType === TaskType.OPTIONS) {
      boxes.push({
        ...box1,
        title: isUnits ? 'Options' : 'Points',
      });
      if (isAverage && isUnits) {
        boxes.push({
          key: 2,
          text: 'No "average" data to show about this task',
        });
      } else {
        if (!isUnits) {
          boxes.push(box2);
          boxes.push(box3);
        }
      }
    } else {
      boxes.push(box1);
      boxes.push(box2);
      boxes.push(box3);
    }

    return boxes;
  }, [valueCurrent, valueLast, iconDown, iconUp, units, isUnits, formatter, isAverage, taskType]);

  const handleOnClick = useCallback(() => {
    dispatch(setDashboardSelectedDay(date.format('YYYY-MM-DD')));
  }, [date, dispatch]);

  return (
    <Overview
      arrowContent={dateDisplay}
      onClick={selectDayOnClick ? handleOnClick : undefined}
      isActive={isActive}
    >
      <RowGapCentered>
        {data.map((box, i) => (
          <Fragment key={box.key}>
            {i !== 0 && <Divider type="vertical" />}
            {box.text ? (
              <InfoText>{box.text}</InfoText>
            ) : (
              <StatisticStyled {...box} precision={2} />
            )}
          </Fragment>
        ))}
      </RowGapCentered>
    </Overview>
  );
};

export default StatisticRow;
