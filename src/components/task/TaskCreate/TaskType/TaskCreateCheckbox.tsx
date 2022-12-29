import React, { useEffect } from 'react';
import { Button, Input } from 'antd';
import {
  BaseTaskCreationFormFields,
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
import { useAntdForm } from '../../../../hooks/useAntdForm';
import TaskModifiers from './TaskModifiers';

interface FormTaskCheckbox extends BaseTaskCreationFormFields {
  taskName: string;
  pointCount: string;
}

const initValues: FormTaskCheckbox = {
  taskName: '',
  pointCount: '0',
  modifierPercentage: false,
};

const TaskCreateCheckbox: React.FC = () => {
  const dispatch = useDispatch();

  const {
    form,
    data: { taskName, pointCount },
  } = useAntdForm<FormTaskCheckbox>(initValues);

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
        <TaskModifiers />
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </SForm>
    </FormWrapper>
  );
};

export default TaskCreateCheckbox;
