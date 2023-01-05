import React from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { UserInputWrapper } from './TaskUserInputComponents';
import { Input } from 'antd';

interface TaskUserInputDurationProps {
  value: number;
  units: UnitSyntax;
}

const TaskUserInputDuration: React.FC<TaskUserInputDurationProps> = ({ value, units }) => {
  return (
    <UserInputWrapper>
      <Input type="number" defaultValue={value} suffix={units.zero} />
    </UserInputWrapper>
  );
};

export default TaskUserInputDuration;
