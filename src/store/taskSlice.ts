import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../types/Tasks";
import {ReduxState} from "./index";
import {TaskList} from "../types/TaskLists";
import {TaskGroup} from "../types/TaskGroup";
import {getItem, LSKey, setItem} from "./localStore";

const tasksAdapter = createEntityAdapter<Task>({
    selectId: task => task.taskId,
});

const taskListsAdapter = createEntityAdapter<TaskList>({
    selectId: taskList => taskList.id,
});

const taskGroupsAdapter = createEntityAdapter<TaskGroup>({
    selectId: taskGroup => taskGroup.id,
});


export interface TaskState {
    tasks: ReturnType<typeof tasksAdapter.getInitialState>;
    taskGroups: ReturnType<typeof taskGroupsAdapter.getInitialState>;
    selectedTaskListId?: string;
}


const initialState: TaskState = {
    tasks: tasksAdapter.getInitialState(),
    taskGroups: taskGroupsAdapter.getInitialState(),
    selectedTaskListId: getItem(LSKey.selectedTaskListId),
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        // ========== TASKS ==========
        setTasks: (state, action: PayloadAction<Task[]>) => {

            tasksAdapter.setAll(state.tasks, action.payload);
        },
        addTask: (state, action: PayloadAction<Task>) => {
            tasksAdapter.addOne(state.tasks, action.payload);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            tasksAdapter.removeOne(state.tasks, action.payload);
        },

        // ========== TASK GROUPS ==========
        setTaskGroups: (state, action: PayloadAction<TaskGroup[]>) => {
            taskGroupsAdapter.setAll(state.taskGroups, action.payload);
        },
        addTaskGroup: (state, action: PayloadAction<TaskGroup>) => {
            taskGroupsAdapter.addOne(state.taskGroups, action.payload);
        },
        removeTaskGroup: (state, action: PayloadAction<string>) => {
            taskGroupsAdapter.removeOne(state.taskGroups, action.payload);
        },


        setSelectedTaskListId: (state, action: PayloadAction<string | undefined>) => {
            console.log("Selecting task list - " + action.payload);
            state.selectedTaskListId = action.payload;
            setItem(LSKey.selectedTaskListId, action.payload);
        },
    }
});


export const {
    setTasks, addTask, removeTask,
    setTaskGroups, addTaskGroup, removeTaskGroup,
    setSelectedTaskListId
} = taskSlice.actions;

export const taskReducer = taskSlice.reducer;

export const { selectById: selectTaskById, selectAll: selectTasks } =
    tasksAdapter.getSelectors<ReduxState>(state => state.taskReducer.tasks);
export const { selectById: selectTaskGroupById, selectAll: selectTaskGroups } =
    taskGroupsAdapter.getSelectors<ReduxState>(state => state.taskReducer.taskGroups);