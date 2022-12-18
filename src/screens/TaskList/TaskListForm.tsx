import React, { useEffect, useMemo } from 'react';
import { TaskList, TaskListType } from '../../types/TaskLists';
import { Button, Form, Input, Select, Spin } from 'antd';
import { FormTaskListCreate } from './TaskListCreate';
import { FormTaskListEdit } from './TaskListEdit';
import ButtonWrapper from '../../components/global/ButtonWrapper';
import {
  colSpan18,
  colSpan6,
  ruleRequiredNoMessage,
  wrapperColSpanMovedButton,
} from '../../components/forms/AntdFormComponents';

interface TaskListFormProps {
  taskList?: TaskList;
  isLoading?: boolean;
  isEdit?: boolean;
  onFinish: ((values: FormTaskListCreate) => void) | ((values: FormTaskListEdit) => void);
  onDelete?: () => void;
}

const TaskListForm: React.FC<TaskListFormProps> = ({
  taskList,
  isLoading,
  isEdit,
  onFinish,
  onDelete,
}) => {
  useEffect(() => {
    console.log('TASK LIST CHANGED!!! ', taskList);
  }, [taskList]);

  const initialValues = useMemo(
    () => ({
      taskListName: taskList && isEdit ? taskList.name : undefined,
      taskListType: TaskListType.DAILY,
    }),
    [isEdit, taskList],
  );

  if (taskList?.userId === 'temp-user-id') {
    return (
      <Spin tip="Loading...">
        <TaskListForm onFinish={onFinish} />
      </Spin>
    );
  }

  return (
    <Form
      labelCol={colSpan6}
      wrapperCol={colSpan18}
      layout="horizontal"
      name="new-task-list"
      initialValues={initialValues}
      disabled={isLoading}
      onFinish={onFinish}
    >
      <Form.Item label="Task list name" name="taskListName" rules={ruleRequiredNoMessage}>
        <Input placeholder="Task list name" />
      </Form.Item>
      <Form.Item
        label="Task list type"
        name="taskListType"
        tooltip={isEdit && 'It is not possible to change task list type'}
      >
        <Select disabled={isEdit}>
          <Select.Option value={TaskListType.DAILY}>Daily</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={wrapperColSpanMovedButton}>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit">
            {isEdit ? 'Edit' : 'Create'}
          </Button>
          {isEdit && (
            <Button danger htmlType="reset" onClick={onDelete}>
              Delete
            </Button>
          )}
        </ButtonWrapper>
      </Form.Item>
    </Form>
  );
};

export default TaskListForm;
