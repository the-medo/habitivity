import React from 'react';
import { TimePicker } from 'antd';
import { timepickerFormat } from '../../../forms/AntdFormComponents';

interface TaskUserInputTimeProps {
  value: string;
}

const TaskUserInputTime: React.FC<TaskUserInputTimeProps> = ({ value }) => {
  return (
    <TimePicker
      format={timepickerFormat}
      minuteStep={5}
      placeholder="06:00"
      style={{ width: '100%' }}
    />
  );
};

export default TaskUserInputTime;
