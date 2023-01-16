import React, { useMemo } from 'react';
import { Select, SelectProps } from 'antd';
import { OptionCheckpoint } from '../../../../types/Tasks';
import { width100percent } from '../../../forms/AntdFormComponents';

interface TaskUserInputOptionsProps {
  value: number | undefined;
  options: OptionCheckpoint[];
  onChange: SelectProps['onChange'];
}

const TaskUserInputOptions: React.FC<TaskUserInputOptionsProps> = ({
  value,
  options,
  onChange,
}) => {
  const selectOptions: SelectProps['options'] = useMemo(
    () => options.map(o => ({ value: o.optionId, label: o.option })),
    [options],
  );

  return (
    <Select
      defaultValue={value}
      options={selectOptions}
      style={width100percent}
      placeholder="Select option"
      onChange={onChange}
    />
  );
};

export default TaskUserInputOptions;
