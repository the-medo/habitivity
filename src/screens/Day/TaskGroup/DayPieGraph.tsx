import React, { CSSProperties, useCallback, useMemo } from 'react';
import {
  CommonPieProps,
  ComputedDatum,
  DataProps,
  DefaultRawDatum,
  Pie,
  PieLayer,
  PieLayerId,
} from '@nivo/pie';
import { useGetCompletedDayQuery, useGetTasksByTaskListQuery } from '../../../apis/apiTasks';
import { Dayjs } from 'dayjs';
import { COLORS } from '../../../styles/CustomStyles';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { useGetTaskGroupsByTaskListQuery } from '../../../apis/apiTaskGroup';
import { Task } from '../../../types/Tasks';
import { CompletedDay } from '../../../helpers/types/CompletedDay';
import { chooseColorsBasedOnCount } from '../../../helpers/colors/chooseColorsBasedOnCount';
import DayPieTooltipGroups from '../../../helpers/graphs/DayPieTooltipGroups';
import DayPieTooltipTasks from '../../../helpers/graphs/DayPieTooltipTasks';
import { ArcLinkLabelsProps } from '@nivo/arcs';
import { Spin } from 'antd';
import { DayPieGraphDisplayType } from './DayPieGraphWrapper';
import { formatPoints } from '../../../helpers/numbers/formatPoints';
import { createFillMatch, fillDefinitions } from '../../../helpers/graphs/fillDefinitions';
import { SvgDefsAndFill } from '@nivo/core';
import { CenteredMetricGroups, CenteredMetricTasks } from '../../../helpers/graphs/CenteredMetric';
import { skipToken } from '@reduxjs/toolkit/query';

interface DayPieGraphProps {
  selectedDate?: Dayjs;
  dayPieGraphDisplayType: DayPieGraphDisplayType;
  completedDayData?: false | CompletedDay;
}

export interface GroupRawData extends DefaultRawDatum {
  realValue: number;
  label: string;
  color: CSSProperties['color'];
  icon: string;
  tasks: Task[];
  taskColors: string[];
  completedDay: false | CompletedDay | undefined;
}

export interface TaskRawData extends DefaultRawDatum {
  realValue: number;
  label: string;
  color: CSSProperties['color'];
  task: Task;
  groupInfo: GroupRawData;
  completedDay: false | CompletedDay | undefined;
}

interface DataInterface {
  groups: DataProps<GroupRawData>['data'];
  groupFills: SvgDefsAndFill<ComputedDatum<GroupRawData>>['fill'];
  groupLayers: PieLayer<GroupRawData>[];
  tasks: DataProps<TaskRawData>['data'];
  taskFills: SvgDefsAndFill<ComputedDatum<TaskRawData>>['fill'];
  taskLayers: PieLayer<TaskRawData>[];
}

