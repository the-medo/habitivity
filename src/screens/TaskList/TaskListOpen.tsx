import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedTaskListId } from '../../store/taskSlice';
import { useGetTaskListsQuery } from '../../apis/apiTaskList';

const TaskListOpen: React.FC = () => {
  const { taskListId } = useParams();
  const dispatch = useDispatch();

  const { data: taskLists = [], isLoading } = useGetTaskListsQuery();

  useEffect(() => {
    if (taskListId && taskLists.length > 0 && !isLoading) {
      const exists = taskLists.find(tl => tl.id === taskListId);
      if (exists) {
        dispatch(setSelectedTaskListId(taskListId));
      }
    }
  }, [taskLists, taskListId, isLoading, dispatch]);

  return <Outlet />;
};

export default TaskListOpen;
