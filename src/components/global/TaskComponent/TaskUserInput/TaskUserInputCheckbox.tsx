import React from 'react';
import { Switch } from 'antd';
import { UserInputWrapper } from './TaskUserInputComponents';

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
