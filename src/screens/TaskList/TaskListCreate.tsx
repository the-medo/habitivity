import React, { useCallback } from 'react';
import { Col } from 'antd';
import { useUser } from '../../hooks/useUser';
import { stringToPretty } from '../../helpers/stringToPretty';
import { generateID } from '../../helpers/generateID';
import { TaskList, TaskListType } from '../../types/TaskLists';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCreateTaskListMutation } from '../../apis/apiTaskList';
import TaskListForm from './TaskListForm';
import { Header2 } from '../../components/global/Headers';
import { setSelectedTaskListId } from '../../routes/routerSlice';

export interface FormTaskListCreate {
  taskListName: string;
  taskListType: TaskListType;
}

const TaskListCreate: React.FC = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createTaskList, { isLoading }] = useCreateTaskListMutation();

  const onFinish = useCallback(
    (values: FormTaskListCreate) => {
      if (user) {
        const newId = stringToPretty(values.taskListName) + '-' + generateID(4);

        const newTaskList: TaskList = {
          id: newId,
          userId: user.id,
          name: values.taskListName,
          type: values.taskListType,
        };

        createTaskList(newTaskList).then(() => {
          dispatch(setSelectedTaskListId({ taskListId: newId }));
        });
      }
    },
    [createTaskList, dispatch, navigate, user],
  );

  return (
    <>
      <Col offset={6}>
        <Header2>Create new task list</Header2>
      </Col>
      <TaskListForm isLoading={isLoading} onFinish={onFinish} />
    </>
  );
};

export default TaskListCreate;
