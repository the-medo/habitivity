import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { DurationUnits, durationUnitsSyntax, TaskType } from '../../../../types/Tasks';
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
import { examplesDuration } from './currentSetupExamples/examplesDuration';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import { useAntdForm } from '../../../../hooks/useAntdForm';
import TaskModifiers from './TaskModifiers';
import { parseFormFieldsToTask, TTDurationWithFormFields } from './parseFormFieldsToTask';
import { ReduxState } from '../../../../store';

export interface FormTaskDuration extends BaseTaskCreationFormFields {
  taskName: string;
  unitCountForPoint: string;
  pointCount: string;
  units: DurationUnits;
}

const initValues: FormTaskDuration = {
  taskName: '',
  unitCountForPoint: '',
  pointCount: '',
  units: DurationUnits.MINUTE,
  modifierPercentage: false,
};

const TaskCreateDuration: React.FC = () => {
  const dispatch = useDispatch();
  const { newTaskSharedProps } = useSelector((state: ReduxState) => state.taskCreationReducer);

  const {
    form,
    data: { taskName, unitCountForPoint, pointCount, units },
  } = useAntdForm<FormTaskDuration>(initValues);

  useEffect(() => {
    dispatch(
      setExamples(
        examplesDuration(
          taskName,
          unitCountForPoint ? parseFloat(unitCountForPoint) : undefined,
          pointCount ? parseFloat(pointCount) : undefined,
          units,
        ),
      ),
    );
  }, [taskName, unitCountForPoint, pointCount, units, dispatch]);

  const onSubmitHandler = useCallback(
    (values: FormTaskDuration) => {
      if (newTaskSharedProps) {
        console.log(
          parseFormFieldsToTask<TTDurationWithFormFields>(newTaskSharedProps, {
            taskType: TaskType.DURATION,
            fields: values,
          }),
        );
      }
    },
    [newTaskSharedProps],
  );

  return (
    <FormWrapper>
      <Form<FormTaskDuration>
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
            <Input placeholder="15" type="number" />
          </FormItem>
          <FormItem name="units" $width="8rem">
            <Select disabled={false}>
              <Select.Option value={DurationUnits.HOUR}>
                {countableString(unitCountForPoint, durationUnitsSyntax[DurationUnits.HOUR])}
              </Select.Option>
              <Select.Option value={DurationUnits.MINUTE}>
                {countableString(unitCountForPoint, durationUnitsSyntax[DurationUnits.MINUTE])}
              </Select.Option>
              <Select.Option value={DurationUnits.SECOND}>
                {countableString(unitCountForPoint, durationUnitsSyntax[DurationUnits.SECOND])}
              </Select.Option>
            </Select>
          </FormItem>
          <FormInlineText $isItalic $minWidth="1rem">
            of this action
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

export default TaskCreateDuration;
