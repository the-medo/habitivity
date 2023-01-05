import React, { useMemo } from 'react';
import { UserInputWrapper } from './TaskUserInputComponents';
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
    <UserInputWrapper>
      <Select
        defaultValue={value}
        options={selectOptions}
        style={{ width: '100%' }}
        placeholder="Select your option"
      />
    </UserInputWrapper>
  );
};

export default TaskUserInputOptions;
