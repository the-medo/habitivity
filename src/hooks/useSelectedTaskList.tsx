import {ReduxState} from '../store';
import {useDispatch, useSelector} from "react-redux";
import {TaskList, TaskListType} from "../types/TaskLists";
import {setSelectedTaskListId} from "../store/taskSlice";
import {useEffect, useState} from "react";
import {useGetTaskListsQuery} from "../store/apis/apiTaskList";

export function useSelectedTaskList(): TaskList | undefined {
    const {
        data: taskLists = [],
        isLoading,
    } = useGetTaskListsQuery();

    const dispatch = useDispatch();
    const selectedTaskListId = useSelector((state: ReduxState) => state.taskReducer.selectedTaskListId);
    const [selectedTaskList, setSelectedTaskList] = useState<TaskList | undefined>(selectedTaskListId ? {
        id: selectedTaskListId,
        name: "Loading...",
        type: TaskListType.DAILY,
        userId: "temp-user-id",
    } : undefined);

    useEffect(() => {
        if (!isLoading && selectedTaskListId) {
            const foundTaskList = taskLists.find(tl => tl.id === selectedTaskListId);
            if (foundTaskList) {
                setSelectedTaskList(foundTaskList);
            } else {
                console.log("Selected task list id not found, setting default", taskLists[0]);
                if (taskLists.length > 0) {
                    dispatch(setSelectedTaskListId(taskLists[0].id));
                } else {
                    setSelectedTaskList(undefined);
                    dispatch(setSelectedTaskListId(undefined));
                }
            }
        }
    }, [taskLists, selectedTaskListId, isLoading])

    return selectedTaskList;
}