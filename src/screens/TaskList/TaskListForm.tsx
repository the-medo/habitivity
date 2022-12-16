import React, { useEffect } from 'react';
import { TaskList, TaskListType } from '../../types/TaskLists';
import { Button, Form, Input, Select, Spin } from 'antd';
import { FormTaskListCreate } from './TaskListCreate';
import { FormTaskListEdit } from './TaskListEdit';
import ButtonWrapper from '../../components/global/ButtonWrapper';
import { ruleRequiredNoMessage } from '../../components/forms/AntdFormComponents';

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

  if (taskList?.userId === 'temp-user-id') {
    return (
      <Spin tip="Loading...">
        <TaskListForm onFinish={onFinish} />
      </Spin>
    );
  }

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      name="new-task-list"
      initialValues={{
        taskListName: taskList && isEdit ? taskList.name : undefined,
        taskListType: TaskListType.DAILY,
      }}
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
      <Form.Item wrapperCol={{ span: 18, sm: { offset: 6 }, xs: { offset: 0 } }}>
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
