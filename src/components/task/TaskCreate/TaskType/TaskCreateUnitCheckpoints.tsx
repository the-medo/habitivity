import React, { useEffect, useMemo } from 'react';
import type { ValidatorRule } from 'rc-field-form/lib/interface';
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
import CustomUnitDefinition from './CustomUnitDefinition';
import { useCustomUnitForm } from '../../../../hooks/useCustomUnitForm';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import FieldsCheckpointsUnitAndPoints from './FieldsCheckpointsUnitAndPoints';
import NewCheckpointButton from '../../../forms/NewCheckpointButton';

const currentSetupExamples = (_taskName = 'Task name'): string[] => {
  const examples: string[] = [];
  examples.push(`Examples of your setup will be shown here after filling the form.`);
  return examples;
};

const TaskCreateUnitCheckpoints: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const initialValues = useMemo(() => ({ checkpoints: [undefined, undefined] }), []);
  const units = useCustomUnitForm(form);
  const taskName = Form.useWatch<string>('taskName', form);
  const checkpoints = Form.useWatch<
    | (
        | {
            unitCountForPoint: string;
            pointCount: string;
          }
        | undefined
      )[]
    | undefined
  >('checkpoints', form);

  useEffect(() => {
    dispatch(setExamples(currentSetupExamples(taskName)));
  }, [dispatch, taskName]);

  useEffect(() => {
    console.log(checkpoints);
  }, [checkpoints]);

  const checkpointValidator: ValidatorRule[] = useMemo(
    () => changeableFieldValidator('checkpoints', 2),
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
        <CustomUnitDefinition />
        <FormItem label="Units and points:">
          <Form.List name="checkpoints" rules={checkpointValidator}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <FieldsCheckpointsUnitAndPoints
                    key={key}
                    name={name}
                    restField={restField}
                    remove={remove}
                    labelUnit={countableString(checkpoints?.[key]?.unitCountForPoint ?? 0, units)}
                    labelPoints={countableString(
                      checkpoints?.[key]?.pointCount ?? 0,
                      pointCountable,
                    )}
                  />
                ))}
                <NewCheckpointButton add={add} text="Add unit checkpoint" />
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

export default TaskCreateUnitCheckpoints;
