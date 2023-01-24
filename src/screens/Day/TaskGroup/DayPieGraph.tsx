import React, { CSSProperties, useCallback, useMemo } from 'react';
import { DataProps, DefaultRawDatum, Pie, PieCustomLayerProps, PieTooltipProps } from '@nivo/pie';
import { useGetCompletedDayQuery, useGetTasksByTaskListQuery } from '../../../apis/apiTasks';
import { Dayjs } from 'dayjs';
import { COLORS } from '../../../styles/CustomStyles';
import { dayPieGraphLegends } from '../../../helpers/graphs/legendsDefinitions';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { useGetTaskGroupsByTaskListQuery } from '../../../apis/apiTaskGroup';
import { Task } from '../../../types/Tasks';
import { CompletedDay } from '../../../helpers/types/CompletedDay';
import { chooseColorsBasedOnCount } from '../../../helpers/colors/chooseColorsBasedOnCount';
import GroupPieTooltip from '../../../helpers/graphs/GroupPieTooltip';

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

interface DayPieGraphProps {
  selectedDate?: Dayjs;
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
  completedDay: false | CompletedDay | undefined;
}

interface DataInterface {
  groups: DataProps<GroupRawData>['data'];
  tasks: DataProps<TaskRawData>['data'];
}

const DayPieGraph: React.FC<DayPieGraphProps> = ({ selectedDate }) => {
  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingTasks = [], isLoading } = useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups = [] } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const { data: completedDay, isFetching } = useGetCompletedDayQuery({
    date: selectedDate?.format('YYYY-MM-DD'),
  });

  console.log('existingTasks', existingTasks);
  console.log('completedDay', completedDay);
  console.log('existingGroups', existingGroups);

  console.log('COLOR TEST: ', chooseColorsBasedOnCount('#abcdef', 13));

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

      d.groups.push({
        id: g.id,
        label: g.name,
        value,
        color: baseColor,
        icon: g.icon ?? 'AiOutlineRightCircle',
        tasks: tasks,
        taskColors,
        completedDay: completedDay,
      });

      tasks.forEach((t, i) => {
        d.tasks.push({
          id: t.id,
          label: t.taskName,
          value: completedDay ? Math.round((completedDay.tasks[t.id]?.points ?? 0) * 100) / 100 : 0,
          color: taskColors[i],
          completedDay: completedDay,
        });
      });
    });

    return d;
  }, [existingTasks, existingGroups, completedDay]);

  if (completedDay === undefined || selectedDate === undefined) return null;

  const commonProperties = {
    width: 500,
    height: 500,
    margin: { top: 20, right: 100, bottom: 120, left: 100 },
    animate: true,
    activeOuterRadiusOffset: 8,
  };

  return (
    <Pie
      {...commonProperties}
      innerRadius={0.6}
      padAngle={0.5}
      cornerRadius={5}
      data={data.groups}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      colors={{ datum: 'data.color' }}
      tooltip={GroupPieTooltip}
      motionConfig="wobbly"
      arcLabelsSkipAngle={20}
      arcLinkLabelsSkipAngle={5}
      arcLabelsTextColor="white"
      arcLinkLabel="label"
      arcLinkLabelsThickness={3}
      arcLinkLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 1.2]],
      }}
      arcLinkLabelsColor={{
        from: 'color',
      }}
      legends={dayPieGraphLegends}
      layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
    />
  );
};

export default DayPieGraph;
