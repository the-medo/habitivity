import React, { useCallback, useMemo } from 'react';
import {
  FormInlineText,
  FormItem,
  FormItemInline,
  ruleRequiredNoMessage,
  timepickerFormat,
} from '../../../components/forms/AntdFormComponents';
import { FormListOperation, Input, TimePicker } from 'antd';
import DynamicIcon from '../../../components/global/DynamicIcon';

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
      <DynamicIcon icon="AiOutlineMinusCircle" onClick={removeHandler} />
    </FormItemInline>
  );
};

export default FieldsCheckpointsTime;
