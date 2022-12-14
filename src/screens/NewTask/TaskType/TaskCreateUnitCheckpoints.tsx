import React, { useCallback, useEffect, useMemo } from 'react';
import type { ValidatorRule } from 'rc-field-form/lib/interface';
import { Button, Form, Input } from 'antd';
import {
  FormItem,
  FormWrapper,
  ruleRequiredNoMessage,
  changeableFieldValidator,
  UnitsFormFields,
  BaseTaskCreationFormFields,
} from '../../../components/forms/AntdFormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import CustomUnitDefinition from './CustomUnitDefinition';
import { useCustomUnitForm } from '../../../hooks/useCustomUnitForm';
import { countableString, pointCountable } from '../../../helpers/unitSyntaxHelpers';
import FieldsCheckpointsUnitAndPoints from './FieldsCheckpointsUnitAndPoints';
import NewCheckpointButton from '../../../components/forms/NewCheckpointButton';
import { examplesUnitCheckpoint } from './currentSetupExamples/examplesUnitCheckpoints';
import {
  checkForDuplicatesInDynamicFields,
  DuplicateCheck,
} from '../../../components/forms/checkForDuplicatesInDynamicFields';
import { useAntdForm } from '../../../hooks/useAntdForm';
import TaskModifiers from './TaskModifiers';
import { ReduxState } from '../../../store';
import { parseFormFieldsToTask, TTUnitCheckpointsWithFormFields } from './parseFormFieldsToTask';
import { TaskType } from '../../../types/Tasks';
import { TaskCreateProps } from '../TaskCreateForm';

export interface UnitCheckpoint {
  pointCount?: string;
  unitCountForPoint?: string;
}

export interface FormTaskUnitCheckpoints extends UnitsFormFields, BaseTaskCreationFormFields {
  taskName: string;
  checkpoints: UnitCheckpoint[];
}

const initValues: FormTaskUnitCheckpoints = {
  taskName: '',
  checkpoints: [
    { pointCount: '', unitCountForPoint: '' },
    { pointCount: '', unitCountForPoint: '' },
  ],
  modifierPercentage: false,
};

const TaskCreateUnitCheckpoints: React.FC<TaskCreateProps> = ({ createTaskHandler }) => {
  const dispatch = useDispatch();
  const { newTaskSharedProps } = useSelector((state: ReduxState) => state.taskCreationReducer);
  const defaultNewOption: UnitCheckpoint = useMemo(
    () => ({ pointCount: '', unitCountForPoint: '' }),
    [],
  );

  const {
    form,
    data: { checkpoints },
  } = useAntdForm<FormTaskUnitCheckpoints>(initValues);

  const units = useCustomUnitForm<FormTaskUnitCheckpoints>(form);

  const duplicateCheck = useMemo(
    () =>
      checkForDuplicatesInDynamicFields({
        type: DuplicateCheck.UNIT_CHECKPOINT,
        value: checkpoints,
      })
        ? [`Having the same amount of "${units.twoAndMore}" more than once is not allowed.`]
        : undefined,
    [checkpoints, units],
  );

  useEffect(() => {
    dispatch(setExamples(examplesUnitCheckpoint(checkpoints, units)));
  }, [dispatch, checkpoints, units]);

  const checkpointValidator: ValidatorRule[] = useMemo(
    () => changeableFieldValidator('checkpoints', 2),
    [],
  );

  const onSubmitHandler = useCallback(
    (values: FormTaskUnitCheckpoints) => {
      if (newTaskSharedProps) {
        createTaskHandler(
          parseFormFieldsToTask<TTUnitCheckpointsWithFormFields>(newTaskSharedProps, {
            taskType: TaskType.UNIT_CHECKPOINTS,
            fields: values,
            units,
          }),
        );
      }
    },
    [createTaskHandler, newTaskSharedProps, units],
  );

  return (
    <FormWrapper>
      <Form<FormTaskUnitCheckpoints>
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
                    labelUnit={countableString(checkpoints[key]?.unitCountForPoint ?? 0, units)}
                    labelPoints={countableString(checkpoints[key]?.pointCount ?? 0, pointCountable)}
                  />
                ))}
                <NewCheckpointButton
                  add={add}
                  text="Add unit checkpoint"
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

export default TaskCreateUnitCheckpoints;
