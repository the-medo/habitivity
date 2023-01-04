import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import {
  FormItem,
  FormWrapper,
  FormItemInline,
  FormInlineText,
  ruleRequiredNoMessage,
  UnitsFormFields,
  BaseTaskCreationFormFields,
} from '../../../components/forms/AntdFormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import CustomUnitDefinition from './CustomUnitDefinition';
import { useCustomUnitForm } from '../../../hooks/useCustomUnitForm';
import { countableString, pointCountable } from '../../../helpers/unitSyntaxHelpers';
import { examplesUnits } from './currentSetupExamples/examplesUnits';
import { useAntdForm } from '../../../hooks/useAntdForm';
import TaskModifiers from './TaskModifiers';
import { ReduxState } from '../../../store';
import { parseFormFieldsToTask, TTUnitsWithFormFields } from './parseFormFieldsToTask';
import { TaskType } from '../../../types/Tasks';
import { TaskCreateProps } from '../TaskCreateForm';

export interface FormTaskUnits extends UnitsFormFields, BaseTaskCreationFormFields {
  taskName: string;
  pointCount: string;
  unitCountForPoint: string;
}

const initValues: FormTaskUnits = {
  taskName: '',
  pointCount: '',
  unitCountForPoint: '',
  modifierPercentage: false,
};

const TaskCreateUnits: React.FC<TaskCreateProps> = ({ createTaskHandler }) => {
  const dispatch = useDispatch();
  const { newTaskSharedProps } = useSelector((state: ReduxState) => state.taskCreationReducer);

  const {
    form,
    data: { taskName, pointCount, unitCountForPoint },
  } = useAntdForm<FormTaskUnits>(initValues);

  const units = useCustomUnitForm<FormTaskUnits>(form);

  useEffect(() => {
    dispatch(
      setExamples(examplesUnits(parseFloat(unitCountForPoint), parseFloat(pointCount), units)),
    );
  }, [dispatch, unitCountForPoint, pointCount, units]);

  const onSubmitHandler = useCallback(
    (values: FormTaskUnits) => {
      if (newTaskSharedProps) {
        createTaskHandler(
          parseFormFieldsToTask<TTUnitsWithFormFields>(newTaskSharedProps, {
            taskType: TaskType.UNITS,
            fields: values,
            units,
          }),
        );
      }
    },
    [createTaskHandler, newTaskSharedProps, units],
  );

  return (
    <FormWrapper>
      <Form<FormTaskUnits>
        form={form}
        layout="vertical"
        name="new-task"
        requiredMark={false}
        colon={false}
        initialValues={initValues}
        onFinish={onSubmitHandler}
      >
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
            {taskName.length > 0 ? taskName : `this action`}&quot;
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

export default TaskCreateUnits;
