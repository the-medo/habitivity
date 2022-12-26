import React, { useEffect, useMemo } from 'react';
import { Button, Form, Input, Select } from 'antd';
import {DurationUnits, durationUnitsSyntax} from '../../../../types/Tasks';
import {
  FormItem,
  FormItemInline,
  FormInlineText,
  FormWrapper,
  SForm,
  ruleRequiredNoMessage,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import {ExampleType} from "./ExampleBox";
import {countableString, pointCountable} from "../../../../helpers/unitSyntaxHelpers";

const currentSetupExamples = (
  taskName = 'Task name',
  unitCountForPoint: number | undefined,
  pointCount: number | undefined,
  units: DurationUnits,
): ExampleType[] => {
  const examples: ExampleType[] = [];
  if (unitCountForPoint && pointCount) {
    const baseExampleKey = `ucfp-${unitCountForPoint}-pc-${pointCount}-u-${units}`
    const unitCountForOnePoint = (unitCountForPoint / pointCount);

    if (pointCount !== 1) {
      examples.push({ //Get 1 point for 5 minutes of "Task name"
        key: `1-${baseExampleKey}`,
        example: `Get 1.00 point for ${unitCountForOnePoint.toFixed(2)} ${countableString(unitCountForOnePoint, durationUnitsSyntax[units])} of "${taskName}"`,
      });
    }
    examples.push({ //Get 2 points for 10 minutes of "Task name"
      key: `2-${baseExampleKey}`,
      example: `Get ${pointCount.toFixed(2)} ${countableString(pointCount, pointCountable)} for ${unitCountForPoint.toFixed(2)} ${countableString(unitCountForPoint, durationUnitsSyntax[units])} of "${taskName}"`
    });

    examples.push({ //Get 4 points for 20 minutes of "Task name"
      key: `3-${baseExampleKey}`,
      example: `Get ${(pointCount * 2).toFixed(2)} ${countableString(pointCount * 2, pointCountable)}  for ${(unitCountForPoint * 2).toFixed(2)} ${countableString(unitCountForPoint * 2, durationUnitsSyntax[units])} of "${taskName}"`,
    });

    if (units === DurationUnits.MINUTE) {
      const pointsPerHour = ((60 / unitCountForPoint) * pointCount);
      const pointsPerMinute = ((1 / unitCountForPoint) * pointCount);

      examples.push({ // For one hour of "Task name", get 12 points
        key: `4-${baseExampleKey}`,
        example: `For one hour of "${taskName}", get ${pointsPerHour.toFixed(2)} ${countableString(pointsPerHour, pointCountable)}`,
      });

      if (unitCountForPoint !== 1) {
        examples.push({ // For one minute of "Task name", get 0.2 points
          key: `5-${baseExampleKey}`,
          example: `For one minute of "${taskName}", get ${pointsPerMinute.toFixed(2)} ${countableString(pointsPerMinute, pointCountable)}`,
        });
      }
    } else if (units === DurationUnits.SECOND) {
      const pointsPerMinute = ((60 / unitCountForPoint) * pointCount);
      examples.push({
        key: `6-${baseExampleKey}`,
        example: `For one minute of "${taskName}", get ${pointsPerMinute.toFixed(2)} ${countableString(pointsPerMinute, pointCountable)}`,
      });
    } else if (units === DurationUnits.HOUR) { //3 points per 2 hours => 3 points per 120 minutes => 120 / 3 =
      const pointsPerMinute = pointCount / (unitCountForPoint * 60);
      const minutesPerPoint = (unitCountForPoint * 60) / pointCount;
      examples.push({
        key: `7-${baseExampleKey}`,
        example: `For one minute of "${taskName}", get ${pointsPerMinute.toFixed(2)} ${countableString(pointsPerMinute, pointCountable)}`,
      });
      examples.push({
        key: `8-${baseExampleKey}`,
        example: `Get 1.00 point per ${minutesPerPoint.toFixed(2)} ${countableString(pointsPerMinute, durationUnitsSyntax[DurationUnits.MINUTE])} of "${taskName}"`,
      });
    }
  } else {
    examples.push({key: `no-examples`, example: `Examples of your setup will be shown here after filling the form.`});
  }

  return examples;
};

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
        currentSetupExamples(
          taskName,
          parseFloat(unitCountForPoint),
          parseFloat(pointCount),
          units,
        ),
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
            points for each
          </FormInlineText>
          <FormItem $width="4rem" name="unitCountForPoint" rules={ruleRequiredNoMessage}>
            <Input placeholder="15" type="number" />
          </FormItem>
          <FormItem name="units" $width="8rem">
            <Select disabled={false}>
              <Select.Option value={DurationUnits.HOUR}>Hours</Select.Option>
              <Select.Option value={DurationUnits.MINUTE}>Minutes</Select.Option>
              <Select.Option value={DurationUnits.SECOND}>Seconds</Select.Option>
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
