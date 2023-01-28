import React, { ChangeEventHandler } from 'react';
import { UnitSyntax } from '../../../../helpers/unitSyntaxHelpers';
import { Input } from 'antd';

interface TaskUserInputUnitsProps {
  value: number | undefined;
  units: UnitSyntax;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TaskUserInputUnits: React.FC<TaskUserInputUnitsProps> = ({ value, units, onChange }) => {
  return (
    <Input
      type="number"
      placeholder="0"
      defaultValue={value}
      suffix={units.zero}
      onChange={onChange}
      size="small"
    />
  );
};

export default TaskUserInputUnits;
