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
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import NewCheckpointButton from '../../../forms/NewCheckpointButton';
import { ValidatorRule } from 'rc-field-form/lib/interface';
import FieldsOptions from './FieldsOptions';

const currentSetupExamples = (_taskName = 'Task name'): string[] => {
  const examples: string[] = [];
  examples.push(`Examples of your setup will be shown here after filling the form.`);
  return examples;
};

const TaskCreateOptions: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const taskName = Form.useWatch<string>('taskName', form);
  const initialValues = useMemo(() => ({ options: [undefined, undefined] }), []);
  const options = Form.useWatch<
    | (
        | {
            option: string;
            pointCount: string;
          }
        | undefined
      )[]
    | undefined
  >('options', form);

  useEffect(() => {
    dispatch(setExamples(currentSetupExamples(taskName)));
  }, [dispatch, taskName]);

  useEffect(() => {
    console.log(options);
  }, [options]);

  const optionValidator: ValidatorRule[] = useMemo(
    () => changeableFieldValidator('options', 2),
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
        <FormItem label="Options:">
          <Form.List name="options" rules={optionValidator}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <FieldsOptions
                    key={key}
                    name={name}
                    restField={restField}
                    remove={remove}
                    labelPoints={countableString(options?.[key]?.pointCount ?? 0, pointCountable)}
                  />
                ))}
                <NewCheckpointButton add={add} text="Add option" />
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

export default TaskCreateOptions;
