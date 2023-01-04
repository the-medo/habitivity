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
import { ValidatorRule } from 'rc-field-form/lib/interface';
import NewCheckpointButton from '../../../components/forms/NewCheckpointButton';
import FieldsCheckpointsTime from './FieldsCheckpointsTime';
import { countableString, pointCountable } from '../../../helpers/unitSyntaxHelpers';
import { Dayjs } from 'dayjs';
import { examplesTime } from './currentSetupExamples/examplesTime';
import {
  checkForDuplicatesInDynamicFields,
  DuplicateCheck,
} from '../../../components/forms/checkForDuplicatesInDynamicFields';
import { useAntdForm } from '../../../hooks/useAntdForm';
import TaskModifiers from './TaskModifiers';
import { parseFormFieldsToTask, TTTimeWithFormFields } from './parseFormFieldsToTask';
import { TaskType } from '../../../types/Tasks';
import { ReduxState } from '../../../store';
import { TaskCreateProps } from '../TaskCreateForm';

export interface TimeCheckpoint {
  pointCount?: string;
  time?: Dayjs;
}

export interface FormTaskTime extends BaseTaskCreationFormFields {
  taskName: string;
  checkpoints: TimeCheckpoint[];
}

const initValues: FormTaskTime = {
  taskName: '',
  checkpoints: [
    { pointCount: '', time: undefined },
    { pointCount: '', time: undefined },
  ],
  modifierPercentage: false,
};

const TaskCreateTime: React.FC<TaskCreateProps> = ({ createTaskHandler }) => {
  const dispatch = useDispatch();
  const { newTaskSharedProps } = useSelector((state: ReduxState) => state.taskCreationReducer);
  const defaultNewOption: TimeCheckpoint = useMemo(() => ({ pointCount: '', time: undefined }), []);

  const {
    form,
    data: { checkpoints },
  } = useAntdForm<FormTaskTime>(initValues);

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

  const onSubmitHandler = useCallback(
    (values: FormTaskTime) => {
      if (newTaskSharedProps) {
        createTaskHandler(
          parseFormFieldsToTask<TTTimeWithFormFields>(newTaskSharedProps, {
            taskType: TaskType.TIME,
            fields: values,
          }),
        );
      }
    },
    [createTaskHandler, newTaskSharedProps],
  );

  return (
    <FormWrapper>
      <Form<FormTaskTime>
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
                    labelPoints={countableString(checkpoints[key]?.pointCount ?? 0, pointCountable)}
                  />
                ))}
                <NewCheckpointButton
                  add={add}
                  text="Add time point"
                  defaultValues={defaultNewOption}
                />
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

export default TaskCreateTime;
