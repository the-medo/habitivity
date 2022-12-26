import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import {
  FormItem,
  SForm,
  FormWrapper,
  FormItemInline,
  FormInlineText,
  ruleRequiredNoMessage,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import CustomUnitDefinition from './CustomUnitDefinition';
import { useCustomUnitForm } from '../../../../hooks/useCustomUnitForm';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import { examplesUnits } from './currentSetupExamples/examplesUnits';

const TaskCreateUnits: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const units = useCustomUnitForm(form);
  const taskName = Form.useWatch<string>('taskName', form);
  const unitCountForPoint = Form.useWatch<string>('unitCountForPoint', form);
  const pointCount = Form.useWatch<string>('pointCount', form);

  useEffect(() => {
    dispatch(
      setExamples(examplesUnits(parseFloat(unitCountForPoint), parseFloat(pointCount), units)),
    );
  }, [dispatch, unitCountForPoint, pointCount, units]);

  return (
    <FormWrapper>
      <SForm form={form} layout="vertical" name="new-task" requiredMark={false} colon={false}>
        <FormItem label="Task name:" name="taskName" rules={ruleRequiredNoMessage}>
          <Input placeholder="Task name" />
        </FormItem>
        <CustomUnitDefinition />
        <FormItemInline label="Units and points:">
          <FormInlineText $isItalic $minWidth="1rem">
            Get
          </FormInlineText>
          <FormItem $width="4rem" name="pointCount" rules={ruleRequiredNoMessage}>
            <Input placeholder="2" type="number" />
          </FormItem>
          <FormInlineText $isItalic $minWidth="1rem">
            {countableString(pointCount, pointCountable)} for each
          </FormInlineText>
          <FormItem $width="4rem" name="unitCountForPoint" rules={ruleRequiredNoMessage}>
            <Input placeholder="10" type="number" />
          </FormItem>
          <FormInlineText $isItalic $minWidth="1rem">
            {' '}
            <b>{countableString(unitCountForPoint, units)}</b> of &quot;
            {taskName?.length > 0 ? taskName : `this action`}&quot;
          </FormInlineText>
        </FormItemInline>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </SForm>
    </FormWrapper>
  );
};

export default TaskCreateUnits;
