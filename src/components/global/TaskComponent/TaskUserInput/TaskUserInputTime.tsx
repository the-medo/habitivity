import React from 'react';
import { TimePicker } from 'antd';
import { timepickerFormat, width100percent } from '../../../forms/AntdFormComponents';
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import { minutesToDayjs } from '../../../../helpers/date/minutesToDayjs';

interface TaskUserInputTimeProps {
  value: number | undefined;
  onChange: PickerTimeProps<Dayjs | null>['onChange'];
}

const TaskUserInputTime: React.FC<TaskUserInputTimeProps> = ({ value, onChange }) => {
  return (
    <TimePicker
      format={timepickerFormat}
      defaultValue={value ? minutesToDayjs(value) : undefined}
      onChange={onChange}
      minuteStep={5}
      placeholder="06:00"
      style={width100percent}
    />
  );
};

export default TaskUserInputTime;
