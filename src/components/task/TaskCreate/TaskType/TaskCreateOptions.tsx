import React, { useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import {
  changeableFieldValidator,
  checkNonDuplicates,
  FormItem,
  FormWrapper,
  ruleRequiredNoMessage,
  SForm,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import NewCheckpointButton from '../../../forms/NewCheckpointButton';
import { ValidatorRule } from 'rc-field-form/lib/interface';
import FieldsOptions from './FieldsOptions';
import { examplesOptions } from './currentSetupExamples/examplesOptions';

export type OptionCheckpoint =
  | {
      option?: string;
      pointCount?: string;
    }
  | undefined;

const TaskCreateOptions: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const taskName = Form.useWatch<string>('taskName', form);
  const initialValues = useMemo(() => ({ options: [undefined, undefined] }), []);
  const options = Form.useWatch<OptionCheckpoint[]>('options', form);
  const duplicatesInOptions = useMemo(
    () =>
      checkNonDuplicates(options, ['option']) ? [`There are duplicates in options!`] : undefined,
    [options],
  );

  useEffect(() => {
    dispatch(setExamples(examplesOptions(options)));
  }, [dispatch, options]);

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
                <Form.ErrorList errors={duplicatesInOptions ?? errors} />
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
