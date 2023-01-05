import React from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { UserInputWrapper } from './TaskUserInputComponents';
import { Input } from 'antd';

interface TaskUserInputUnitCheckpointsProps {
  value: number;
  units: UnitSyntax;
}

const TaskUserInputUnitCheckpoints: React.FC<TaskUserInputUnitCheckpointsProps> = ({
  value,
  units,
}) => {
  return (
    <UserInputWrapper>
      <Input type="number" defaultValue={value} suffix={units.zero} />
    </UserInputWrapper>
  );
};

export default TaskUserInputUnitCheckpoints;
