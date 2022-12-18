import React, { useCallback, useMemo } from 'react';
import {
  FormInlineText,
  FormItem,
  FormItemInline,
  ruleRequiredNoMessage,
} from '../../../forms/AntdFormComponents';
import { FormListOperation, Input, TimePicker } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

interface FieldsCheckpointsTimeProps {
  name: number;
  restField: { fieldKey?: number | undefined };
  remove: FormListOperation['remove'];
  labelPoints: string;
}

const FieldsCheckpointsTime: React.FC<FieldsCheckpointsTimeProps> = ({
  name,
  restField,
  remove,
  labelPoints,
}) => {
  const removeHandler = useCallback(() => remove(name), [name, remove]);
  const pointCountName = useMemo(() => [name, 'pointCount'], [name]);
  const timeName = useMemo(() => [name, 'time'], [name]);

  const timepickerFormat = 'HH:mm';

  return (
    <FormItemInline>
      <FormInlineText $isItalic $minWidth="1rem">
        Get
      </FormInlineText>
      <FormItem {...restField} $width="4rem" name={pointCountName} rules={ruleRequiredNoMessage}>
        <Input placeholder="2" type="number" />
      </FormItem>
      <FormInlineText $isItalic $minWidth="1rem">
        <b>{labelPoints}</b> when action is done at{' '}
      </FormInlineText>
      <FormItem {...restField} $width="6rem" name={timeName} rules={ruleRequiredNoMessage}>
        <TimePicker format={timepickerFormat} minuteStep={5} placeholder="06:00" />
      </FormItem>
      <MinusCircleOutlined onClick={removeHandler} />
    </FormItemInline>
  );
};

export default FieldsCheckpointsTime;
