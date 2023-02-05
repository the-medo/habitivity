import React, { CSSProperties, useMemo } from 'react';
import { CompletedDays } from '../../../helpers/types/CompletedDay';
import { DateRange } from '../../../helpers/types/DateRange';
import { Task } from '../../../types/Tasks';
import { TaskGroup } from '../../../types/TaskGroup';
import { LineSvgProps, ResponsiveLine, Serie } from '@nivo/line';
import { getDateRange } from '../../../helpers/date/getDateRange';
import { linearGradient } from '../../../helpers/graphs/fillDefinitions';
import { lineGraphCustomPointProps } from '../../../helpers/graphs/lineGraphCustomPointProps';
import { DashboardGroupsOrTasks } from '../dashboardSlice';
import { COLORS } from '../../../styles/CustomStyles';
import { chooseColorsBasedOnCount } from '../../../helpers/colors/chooseColorsBasedOnCount';
import { getStatsInDateRange } from '../../../helpers/points/getStatsInDateRange';
import { setSelectedTaskListId } from '../../../routes/routerSlice';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { formatPoints } from '../../../helpers/numbers/formatPoints';

interface LineDashboardOverviewProps {
  taskGroup: string;
  task: string;
  groupsOrTasks: DashboardGroupsOrTasks;
  stacked: boolean;
  dateRange: DateRange;
  completedDaysData: CompletedDays | undefined;
  taskInfo: Task[] | undefined;
  taskGroupInfo: TaskGroup[] | undefined;
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
}) => {
  const selectedTaskListId = useSelectedTaskListId();

  const data = useMemo(() => {
    const dataSeries: TaskLineData[] = [];

    if (taskGroupInfo && taskInfo) {
      if (taskGroup === 'all') {
        if (groupsOrTasks === DashboardGroupsOrTasks.GROUPS) {
          taskGroupInfo.forEach(g =>
            dataSeries.push(createLineFromGroup(g, completedDaysData, dateRange)),
          );

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (groupsOrTasks === DashboardGroupsOrTasks.TASKS) {
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
            if (groupsOrTasks === DashboardGroupsOrTasks.GROUPS) {
              dataSeries.push(createLineFromGroup(g, completedDaysData, dateRange));
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            } else if (groupsOrTasks === DashboardGroupsOrTasks.TASKS) {
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

  const properties: Partial<LineSvgProps> = useMemo(
    () => ({
      // width: 600,
      // height: 400,
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
        stacked,
      },
      colors: { datum: 'color' },
      axisBottom: {
        format: '%b %d',
        tickValues: 'every 1 day',
      },
      defs: [linearGradient],
      fill: [{ match: '*', id: 'gradientA' }],
      markers:
        avg !== undefined
          ? [
              {
                axis: 'y',
                value: avg,
                lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
                legend: `Avg. value: ${avg}`,
                legendPosition: 'bottom-left',
              },
            ]
          : undefined,
    }),
    [avg, stacked],
  );

  if (!taskInfo || !taskGroupInfo) return null;

  return <ResponsiveLine {...properties} {...lineGraphCustomPointProps} data={data} />;
};

export default LineDashboardOverview;
