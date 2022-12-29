import React, { useEffect, useMemo } from 'react';
import type { ValidatorRule } from 'rc-field-form/lib/interface';
import { Button, Form, Input } from 'antd';
import {
  FormItem,
  SForm,
  FormWrapper,
  ruleRequiredNoMessage,
  changeableFieldValidator,
  UnitsFormFields,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';
import CustomUnitDefinition from './CustomUnitDefinition';
import { useCustomUnitForm } from '../../../../hooks/useCustomUnitForm';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';
import FieldsCheckpointsUnitAndPoints from './FieldsCheckpointsUnitAndPoints';
import NewCheckpointButton from '../../../forms/NewCheckpointButton';
import { examplesUnitCheckpoint } from './currentSetupExamples/examplesUnitCheckpoints';
import {
  checkForDuplicatesInDynamicFields,
  DuplicateCheck,
} from '../../../forms/checkForDuplicatesInDynamicFields';
import { useAntdForm } from '../../../../hooks/useAntdForm';

export interface UnitCheckpoint {
  pointCount?: string;
  unitCountForPoint?: string;
}

interface FormTaskUnitCheckpoints extends UnitsFormFields {
  taskName: string;
  checkpoints: UnitCheckpoint[];
}

const initValues: FormTaskUnitCheckpoints = {
  taskName: '',
  checkpoints: [
    { pointCount: '', unitCountForPoint: '' },
    { pointCount: '', unitCountForPoint: '' },
  ],
};

const TaskCreateUnitCheckpoints: React.FC = () => {
  const dispatch = useDispatch();

  const {
    form,
    data: { taskName, checkpoints },
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

  return (
    <FormWrapper>
      <SForm
        form={form}
        layout="vertical"
        name="new-task"
        requiredMark={false}
        colon={false}
        initialValues={initValues}
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
                <NewCheckpointButton add={add} text="Add unit checkpoint" />
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

export default TaskCreateUnitCheckpoints;
