import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import {
  BaseTaskCreationFormFields,
  changeableFieldValidator,
  FormItem,
  FormWrapper,
  ruleRequiredNoMessage,
} from '../../../components/forms/AntdFormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import { countableString, pointCountable } from '../../../helpers/unitSyntaxHelpers';
import NewCheckpointButton from '../../../components/forms/NewCheckpointButton';
import { ValidatorRule } from 'rc-field-form/lib/interface';
import FieldsOptions from './FieldsOptions';
import { examplesOptions } from './currentSetupExamples/examplesOptions';
import {
  checkForDuplicatesInDynamicFields,
  DuplicateCheck,
} from '../../../components/forms/checkForDuplicatesInDynamicFields';
import { useAntdForm } from '../../../hooks/useAntdForm';
import TaskModifiers from './TaskModifiers';
import { ReduxState } from '../../../store';
import { parseFormFieldsToTask, TTOptionsWithFormFields } from './parseFormFieldsToTask';
import { TaskType } from '../../../types/Tasks';
import { TaskCreateProps } from '../TaskCreateForm';

export interface OptionCheckpoint {
  option?: string;
  pointCount?: string;
}

export interface FormTaskOptions extends BaseTaskCreationFormFields {
  taskName: string;
  options: OptionCheckpoint[];
}

const initValues: FormTaskOptions = {
  taskName: '',
  options: [
    { option: '', pointCount: '' },
    { option: '', pointCount: '' },
  ],
  modifierPercentage: false,
};

const TaskCreateOptions: React.FC<TaskCreateProps> = ({ createTaskHandler }) => {
  const dispatch = useDispatch();
  const { newTaskSharedProps } = useSelector((state: ReduxState) => state.taskCreationReducer);
  const defaultNewOption: OptionCheckpoint = useMemo(() => ({ option: '', pointCount: '' }), []);

  const {
    form,
    data: { options },
  } = useAntdForm<FormTaskOptions>(initValues);

  const duplicateCheck = useMemo(
    () =>
      checkForDuplicatesInDynamicFields({ type: DuplicateCheck.OPTION, value: options })
        ? [`Having the same option more than once is not allowed.`]
        : undefined,
    [options],
  );

  useEffect(() => {
    dispatch(setExamples(examplesOptions(options)));
  }, [dispatch, options]);

  const optionValidator: ValidatorRule[] = useMemo(
    () => changeableFieldValidator('options', 2),
    [],
  );

  const onSubmitHandler = useCallback(
    (values: FormTaskOptions) => {
      if (newTaskSharedProps) {
        createTaskHandler(
          parseFormFieldsToTask<TTOptionsWithFormFields>(newTaskSharedProps, {
            taskType: TaskType.OPTIONS,
            fields: values,
          }),
        );
      }
    },
    [createTaskHandler, newTaskSharedProps],
  );

  return (
    <FormWrapper>
      <Form<FormTaskOptions>
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
                    labelPoints={countableString(options[key]?.pointCount ?? 0, pointCountable)}
                  />
                ))}
                <NewCheckpointButton add={add} text="Add option" defaultValues={defaultNewOption} />
                <Form.ErrorList errors={duplicateCheck ?? errors} />
              </>
            )}
          </Form.List>
        </FormItem>
        <TaskModifiers />
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default TaskCreateOptions;
