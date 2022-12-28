import React, { useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import {
  changeableFieldValidator,
  FormItem,
  FormWrapper,
  ruleRequiredNoMessage,
  SForm,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import { ValidatorRule } from 'rc-field-form/lib/interface';
import NewCheckpointButton from '../../../forms/NewCheckpointButton';
import FieldsCheckpointsTime from './FieldsCheckpointsTime';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import { Dayjs } from 'dayjs';
import { examplesTime } from './currentSetupExamples/examplesTime';
import {
  checkForDuplicatesInDynamicFields,
  DuplicateCheck,
} from '../../../forms/checkForDuplicatesInDynamicFields';

export type TimeCheckpoint =
  | {
      pointCount?: string;
      time?: Dayjs;
    }
  | undefined;

const TaskCreateTime: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const initialValues = useMemo(() => ({ checkpoints: [undefined, undefined] }), []);
  const taskName = Form.useWatch<string>('taskName', form);
  const checkpoints = Form.useWatch<TimeCheckpoint[]>('checkpoints', form);
  const duplicateCheck = useMemo(
    () =>
      checkForDuplicatesInDynamicFields({ type: DuplicateCheck.TIME, value: checkpoints })
        ? [`Having the same time more than once is not allowed.`]
        : undefined,
    [checkpoints],
  );

  useEffect(() => {
    dispatch(setExamples(examplesTime(checkpoints)));
  }, [dispatch, checkpoints]);

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
                <Form.ErrorList errors={duplicateCheck ?? errors} />
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
