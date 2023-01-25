import React from 'react';
import { GroupRawData, TaskRawData } from '../../screens/Day/TaskGroup/DayPieGraph';
// eslint-disable-next-line import/no-unresolved
import { PieCustomLayerProps } from '@nivo/pie/dist/types/types';

//TODO: types!

const centeredMetricStyle = {
  fontSize: '52px',
  fontWeight: 600,
};

export const CenteredMetricTasks: React.FC<PieCustomLayerProps<TaskRawData>> = ({
  dataWithArc,
  centerX,
  centerY,
}) => {
  let total = 0;
  dataWithArc.forEach(datum => {
    total += datum.data.realValue;
  });

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={centeredMetricStyle}
    >
      {Math.round(total * 100) / 100}
    </text>
  );
};

export const CenteredMetricGroups: React.FC<PieCustomLayerProps<GroupRawData>> = ({
  dataWithArc,
  centerX,
  centerY,
}) => {
  let total = 0;
  dataWithArc.forEach(datum => {
    total += datum.data.realValue;
  });

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={centeredMetricStyle}
    >
      {Math.round(total * 100) / 100}
    </text>
  );
};
