import React, { CSSProperties, useMemo, useState } from 'react';
import {
  CommonPieProps,
  ComputedDatum,
  DataProps,
  DefaultRawDatum,
  Pie,
  PieCustomLayerProps,
  PieLayer,
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

const CenteredMetric = ({
  dataWithArc,
  centerX,
  centerY,
}: PieCustomLayerProps<GroupRawData | TaskRawData>) => {
  console.log('dataWithArc', dataWithArc, centerX, centerY);

  let total = 0;
  dataWithArc.forEach(datum => {
    total += datum.value;
  });

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '52px',
        fontWeight: 600,
      }}
    >
      {Math.round(total * 100) / 100}
    </text>
  );
};

function getPieLayers<T extends GroupRawData | TaskRawData>(): PieLayer<T>[] {
  return ['arcs', 'arcLabels', 'arcLinkLabels', CenteredMetric];
}

interface DayPieGraphProps {
  selectedDate?: Dayjs;
  dayPieGraphDisplayType: DayPieGraphDisplayType;
}

export interface GroupRawData extends DefaultRawDatum {
  label: string;
  color: CSSProperties['color'];
  icon: string;
  tasks: Task[];
  taskColors: string[];
  completedDay: false | CompletedDay | undefined;
}

export interface TaskRawData extends DefaultRawDatum {
  label: string;
  color: CSSProperties['color'];
  task: Task;
  groupInfo: GroupRawData;
  completedDay: false | CompletedDay | undefined;
}

interface DataInterface {
  groups: DataProps<GroupRawData>['data'];
  tasks: DataProps<TaskRawData>['data'];
}

const DayPieGraph: React.FC<DayPieGraphProps> = ({ selectedDate, dayPieGraphDisplayType }) => {
  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingTasks = [], isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups = [], isFetching: isFetchingGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const { data: completedDay, isFetching: isFetchingDay } = useGetCompletedDayQuery({
    date: selectedDate?.format('YYYY-MM-DD'),
  });

  const isLoading = useMemo(
    () => isFetchingTasks || isFetchingGroups || isFetchingDay,
    [isFetchingDay, isFetchingGroups, isFetchingTasks],
  );

  const data: DataInterface = useMemo(() => {
    const d: DataInterface = {
      groups: [],
      tasks: [],
    };

    existingGroups.forEach(g => {
      const value = completedDay ? Math.round((completedDay.taskGroups[g.id] ?? 0) * 100) / 100 : 0;
      const baseColor = g.color ?? COLORS.PRIMARY;
      const tasks = existingTasks.filter(t => t.taskGroupId === g.id);
      const taskColors = chooseColorsBasedOnCount(baseColor, tasks.length);

      const group = {
        id: g.id,
        label: g.name,
        value,
        color: baseColor,
        icon: g.icon ?? 'AiOutlineRightCircle',
        tasks: tasks,
        taskColors,
        completedDay: completedDay,
      };

      d.groups.push(group);

      tasks.forEach((t, i) => {
        d.tasks.push({
          id: t.id,
          label: t.taskName,
          value: completedDay ? Math.round((completedDay.tasks[t.id]?.points ?? 0) * 100) / 100 : 0,
          color: taskColors[i],
          task: t,
          groupInfo: group,
          completedDay: completedDay,
        });
      });
    });

    return d;
  }, [existingTasks, existingGroups, completedDay]);

  const commonProperties = useMemo(
    () => ({
      width: 500,
      height: 500,
      margin: { top: 20, right: 100, bottom: 120, left: 100 },
      animate: true,
      activeOuterRadiusOffset: 8,
      innerRadius: 0.6,
      padAngle: 0.5,
      cornerRadius: 5,
      colors: {
        datum: 'data.color',
      },
      motionConfig: 'wobbly',
      arcLabelsSkipAngle: 20,
      arcLinkLabelsSkipAngle: 5,
      arcLabelsTextColor: 'white',
      arcLinkLabel: 'label',
      arcLinkLabelsThickness: 3,
      arcLinkLabelsColor: {
        from: 'color',
      },
    }),
    [],
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
            layers={getPieLayers<GroupRawData>()}
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
            layers={getPieLayers<TaskRawData>()}
          />
        </Spin>
      );
  }
};

export default DayPieGraph;
