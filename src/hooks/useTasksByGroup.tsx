import {Task} from "../types/Tasks";
import {useSelectedTaskList} from "./useSelectedTaskList";
import {useGetTasksByTaskListQuery} from "../apis/apiTasks";
import {useMemo} from "react";

export interface TasksByGroup {
    taskGroupId: string;
    tasks: Task[],
    isLoading: boolean;
}

export function useTasksByGroup(taskGroupId: string): TasksByGroup {
    const selectedTaskListId = useSelectedTaskList()?.id ?? 'undefined';
    const {data: tasks = [], isLoading } = useGetTasksByTaskListQuery(selectedTaskListId);
    const filteredTasks = useMemo(() => tasks.filter(t => t.taskGroupId === taskGroupId), [tasks, taskGroupId])

    return {
        taskGroupId,
        tasks: filteredTasks,
        isLoading,
    };
}