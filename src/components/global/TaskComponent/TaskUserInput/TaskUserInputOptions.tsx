import React, { useMemo } from 'react';
import { Select, SelectProps } from 'antd';
import { OptionCheckpoint } from '../../../../types/Tasks';
import { width100percent } from '../../../forms/AntdFormComponents';

interface TaskUserInputOptionsProps {
  value: number;
  options: OptionCheckpoint[];
}

const TaskUserInputOptions: React.FC<TaskUserInputOptionsProps> = ({ value, options }) => {
  const selectOptions: SelectProps['options'] = useMemo(
    () => options.map(o => ({ value: o.optionId, label: o.option })),
    [options],
  );

  return (
    <Select
      defaultValue={value}
      options={selectOptions}
      style={width100percent}
      placeholder="Select your option"
    />
  );
};

export default TaskUserInputOptions;
