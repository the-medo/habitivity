import { ReduxState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { TaskList, TaskListType } from '../types/TaskLists';
import { useEffect, useState } from 'react';
import { useGetTaskListsQuery } from '../apis/apiTaskList';
import { setSelectedTaskListId } from '../routes/routerSlice';
import { useParams } from 'react-router-dom';

export function useSelectedTaskList(): TaskList | undefined {
  const { data: taskLists = [], isLoading } = useGetTaskListsQuery();
  const { taskListId: taskListIdInUrl } = useParams();

  const dispatch = useDispatch();
  const selectedTaskListId = useSelector((state: ReduxState) => state.router.selectedTaskListId);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskList | undefined>(
    selectedTaskListId
      ? {
          id: selectedTaskListId,
          name: 'Loading...',
          type: TaskListType.DAILY,
          userId: 'temp-user-id',
        }
      : undefined,
  );

  useEffect(() => {
    if (!isLoading && (taskListIdInUrl || selectedTaskListId)) {
      const foundTaskList = taskLists.find(tl => tl.id === (taskListIdInUrl ?? selectedTaskListId));
      if (foundTaskList) {
        setSelectedTaskList(foundTaskList);
      } else {
        console.log('Selected task list id not found, setting default', taskLists[0]);
        if (taskLists.length > 0) {
          dispatch(setSelectedTaskListId({ taskListId: taskLists[0].id }));
        } else {
          setSelectedTaskList(undefined);
          dispatch(setSelectedTaskListId({ taskListId: undefined }));
        }
      }
    }
  }, [taskListIdInUrl, taskLists, selectedTaskListId, isLoading, dispatch]);

  return selectedTaskList;
}
