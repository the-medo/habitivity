import React, { ChangeEventHandler } from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { Input } from 'antd';

interface TaskUserInputUnitCheckpointsProps {
  value: number | undefined;
  units: UnitSyntax;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TaskUserInputUnitCheckpoints: React.FC<TaskUserInputUnitCheckpointsProps> = ({
  value,
  units,
  onChange,
}) => {
  return (
    <Input
      type="number"
      defaultValue={value}
      suffix={units.zero}
      placeholder="0"
      onChange={onChange}
    />
  );
};

export default TaskUserInputUnitCheckpoints;
