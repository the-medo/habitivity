import React, { ChangeEventHandler } from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { Input } from 'antd';

interface TaskUserInputDurationProps {
  value: number | undefined;
  units: UnitSyntax;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TaskUserInputDuration: React.FC<TaskUserInputDurationProps> = ({
  value,
  units,
  onChange,
}) => {
  return (
    <Input
      onChange={onChange}
      type="number"
      placeholder="0"
      defaultValue={value}
      suffix={units.zero}
    />
  );
};

export default TaskUserInputDuration;
