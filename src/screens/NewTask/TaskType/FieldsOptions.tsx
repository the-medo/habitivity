import React, { useCallback, useMemo } from 'react';
import {
  FormInlineText,
  FormItem,
  FormItemInline,
  ruleRequiredNoMessage,
} from '../../../components/forms/AntdFormComponents';
import { FormListOperation, Input } from 'antd';
import DynamicIcon from '../../../components/global/DynamicIcon';

interface FieldsOptionsProps {
  name: number;
  restField: { fieldKey?: number | undefined };
  remove: FormListOperation['remove'];
  labelPoints: string;
}

const FieldsOptions: React.FC<FieldsOptionsProps> = ({ name, restField, remove, labelPoints }) => {
  const removeHandler = useCallback(() => remove(name), [name, remove]);
  const optionName = useMemo(() => [name, 'option'], [name]);
  const pointCountName = useMemo(() => [name, 'pointCount'], [name]);

  return (
    <FormItemInline>
      <FormItem {...restField} $width="12rem" name={optionName} rules={ruleRequiredNoMessage}>
        <Input placeholder="Text of your option" type="text" />
      </FormItem>
      <FormInlineText $isItalic $minWidth="1rem">
        {' '}
        this option gives you{' '}
      </FormInlineText>
      <FormItem {...restField} $width="4rem" name={pointCountName} rules={ruleRequiredNoMessage}>
        <Input placeholder="20" type="number" />
      </FormItem>
      <FormInlineText $isItalic $minWidth="1rem">
        <b>{labelPoints}</b>
      </FormInlineText>
      <DynamicIcon icon="AiOutlineMinusCircle" onClick={removeHandler} />
    </FormItemInline>
  );
};

export default FieldsOptions;
