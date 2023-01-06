import React from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { Input } from 'antd';

interface TaskUserInputUnitCheckpointsProps {
  value: number;
  units: UnitSyntax;
}

const TaskUserInputUnitCheckpoints: React.FC<TaskUserInputUnitCheckpointsProps> = ({
  value,
  units,
}) => {
  return <Input type="number" defaultValue={value} suffix={units.zero} />;
};

export default TaskUserInputUnitCheckpoints;
