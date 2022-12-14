import React, { useEffect } from 'react';
import TaskCreateForm from './TaskCreateForm';
import { Header1 } from '../../components/global/Headers';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { generateID } from '../../helpers/generateID';
import { useDispatch } from 'react-redux';
import { setNewTaskSharedProps, setSelectedTaskType } from './taskCreationSlice';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';

const TaskCreate: React.FC = () => {
  const { taskGroupId } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const dispatch = useDispatch();
  const user = useUser();
  const selectedTaskListId = useSelectedTaskListId();

  useEffect(() => {
    return () => {
      dispatch(setSelectedTaskType(undefined));
    };
  }, [dispatch]);

  useEffect(() => {
    if (user?.id && selectedTaskListId) {
      dispatch(
        setNewTaskSharedProps({
          id: `task-${generateID(10)}`,
          isActive: true,
          position: 0,
          taskGroupId: taskGroupId ?? 'undefined-task-group',
          taskListId: selectedTaskListId,
          userId: user.id,
        }),
      );
    }
  }, [taskGroupId, user?.id, selectedTaskListId, dispatch]);

  return (
    <>
      <Header1>Create new task</Header1>
      <TaskCreateForm />
    </>
  );
};

export default TaskCreate;
