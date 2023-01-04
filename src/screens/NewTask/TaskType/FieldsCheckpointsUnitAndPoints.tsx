import React, { useCallback, useMemo } from 'react';
import {
  FormInlineText,
  FormItem,
  FormItemInline,
  ruleRequiredNoMessage,
} from '../../../components/forms/AntdFormComponents';
import { FormListOperation, Input } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

interface FieldsCheckpointsUnitAndPointsProps {
  name: number;
  restField: { fieldKey?: number | undefined };
  remove: FormListOperation['remove'];
  labelUnit: string;
  labelPoints: string;
}

const FieldsCheckpointsUnitAndPoints: React.FC<FieldsCheckpointsUnitAndPointsProps> = ({
  name,
  restField,
  remove,
  labelUnit,
  labelPoints,
}) => {
  const removeHandler = useCallback(() => remove(name), [name, remove]);
  const unitCountForPointName = useMemo(() => [name, 'unitCountForPoint'], [name]);
  const pointCountName = useMemo(() => [name, 'pointCount'], [name]);

  return (
    <FormItemInline>
      <FormInlineText $isItalic $minWidth="1rem">
        For
      </FormInlineText>
      <FormItem
        {...restField}
        $width="4rem"
        name={unitCountForPointName}
        rules={ruleRequiredNoMessage}
      >
        <Input placeholder="2" type="number" />
      </FormItem>
      <FormInlineText $isItalic $minWidth="1rem">
        {' '}
        <b>{labelUnit}</b> you will get{' '}
      </FormInlineText>
      <FormItem {...restField} $width="4rem" name={pointCountName} rules={ruleRequiredNoMessage}>
        <Input placeholder="10" type="number" />
      </FormItem>
      <FormInlineText $isItalic $minWidth="1rem">
        {' '}
        <b>{labelPoints}</b>{' '}
      </FormInlineText>
      <MinusCircleOutlined onClick={removeHandler} />
    </FormItemInline>
  );
};

export default FieldsCheckpointsUnitAndPoints;
