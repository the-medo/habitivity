import React, { useCallback, useEffect } from 'react';
import { Col } from 'antd';
import { useUser } from '../../hooks/useUser';
import { TaskList } from '../../types/TaskLists';
import { useNavigate } from 'react-router-dom';
import TaskListForm from './TaskListForm';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';
import { useDeleteTaskListMutation, useUpdateTaskListMutation } from '../../apis/apiTaskList';
import TaskGroupsForm from './TaskGroup/TaskGroupsForm';
import { Header2 } from '../../components/global/Headers';

export interface FormTaskListEdit {
  taskListName: string;
}

const TaskListEdit: React.FC = () => {
  const user = useUser();
  const navigate = useNavigate();

  const [updateTaskList, { isLoading: isUpdating }] = useUpdateTaskListMutation();
  const [deleteTaskList, { isLoading: isDeleting }] = useDeleteTaskListMutation();
  const taskList = useSelectedTaskList();

  useEffect(() => {
    console.log('TASK LIST CHANGED!!! ', taskList);
  }, [taskList]);

  const onFinish = useCallback(
    (values: FormTaskListEdit) => {
      if (user && taskList) {
        const updatedTaskList: Partial<TaskList> & Pick<TaskList, 'id'> = {
          id: taskList.id,
          name: values.taskListName,
        };

        void updateTaskList(updatedTaskList).then(() => {
          navigate(`/${taskList.id}`);
        });
      }
    },
    [navigate, taskList, updateTaskList, user],
  );

  const onDelete = useCallback(() => {
    if (user && taskList) {
      console.log('Gonna delete this task list... ', taskList);

      void deleteTaskList(taskList.id).then(() => {
        navigate(`/create`);
      });
    }
  }, [deleteTaskList, navigate, taskList, user]);

  return (
    <>
      <Col offset={6}>
        {' '}
        <Header2>Edit this task list</Header2>{' '}
      </Col>
      <TaskListForm
        onFinish={onFinish}
        onDelete={onDelete}
        isLoading={isUpdating || isDeleting}
        taskList={taskList}
        isEdit
      />
      <Col offset={6}>
        {' '}
        <Header2 $marginTop={5}>Edit groups</Header2>{' '}
      </Col>
      <TaskGroupsForm />
    </>
  );
};

export default TaskListEdit;
