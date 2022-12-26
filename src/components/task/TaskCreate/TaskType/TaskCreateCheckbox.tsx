import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import {
  FormInlineText,
  FormItem,
  FormItemInline,
  FormWrapper,
  ruleRequiredNoMessage,
  SForm,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import { examplesCheckbox } from './currentSetupExamples/examplesCheckbox';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';

const TaskCreateCheckbox: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const taskName = Form.useWatch<string>('taskName', form);
  const pointCount = Form.useWatch<string>('pointCount', form);

  useEffect(() => {
    dispatch(setExamples(examplesCheckbox(taskName, pointCount)));
  }, [taskName, pointCount, dispatch]);

  return (
    <FormWrapper>
      <SForm form={form} layout="vertical" name="new-task" requiredMark={false} colon={false}>
        <FormItem label="Task name:" name="taskName" rules={ruleRequiredNoMessage}>
          <Input placeholder="Task name" />
        </FormItem>
        <FormItemInline label="Units and points:">
          <FormInlineText $isItalic $minWidth="1rem">
            Get
          </FormInlineText>
          <FormItem $width="4rem" name="pointCount" rules={ruleRequiredNoMessage}>
            <Input placeholder="2" type="number" />
          </FormItem>
          <FormInlineText $isItalic $minWidth="1rem">
            {countableString(pointCount, pointCountable)} for completing this task
          </FormInlineText>
        </FormItemInline>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </SForm>
    </FormWrapper>
  );
};

export default TaskCreateCheckbox;