const DayPieGraph: React.FC<DayPieGraphProps> = ({
  selectedDate,
  dayPieGraphDisplayType,
  completedDayData,
}) => {
  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingTasks = [], isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups = [], isFetching: isFetchingGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const { data: completedDayResult, isFetching: isFetchingDay } = useGetCompletedDayQuery(
    completedDayData
      ? skipToken
      : {
          date: selectedDate?.format('YYYY-MM-DD'),
        },
  );

  const completedDay = useMemo(
    () => completedDayData ?? completedDayResult,
    [completedDayData, completedDayResult],
  );

  const isLoading = useMemo(
    () => isFetchingTasks || isFetchingGroups || isFetchingDay,
    [isFetchingDay, isFetchingGroups, isFetchingTasks],
  );

  const data: DataInterface = useMemo(() => {
    const baseLayers: PieLayerId[] = ['arcs', 'arcLabels', 'arcLinkLabels'];
    const d: DataInterface = {
      groups: [],
      groupFills: [],
      groupLayers: [...baseLayers, CenteredMetricGroups],
      tasks: [],
      taskFills: [],
      taskLayers: [...baseLayers, CenteredMetricTasks],
    };

    let totalPointsAbs = 0;
    existingGroups.forEach(
      g =>
        (totalPointsAbs += Math.abs(
          completedDay ? Math.round((completedDay.taskGroups[g.id] ?? 0) * 100) / 100 : 0,
        )),
    );
    const twoDegreeAnglePoints = totalPointsAbs > 0 ? (totalPointsAbs / 360) * 2 : 0.1;

    existingGroups.forEach(g => {
      const value = completedDay ? Math.round((completedDay.taskGroups[g.id] ?? 0) * 100) / 100 : 0;
      const baseColor = g.color ?? COLORS.PRIMARY;
      const tasks = existingTasks.filter(t => t.taskGroupId === g.id);
      const taskColors = chooseColorsBasedOnCount(baseColor, tasks.length);

      const group = {
        id: g.id,
        label: g.name,
        formattedValue: formatPoints(value),
        value: value === 0 ? twoDegreeAnglePoints : Math.abs(value),
        realValue: value,
        color: baseColor,
        icon: g.icon ?? 'AiOutlineRightCircle',
        tasks: tasks,
        taskColors,
        completedDay: completedDay,
      };

      d.groups.push(group);

      if (value < 0) d.groupFills?.push(createFillMatch(g.id));

      tasks.forEach((t, i) => {
        const value = completedDay
          ? Math.round((completedDay.tasks[t.id]?.points ?? 0) * 100) / 100
          : 0;

        if (value < 0) d.taskFills?.push(createFillMatch(t.id));

        d.tasks.push({
          id: t.id,
          label: t.taskName,
          value: value === 0 ? twoDegreeAnglePoints : Math.abs(value),
          realValue: value,
          color: taskColors[i],
          task: t,
          groupInfo: group,
          completedDay: completedDay,
        });
      });
    });

    return d;
  }, [existingTasks, existingGroups, completedDay]);

  const arcLabelCallback = useCallback(
    (e: ComputedDatum<GroupRawData | TaskRawData>) => e.data.realValue.toString(),
    [],
  );

  const size = useMemo(() => {
    const width = window.innerWidth / 2 - 250;
    const height = window.innerHeight - 150;

    return Math.max(Math.min(width, height, 500), 400);
  }, []);

  const commonProperties = useMemo(
    () => ({
      width: size,
      height: size - 150,
      margin: { top: 20, right: 120, bottom: 0, left: 120 },
      animate: true,
      activeOuterRadiusOffset: 8,
      innerRadius: 0.6,
      padAngle: 0.5,
      cornerRadius: 5,
      valueFormat: ' >-1.2~f',
      colors: {
        datum: 'data.color',
      },
      defs: fillDefinitions,
      motionConfig: 'wobbly',
      arcLabel: arcLabelCallback,
      arcLabelsSkipAngle: 20,
      arcLinkLabelsSkipAngle: 5,
      arcLabelsTextColor: 'white',
      arcLinkLabel: 'label',
      arcLinkLabelsThickness: 3,
      arcLinkLabelsColor: {
        from: 'color',
      },
    }),
    [size, arcLabelCallback],
  );

  const arcLinkLabelsTextColor: ArcLinkLabelsProps<
    ComputedDatum<GroupRawData | TaskRawData>
  >['arcLinkLabelsTextColor'] = useMemo(
    () => ({
      from: 'color',
      modifiers: [['darker', 1.2]],
    }),
    [],
  );

  const borderColor: CommonPieProps<GroupRawData | TaskRawData>['borderColor'] = useMemo(
    () => ({
      from: 'color',
      modifiers: [['darker', 0.2]],
    }),
    [],
  );

  if (completedDay === undefined || selectedDate === undefined) return null;

  switch (dayPieGraphDisplayType) {
    case DayPieGraphDisplayType.GROUPS:
      return (
        <Spin spinning={isLoading}>
          <Pie<GroupRawData>
            {...commonProperties}
            data={data.groups}
            tooltip={DayPieTooltipGroups}
            arcLinkLabelsTextColor={arcLinkLabelsTextColor}
            borderColor={borderColor}
            layers={data.groupLayers}
            fill={data.groupFills}
          />
        </Spin>
      );
    case DayPieGraphDisplayType.TASKS:
      return (
        <Spin spinning={isLoading}>
          <Pie<TaskRawData>
            {...commonProperties}
            data={data.tasks}
            tooltip={DayPieTooltipTasks}
            arcLinkLabelsTextColor={arcLinkLabelsTextColor}
            borderColor={borderColor}
            layers={data.taskLayers}
            fill={data.taskFills}
          />
        </Spin>
      );
  }
};

export default DayPieGraph;
