import React, { CSSProperties, useMemo } from 'react';
import { CompletedDays } from '../../../helpers/types/CompletedDay';
import { DateRange } from '../../../helpers/types/DateRange';
import { Task } from '../../../types/Tasks';
import { TaskGroup } from '../../../types/TaskGroup';
import { Line, Serie } from '@nivo/line';
import dayjs, { Dayjs } from 'dayjs';

interface LineDashboardOverviewProps {
  dateRange: DateRange;
  completedDaysData: CompletedDays | undefined;
  selectedTaskListId: string | undefined;
  taskInfo: Task[] | undefined;
  taskGroupInfo: TaskGroup[] | undefined;
}

const getDateRange = (dateRange: DateRange): Dayjs[] => {
  const { startDate, endDate } = dateRange;
  const dateRangeArray = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    dateRangeArray.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return dateRangeArray;
};

export interface TaskLineData extends Serie {
  taskGroup: TaskGroup;
  color: CSSProperties['color'];
}

const LineDashboardOverview: React.FC<LineDashboardOverviewProps> = ({
  dateRange,
  completedDaysData,
  selectedTaskListId,
  taskInfo,
  taskGroupInfo,
}) => {
  const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
      <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
      <circle
        r={size / 5}
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );

  const data = useMemo(() => {
    const dataSeries: TaskLineData[] = [];

    taskGroupInfo?.forEach(taskGroup => {
      const base: TaskLineData = {
        id: taskGroup.name,
        color: taskGroup.color,
        data: [],
        taskGroup,
      };

      getDateRange(dateRange).forEach(date => {
        const today = date.format('YYYY-MM-DD');
        const completedToday = completedDaysData?.[today];
        if (completedToday !== undefined) {
          const todayPoints = completedToday ? completedToday.taskGroups[taskGroup.id] ?? 0 : 0;
          base.data.push({
            x: today,
            y: todayPoints,
          });
        }
      });

      dataSeries.push(base);
    });
    console.log('dataSeries: ', dataSeries);

    return dataSeries;
  }, [completedDaysData, dateRange, taskGroupInfo]);

  const commonProperties = useMemo(
    () => ({
      width: 600,
      height: 400,
      margin: { top: 20, right: 20, bottom: 40, left: 40 },
      animate: true,
      enableSlices: 'x',
    }),
    [],
  );

  if (!taskInfo || !taskGroupInfo) return null;

  return (
    <Line
      data={data}
      {...commonProperties}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      }}
      xFormat={'time:%Y-%m-%d'}
      yScale={{
        type: 'linear',
        stacked: true,
      }}
      pointSymbol={CustomSymbol}
      pointBorderColor={{
        from: 'datum.color',
        modifiers: [['darker', 0.3]],
      }}
      pointSize={16}
      pointBorderWidth={1}
      curve={'monotoneX'}
      useMesh={true}
      enableSlices={false}
      axisBottom={{
        format: '%b %d',
        tickValues: 'every 1 day',
      }}
    />
  );
};

export default LineDashboardOverview;
