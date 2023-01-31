import React, { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { CompletedDays } from '../../../helpers/types/CompletedDay';
import DateDisplay from '../../../components/global/DateDisplay';
import { Divider, Spin, Statistic } from 'antd';
import Overview from '../../../components/global/Overview';
import DynamicIcon from '../../../components/global/DynamicIcon';
import { RowGapCentered } from '../../../components/global/RowGapCentered';

interface DayOverviewProps {
  date: Dayjs;
  completedDaysData: CompletedDays | undefined;
  selectedTaskListId: string | undefined;
}

const DayOverview: React.FC<DayOverviewProps> = ({
  date,
  completedDaysData,
  selectedTaskListId,
}) => {
  const today = date.format('YYYY-MM-DD');
  const yesterday = date.subtract(1, 'day').format('YYYY-MM-DD');

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
    if (completedDaysData && selectedTaskListId) {
      const completedToday = completedDaysData[today];
      const completedYesterday = completedDaysData[yesterday];

      const todayPoints = completedToday ? completedToday.taskLists[selectedTaskListId] ?? 0 : 0;
      const yesterdayPoints = completedYesterday
        ? completedYesterday.taskLists[selectedTaskListId] ?? 0
        : 0;

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
    }

    return undefined;
  }, [completedDaysData, iconDown, iconUp, selectedTaskListId, today, yesterday]);

  return (
    <Spin spinning={!completedDaysData || !selectedTaskListId}>
      <Overview arrowContent={dateDisplay}>
        <RowGapCentered>
          <Statistic title="Points" value={data?.todayPoints ?? '-'} precision={2} />
          <Divider type="vertical" />
          <Statistic
            title="Day before"
            value={data?.pointDiff ?? '-'}
            precision={2}
            valueStyle={data?.color}
            prefix={data?.icon}
          />
          <Divider type="vertical" />
          <Statistic
            title="Daily trend"
            value={data?.percentage ?? '-'}
            precision={2}
            valueStyle={data?.color}
            prefix={data?.percentage ? data.icon : undefined}
            suffix="%"
          />
        </RowGapCentered>
      </Overview>
    </Spin>
  );
};

export default DayOverview;
