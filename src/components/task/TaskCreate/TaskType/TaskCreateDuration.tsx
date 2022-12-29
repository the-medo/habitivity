import React, { useEffect } from 'react';
import { Button, Input, Select } from 'antd';
import { DurationUnits, durationUnitsSyntax } from '../../../../types/Tasks';
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
import { examplesDuration } from './currentSetupExamples/examplesDuration';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import { useAntdForm } from '../../../../hooks/useAntdForm';

interface FormTaskDuration {
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
};

const TaskCreateDuration: React.FC = () => {
  const dispatch = useDispatch();
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

  return (
    <FormWrapper>
      <SForm
        form={form}
        layout="vertical"
        name="new-task"
        requiredMark={false}
        colon={false}
        initialValues={initValues}
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
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </SForm>
    </FormWrapper>
  );
};

export default TaskCreateDuration;
