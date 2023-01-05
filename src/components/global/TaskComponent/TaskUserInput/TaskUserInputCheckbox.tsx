import React from 'react';
import { UserInputWrapper } from './TaskUserInputComponents';
import { Switch } from 'antd';

interface TaskUserInputCheckboxProps {
  value: number;
}

const TaskUserInputCheckbox: React.FC<TaskUserInputCheckboxProps> = ({ value }) => {
  return (
    <UserInputWrapper>
      <Switch />
    </UserInputWrapper>
  );
};

export default TaskUserInputCheckbox;
