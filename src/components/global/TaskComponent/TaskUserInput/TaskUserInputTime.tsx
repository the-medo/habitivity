import React from 'react';
import { TimePicker } from 'antd';
import { timepickerFormat, width100percent } from '../../../forms/AntdFormComponents';

interface TaskUserInputTimeProps {
  value: string;
}

const TaskUserInputTime: React.FC<TaskUserInputTimeProps> = ({ value }) => {
  return (
    <TimePicker
      format={timepickerFormat}
      minuteStep={5}
      placeholder="06:00"
      style={width100percent}
    />
  );
};

export default TaskUserInputTime;
