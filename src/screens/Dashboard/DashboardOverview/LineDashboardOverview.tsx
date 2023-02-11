import React, { CSSProperties, useCallback, useMemo } from 'react';
import { CompletedDays } from '../../../helpers/types/CompletedDay';
import { DateRange } from '../../../helpers/types/DateRange';
import { Task } from '../../../types/Tasks';
import { TaskGroup } from '../../../types/TaskGroup';
import { LineSvgProps, ResponsiveLine, Serie, SliceTooltipProps } from '@nivo/line';
import { getDateRange } from '../../../helpers/date/getDateRange';
import { linearGradient } from '../../../helpers/graphs/fillDefinitions';
import { lineGraphCustomPointProps } from '../../../helpers/graphs/lineGraphCustomPointProps';
import { COLORS } from '../../../styles/CustomStyles';
import { chooseColorsBasedOnCount } from '../../../helpers/colors/chooseColorsBasedOnCount';
import { getStatsInDateRange } from '../../../helpers/points/getStatsInDateRange';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { formatPoints } from '../../../helpers/numbers/formatPoints';
import styled from 'styled-components';
import { GroupsOrTasks } from '../../../types/GroupsOrTasks';

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 20rem;
  padding: 1rem;
  width: 100%;
  align-items: center;
`;

const LineWrapper = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  height: 20rem;
`;

interface LineDashboardOverviewProps {
  taskGroup: string;
  task: string;
  groupsOrTasks: GroupsOrTasks;
  stacked: boolean;
  dateRange: DateRange;
  completedDaysData: CompletedDays | undefined;
  taskInfo: Task[] | undefined;
  taskGroupInfo: TaskGroup[] | undefined;
  selectedDay: string;
  setSelectedDay?: (x: string) => void;
}

export interface TaskLineData extends Serie {
  taskGroup: TaskGroup;
  color: CSSProperties['color'];
}

const createLineFromGroup = (
  g: TaskGroup,
  completedDaysData: CompletedDays | undefined,
  dateRange: DateRange,
): TaskLineData => {
  const base: TaskLineData = {
    id: g.name,
    color: g.color,
    data: [],
    taskGroup: g,
  };

  getDateRange(dateRange).forEach(date => {
    const today = date.format('YYYY-MM-DD');
    const completedToday = completedDaysData?.[today];
    if (completedToday !== undefined) {
      const todayPoints = completedToday ? completedToday.taskGroups[g.id] ?? 0 : 0;
      base.data.push({
        x: today,
        y: todayPoints,
      });
    }
  });

  return base;
};

const createLineFromTask = (
  t: Task,
  color: CSSProperties['color'],
  g: TaskGroup,
  completedDaysData: CompletedDays | undefined,
  dateRange: DateRange,
): TaskLineData => {
  const base: TaskLineData = {
    id: t.taskName,
    color,
    data: [],
    taskGroup: g,
  };

  getDateRange(dateRange).forEach(date => {
    const today = date.format('YYYY-MM-DD');
    const completedToday = completedDaysData?.[today];
    if (completedToday !== undefined) {
      const todayPoints = completedToday ? completedToday.tasks[t.id]?.points ?? 0 : 0;
      base.data.push({
        x: today,
        y: todayPoints,
      });
    }
  });

  return base;
};

