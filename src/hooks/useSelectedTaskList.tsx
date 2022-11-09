import {ReduxState} from '../store';
import {useSelector} from "react-redux";
import {TaskList} from "../types/TaskLists";
import {selectTaskLists} from "../store/taskSlice";
import {useMemo} from "react";

export function useSelectedTaskList(): TaskList | undefined {
    const taskLists = useSelector((state: ReduxState) => selectTaskLists(state));
    const selectedTaskListId = useSelector((state: ReduxState) => state.taskReducer.selectedTaskListId);

    return useMemo(() =>
            taskLists.find(tl => tl.id === selectedTaskListId)
        , [taskLists, selectedTaskListId]);
}