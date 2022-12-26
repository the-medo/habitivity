import React, { useEffect, useMemo } from 'react';
import { Button, Form, Input, Select } from 'antd';
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

const TaskCreateDuration: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const taskName = Form.useWatch<string>('taskName', form);
  const unitCountForPoint = Form.useWatch<string>('unitCountForPoint', form);
  const pointCount = Form.useWatch<string>('pointCount', form);
  const units = Form.useWatch<DurationUnits>('units', form);

  useEffect(() => {
    dispatch(
      setExamples(
        examplesDuration(taskName, parseFloat(unitCountForPoint), parseFloat(pointCount), units),
      ),
    );
  }, [taskName, unitCountForPoint, pointCount, units, dispatch]);

  const initialValues = useMemo(() => ({ units: DurationUnits.MINUTE }), []);

  return (
    <FormWrapper>
      <SForm
        form={form}
        layout="vertical"
        name="new-task"
        requiredMark={false}
        colon={false}
        initialValues={initialValues}
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
