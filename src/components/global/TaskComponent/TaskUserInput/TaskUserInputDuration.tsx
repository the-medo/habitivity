import React from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { Input } from 'antd';

interface TaskUserInputDurationProps {
  value: number;
  units: UnitSyntax;
}

const TaskUserInputDuration: React.FC<TaskUserInputDurationProps> = ({ value, units }) => {
  return <Input type="number" defaultValue={value} suffix={units.zero} />;
};

export default TaskUserInputDuration;
