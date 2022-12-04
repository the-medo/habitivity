import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TaskType} from "../types/Tasks";
import {getItem, LSKey, setItem} from "./localStore";

export interface TaskState {
    selectedTaskListId?: string;
    selectedTaskType?: TaskType;
}

const initialState: TaskState = {
    selectedTaskListId: getItem(LSKey.selectedTaskListId),
    selectedTaskType: undefined,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setSelectedTaskListId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedTaskListId = action.payload;
            setItem(LSKey.selectedTaskListId, action.payload);
        },
        setSelectedTaskType: (state, action: PayloadAction<TaskType | undefined>) => {
            console.log("Setting to... ", action.payload);
            state.selectedTaskType = action.payload;
        },
    }
});


export const {
    setSelectedTaskListId,
    setSelectedTaskType,
} = taskSlice.actions;

export const taskReducer = taskSlice.reducer;