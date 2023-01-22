import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedTaskListId } from '../../routes/routerSlice';

const TaskListDefault: React.FC = () => {
  const dispatch = useDispatch();
  const { taskListId } = useParams();

  useEffect(() => {
    if (taskListId) {
      dispatch(setSelectedTaskListId({ taskListId: taskListId, redirect: false }));
    }
  }, [dispatch, taskListId]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TaskListDefault;
