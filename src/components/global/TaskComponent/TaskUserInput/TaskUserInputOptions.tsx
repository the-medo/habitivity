import React, { useMemo } from 'react';
import { Select, SelectProps } from 'antd';
import { OptionCheckpoint } from '../../../../types/Tasks';

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
      style={{ width: '100%' }}
      placeholder="Select your option"
    />
  );
};

export default TaskUserInputOptions;
