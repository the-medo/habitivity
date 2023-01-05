import { Task } from '../types/Tasks';
import { useGetTasksByTaskListQuery } from '../apis/apiTasks';
import { useMemo } from 'react';
import { useSelectedTaskListId } from './useSelectedTaskListId';

export interface TasksByGroup {
  taskGroupId: string;
  tasks: Task[];
  isLoading: boolean;
}

export function useTasksByGroup(taskGroupId: string): TasksByGroup {
  const selectedTaskListId = useSelectedTaskListId();
  const { data: tasks = [], isLoading } = useGetTasksByTaskListQuery(selectedTaskListId);
  const filteredTasks = useMemo(
    () => tasks.filter(t => t.taskGroupId === taskGroupId),
    [tasks, taskGroupId],
  );

  return useMemo(
    () => ({
      taskGroupId,
      tasks: filteredTasks,
      isLoading,
    }),
    [filteredTasks, isLoading, taskGroupId],
  );
}
