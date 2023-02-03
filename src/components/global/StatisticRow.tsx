import React, { useMemo } from 'react';
import { RowGapCentered } from './RowGapCentered';
import { Divider, Statistic } from 'antd';
import Overview from './Overview';
import { Dayjs } from 'dayjs';
import DateDisplay from './DateDisplay';
import { formatPoints } from '../../helpers/numbers/formatPoints';
import DynamicIcon from './DynamicIcon';

interface StatisticRowProps {
  units?: string;
  date: Dayjs;
  valueCurrent: number | undefined;
  valueLast: number | undefined;
  valueLastIsAverage?: boolean;
  textInsteadOfPercentage?: string;
  formatter?: (value: number) => string;
}

const StatisticRow: React.FC<StatisticRowProps> = ({
  units = 'Points',
  date,
  valueCurrent,
  valueLast,
  valueLastIsAverage = false,
  textInsteadOfPercentage,
  formatter = formatPoints,
}) => {
  const dateDisplay = useMemo(() => <DateDisplay date={date.format('YYYY-MM-DD')} />, [date]);

  const iconUp = useMemo(
    () => (
      <>
        <DynamicIcon icon="AiOutlineArrowUp" />+
      </>
    ),
    [],
  );

  const iconDown = useMemo(
    () => (
      <>
        <DynamicIcon icon="AiOutlineArrowDown" />-
      </>
    ),
    [],
  );

  const data = useMemo(() => {
    const todayPoints = valueCurrent ?? 0;
    const yesterdayPoints = valueLast ?? 0;

    const pointDiff = todayPoints - yesterdayPoints;

    const percentage = yesterdayPoints !== 0 ? (pointDiff / yesterdayPoints) * 100 : undefined;
    const isNegative = percentage !== undefined && percentage < 0;

    return {
      todayPoints,
      isNegative,
      percentage: Math.abs(percentage ?? 0),
      color: { color: isNegative ? '#cf1322' : '#3f8600' },
      icon: isNegative ? iconDown : iconUp,
      pointDiff: Math.abs(pointDiff),
    };
  }, [iconDown, iconUp, valueCurrent, valueLast]);

  return (
    <Overview arrowContent={dateDisplay}>
      <RowGapCentered>
        <Statistic
          title={units}
          value={units === 'Points' ? data.todayPoints : formatter(data.todayPoints)}
          precision={2}
        />
        <Divider type="vertical" />
        <Statistic
          title={valueLastIsAverage ? 'Against average' : 'Day before'}
          value={units === 'Points' ? data.pointDiff : formatter(data.pointDiff)}
          precision={2}
          valueStyle={data.color}
          prefix={data.icon}
        />
        <Divider type="vertical" />
        {textInsteadOfPercentage ? null : (
          <Statistic
            title={valueLastIsAverage ? 'Trend' : 'Daily trend'}
            value={data.percentage}
            precision={2}
            valueStyle={data.color}
            prefix={data.percentage ? data.icon : undefined}
            suffix="%"
          />
        )}
      </RowGapCentered>
    </Overview>
  );
};

export default StatisticRow;
