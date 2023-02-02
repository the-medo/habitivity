import React, { CSSProperties, useMemo } from 'react';
import { CompletedDays } from '../../../helpers/types/CompletedDay';
import { DateRange } from '../../../helpers/types/DateRange';
import { Task } from '../../../types/Tasks';
import { TaskGroup } from '../../../types/TaskGroup';
import { Line, LineSvgProps, Serie } from '@nivo/line';
import { Dimensions } from '@nivo/core';
import { getDateRange } from '../../../helpers/date/getDateRange';
import { linearGradient } from '../../../helpers/graphs/fillDefinitions';
import { lineGraphCustomPointProps } from '../../../helpers/graphs/lineGraphCustomPointProps';

interface LineDashboardOverviewProps {
  dateRange: DateRange;
  completedDaysData: CompletedDays | undefined;
  taskInfo: Task[] | undefined;
  taskGroupInfo: TaskGroup[] | undefined;
}

export interface TaskLineData extends Serie {
  taskGroup: TaskGroup;
  color: CSSProperties['color'];
}

const LineDashboardOverview: React.FC<LineDashboardOverviewProps> = ({
  dateRange,
  completedDaysData,
  taskInfo,
  taskGroupInfo,
}) => {
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

    return dataSeries;
  }, [completedDaysData, dateRange, taskGroupInfo]);

  const properties: Partial<LineSvgProps> & Dimensions = useMemo(
    () => ({
      width: 600,
      height: 400,
      margin: { top: 20, right: 20, bottom: 40, left: 40 },
      animate: true,
      enableArea: true,
      xFormat: 'time:%Y-%m-%d',
      curve: 'monotoneX',
      enableSlices: 'x',
      xScale: {
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      },
      yScale: {
        type: 'linear',
        stacked: true,
      },
      colors: { datum: 'color' },
      axisBottom: {
        format: '%b %d',
        tickValues: 'every 1 day',
      },
      defs: [linearGradient],
      fill: [{ match: '*', id: 'gradientA' }],
    }),
    [],
  );

  if (!taskInfo || !taskGroupInfo) return null;

  return <Line {...properties} {...lineGraphCustomPointProps} data={data} />;
};

export default LineDashboardOverview;
