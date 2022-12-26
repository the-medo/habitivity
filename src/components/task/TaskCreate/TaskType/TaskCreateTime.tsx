import React, { useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import {
  FormItem,
  SForm,
  FormWrapper,
  ruleRequiredNoMessage,
  changeableFieldValidator,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import { ValidatorRule } from 'rc-field-form/lib/interface';
import NewCheckpointButton from '../../../forms/NewCheckpointButton';
import FieldsCheckpointsTime from './FieldsCheckpointsTime';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import { Dayjs } from 'dayjs';
import {dayjsToMinutes} from "../../../../helpers/dayjs/dayjsToMinutes";

type TimeCheckpoint = {
  pointCount?: string;
  time?: Dayjs;
};

const currentSetupExamples = (_taskName = 'Task name', checkpoints: TimeCheckpoint[] | undefined): string[] => {
  const examples: string[] = [];
  console.log("EXAMPLES: ", checkpoints);
  let fullData: {
    pointCount: number,
    time: number,
    timeFormatted: string,
  }[] = [];

  if (checkpoints) {

    checkpoints.forEach(c => {
      if (c && c.time && c.pointCount) {
        fullData.push({
          pointCount: parseInt(c.pointCount),
          time: dayjsToMinutes(c.time),
          timeFormatted: c.time.format("HH:mm"),
        })
      }
    });

    fullData.sort((a, b) => a.time < b.time ? -1 : 1);

    if (fullData.length > 0) {
      examples.push(`${fullData[0].timeFormatted} and earlier: ${fullData[0].pointCount} points`)

      if (fullData.length > 1) {
        for (let i = 1; i < fullData.length; i++) {
          const timeDiff = fullData[i].time - fullData[i - 1].time;
          const pointDiff = fullData[i].pointCount - fullData[i - 1].pointCount;
          const interval = timeDiff > 60 ? 60 : (timeDiff > 15 ? 15 : 5);
          const intervalCount = timeDiff / interval;
          if (intervalCount > 1) {
            examples.push(`For each ${interval} minutes between ${fullData[i - 1].timeFormatted} and ${fullData[i].timeFormatted} you get ${(pointDiff / timeDiff * interval).toFixed(2)} points`);
            examples.push(`${fullData[i].timeFormatted}: ${fullData[i].pointCount} points`);
          }
        }
      }

      examples.push(`${fullData[fullData.length - 1].timeFormatted} and later: ${fullData[fullData.length - 1].pointCount} points`)
    }

  } else {
    examples.push(`Examples of your setup will be shown here after filling the form.`);
  }
  return examples;
};

const TaskCreateTime: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const initialValues = useMemo(() => ({ checkpoints: [undefined, undefined] }), []);
  const taskName = Form.useWatch<string>('taskName', form);
  const checkpoints = Form.useWatch<TimeCheckpoint[]>('checkpoints', form);

  useEffect(() => {
    dispatch(setExamples(currentSetupExamples(taskName, checkpoints)));
  }, [dispatch, taskName, checkpoints]);

  const checkpointValidator: ValidatorRule[] = useMemo(
    () => changeableFieldValidator('time points', 2),
    [],
  );

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
        <FormItem label="Units and points:">
          <Form.List name="checkpoints" rules={checkpointValidator}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <FieldsCheckpointsTime
                    key={key}
                    name={name}
                    restField={restField}
                    remove={remove}
                    labelPoints={countableString(
                      checkpoints?.[key]?.pointCount ?? 0,
                      pointCountable,
                    )}
                  />
                ))}
                <NewCheckpointButton add={add} text="Add time point" />
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </FormItem>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </SForm>
    </FormWrapper>
  );
};

export default TaskCreateTime;
