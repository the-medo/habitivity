import { Task } from '../types/Tasks';
import { useGetTasksByTaskListQuery } from '../apis/apiTasks';
import { useMemo } from 'react';
import { useSelectedTaskListId } from './useSelectedTaskListId';

export interface TasksByGroup {
  taskGroupId: string;
  tasksAll: Task[];
  tasksActive: Task[];
  isLoading: boolean;
}

export function useTasksByGroup(taskGroupId: string): TasksByGroup {
  const selectedTaskListId = useSelectedTaskListId();
  const { data: tasks = [], isLoading } = useGetTasksByTaskListQuery(selectedTaskListId);

  return useMemo(
    () => ({
      taskGroupId,
      tasksAll: tasks.filter(t => t.taskGroupId === taskGroupId),
      tasksActive: tasks.filter(t => t.taskGroupId === taskGroupId && t.isActive),
      isLoading,
    }),
    [tasks, isLoading, taskGroupId],
  );
}
