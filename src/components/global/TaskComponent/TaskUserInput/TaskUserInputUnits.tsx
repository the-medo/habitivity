import React from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { UserInputWrapper } from './TaskUserInputComponents';
import { Input } from 'antd';

interface TaskUserInputUnitsProps {
  value: number;
  units: UnitSyntax;
}

const TaskUserInputUnits: React.FC<TaskUserInputUnitsProps> = ({ value, units }) => {
  return (
    <UserInputWrapper>
      <Input type="number" defaultValue={value} suffix={units.zero} />
    </UserInputWrapper>
  );
};

export default TaskUserInputUnits;