const LineDashboardOverview: React.FC<LineDashboardOverviewProps> = ({
  taskGroup,
  task,
  groupsOrTasks,
  stacked,
  dateRange,
  completedDaysData,
  taskInfo,
  taskGroupInfo,
  selectedDay,
  setSelectedDay,
}) => {
  const selectedTaskListId = useSelectedTaskListId();

  const data = useMemo(() => {
    const dataSeries: TaskLineData[] = [];

    if (taskGroupInfo && taskInfo) {
      if (taskGroup === 'all') {
        if (groupsOrTasks === GroupsOrTasks.GROUPS) {
          taskGroupInfo.forEach(g =>
            dataSeries.push(createLineFromGroup(g, completedDaysData, dateRange)),
          );

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (groupsOrTasks === GroupsOrTasks.TASKS) {
          taskGroupInfo.forEach(g => {
            const baseColor = g.color ?? COLORS.PRIMARY;
            const tasks = taskInfo.filter(t => t.taskGroupId === g.id);
            const taskColors = chooseColorsBasedOnCount(baseColor, tasks.length);

            tasks.forEach((t, i) =>
              dataSeries.push(
                createLineFromTask(t, taskColors[i], g, completedDaysData, dateRange),
              ),
            );
          });
        }
      } else {
        // taskGroup !== 'all' => ID of taskGroup
        const g = taskGroupInfo.find(g => g.id === taskGroup);
        if (g) {
          if (task !== 'all') {
            const t = taskInfo.find(t => t.id === task);
            if (t) {
              dataSeries.push(createLineFromTask(t, g.color, g, completedDaysData, dateRange));
            }
          } else {
            if (groupsOrTasks === GroupsOrTasks.GROUPS) {
              dataSeries.push(createLineFromGroup(g, completedDaysData, dateRange));
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            } else if (groupsOrTasks === GroupsOrTasks.TASKS) {
              const baseColor = g.color ?? COLORS.PRIMARY;
              const tasks = taskInfo.filter(t => t.taskGroupId === g.id);
              const taskColors = chooseColorsBasedOnCount(baseColor, tasks.length);

              tasks.forEach((t, i) =>
                dataSeries.push(
                  createLineFromTask(t, taskColors[i], g, completedDaysData, dateRange),
                ),
              );
            }
          }
        }
      }
    }
    return dataSeries;
  }, [task, taskGroup, groupsOrTasks, completedDaysData, dateRange, taskInfo, taskGroupInfo]);

  const avg = useMemo(() => {
    if (completedDaysData && selectedTaskListId) {
      const stats = getStatsInDateRange({
        dateRange,
        completedDaysData,
        selectedTaskListId,
        taskGroup,
        task,
        useUnits: false,
        includeLastDay: false,
      });

      return formatPoints(stats.avg);
    }
  }, [completedDaysData, dateRange, selectedTaskListId, task, taskGroup]);

  const markers = useMemo(() => {
    const markers: LineSvgProps['markers'] = [];

    if (avg !== undefined) {
      markers.push({
        axis: 'y',
        value: avg,
        lineStyle: { stroke: COLORS.BLUE_DARK, strokeWidth: 2 },
        legend: `Avg. value: ${avg}`,
        legendPosition: 'top-left',
      });
    }

    if (selectedDay) {
      markers.push({
        axis: 'x',
        value: new Date(`${selectedDay} 00:00:00`),
        lineStyle: { stroke: COLORS.PRIMARY_DARK, strokeWidth: 2 },
      });
    }

    return markers;
  }, [avg, selectedDay]);

  const yScale: LineSvgProps['yScale'] = useMemo(
    () => ({
      type: 'linear',
      stacked,
    }),
    [stacked],
  );

  const sliceTooltip: LineSvgProps['sliceTooltip'] = useCallback(
    (e: SliceTooltipProps | undefined) => {
      if (e && e.slice.points.length > 0 && setSelectedDay) {
        const p = e.slice.points[0]?.data.xFormatted;
        if (p) setSelectedDay(`${p}`);
      }
      return null;
    },
    [setSelectedDay],
  );

  const properties: Partial<LineSvgProps> = useMemo(
    () => ({
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
      colors: { datum: 'color' },
      axisBottom: {
        format: '%b %d',
        tickValues: 'every 1 day',
        tickRotation: -45,
      },
      defs: [linearGradient],
      fill: [{ match: '*', id: 'gradientA' }],
    }),
    [],
  );

  if (!taskInfo || !taskGroupInfo) return null;

  return (
    <WholeWrapper>
      <LineWrapper>
        <ResponsiveLine
          {...properties}
          {...lineGraphCustomPointProps}
          markers={markers}
          yScale={yScale}
          data={data}
          sliceTooltip={sliceTooltip}
        />
      </LineWrapper>
    </WholeWrapper>
  );
};

export default LineDashboardOverview;
