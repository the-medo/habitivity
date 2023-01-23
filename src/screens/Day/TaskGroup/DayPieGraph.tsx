import React, { useMemo } from 'react';
import { Pie, PieCustomLayerProps } from '@nivo/pie';
import { useGetCompletedDayQuery } from '../../../apis/apiTasks';
import { TaskGroup } from '../../../types/TaskGroup';
import { Dayjs } from 'dayjs';
import { COLORS } from '../../../styles/CustomStyles';
import { dayPieGraphLegends } from '../../../helpers/graphs/legendsDefinitions';

const CenteredMetric = ({ dataWithArc, centerX, centerY }: PieCustomLayerProps<any>) => {
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
      {total}
    </text>
  );
};

interface DayPieGraphProps {
  selectedDate?: Dayjs;
  existingGroups: TaskGroup[];
}

const DayPieGraph: React.FC<DayPieGraphProps> = ({ selectedDate, existingGroups }) => {
  const { data: completedDay, isFetching } = useGetCompletedDayQuery({
    date: selectedDate?.format('YYYY-MM-DD'),
  });

  const data = useMemo(
    () =>
      existingGroups.map(g => ({
        id: g.id,
        label: g.name,
        value: completedDay ? completedDay.taskGroups[g.id] ?? 0 : 0,
        color: g.color ?? COLORS.PRIMARY,
      })),
    [existingGroups, completedDay],
  );

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
      data={data}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      colors={{ datum: 'data.color' }}
      tooltip={function (e) {
        const t = e.datum;
        console.log('t', t);
        return <span style={{ backgroundColor: 'black', color: 'white', padding: 20 }}>test</span>;
      }}
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
