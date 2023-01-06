import React from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { Input } from 'antd';

interface TaskUserInputUnitsProps {
  value: number;
  units: UnitSyntax;
}

const TaskUserInputUnits: React.FC<TaskUserInputUnitsProps> = ({ value, units }) => {
  return <Input type="number" defaultValue={value} suffix={units.zero} />;
};

export default TaskUserInputUnits;
