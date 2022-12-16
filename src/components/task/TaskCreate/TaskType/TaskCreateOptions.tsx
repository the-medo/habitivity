import React, { useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import { DurationUnits } from '../../../../types/Tasks';
import {
  FormItem,
  SForm,
  FormWrapper,
  ruleRequiredNoMessage,
} from '../../../forms/AntdFormComponents';
import { useDispatch } from 'react-redux';
import { setExamples } from '../taskCreationSlice';

const currentSetupExamples = (_taskName = 'Task name'): string[] => {
  const examples: string[] = [];
  examples.push(`Examples of your setup will be shown here after filling the form.`);
  return examples;
};

const TaskCreateOptions: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const initialValues = useMemo(() => ({ units: DurationUnits.MINUTE }), []);
  const taskName = Form.useWatch<string>('taskName', form);

  useEffect(() => {
    dispatch(setExamples(currentSetupExamples(taskName)));
  }, [dispatch, taskName]);

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
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </SForm>
    </FormWrapper>
  );
};

export default TaskCreateOptions;
