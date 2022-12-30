import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import {
  BaseTaskCreationFormFields,
  FormInlineText,
  FormItem,
  FormItemInline,
  FormWrapper,
  ruleRequiredNoMessage,
} from '../../../forms/AntdFormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import { examplesCheckbox } from './currentSetupExamples/examplesCheckbox';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import { useAntdForm } from '../../../../hooks/useAntdForm';
import TaskModifiers from './TaskModifiers';
import { ReduxState } from '../../../../store';
import { parseFormFieldsToTask, TTCheckboxWithFormFields } from './parseFormFieldsToTask';
import { TaskType } from '../../../../types/Tasks';

export interface FormTaskCheckbox extends BaseTaskCreationFormFields {
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
  const { newTaskSharedProps } = useSelector((state: ReduxState) => state.taskCreationReducer);

  const {
    form,
    data: { taskName, pointCount },
  } = useAntdForm<FormTaskCheckbox>(initValues);

  useEffect(() => {
    dispatch(setExamples(examplesCheckbox(taskName, pointCount)));
  }, [taskName, pointCount, dispatch]);

  const onSubmitHandler = useCallback(
    (values: FormTaskCheckbox) => {
      if (newTaskSharedProps) {
        console.log(
          parseFormFieldsToTask<TTCheckboxWithFormFields>(newTaskSharedProps, {
            fields: values,
            taskType: TaskType.CHECKBOX,
          }),
        );
      }
    },
    [newTaskSharedProps],
  );

  return (
    <FormWrapper>
      <Form<FormTaskCheckbox>
        form={form}
        layout="vertical"
        name="new-task"
        requiredMark={false}
        colon={false}
        onFinish={onSubmitHandler}
      >
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
      </Form>
    </FormWrapper>
  );
};

export default TaskCreateCheckbox;
