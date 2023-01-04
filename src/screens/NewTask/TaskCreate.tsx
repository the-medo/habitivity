import React, { useEffect } from 'react';
import TaskCreateForm from './TaskCreateForm';
import { Header1 } from '../../components/global/Headers';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';
import { generateID } from '../../helpers/generateID';
import { useDispatch } from 'react-redux';
import { setNewTaskSharedProps, setSelectedTaskType } from './taskCreationSlice';

const TaskCreate: React.FC = () => {
  const { taskGroupId } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const dispatch = useDispatch();
  const user = useUser();
  const selectedTaskList = useSelectedTaskList();

  useEffect(() => {
    return () => {
      dispatch(setSelectedTaskType(undefined));
    };
  }, [dispatch]);

  useEffect(() => {
    if (user?.id && selectedTaskList?.id) {
      dispatch(
        setNewTaskSharedProps({
          id: `task-${generateID(10)}`,
          isActive: true,
          position: 0,
          taskGroupId: taskGroupId ?? 'undefined-task-group',
          taskListId: selectedTaskList.id,
          userId: user.id,
        }),
      );
    }
  }, [taskGroupId, user?.id, selectedTaskList?.id, dispatch]);

  return (
    <>
      <Header1>Create new task</Header1>
      <TaskCreateForm />
    </>
  );
};

export default TaskCreate;
