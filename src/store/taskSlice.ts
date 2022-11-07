import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../types/Tasks";
import {ReduxState} from "./index";
import {TaskList} from "../types/TaskLists";
import {TaskGroup} from "../types/TaskGroup";

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
    taskLists: ReturnType<typeof taskListsAdapter.getInitialState>;
    taskGroups: ReturnType<typeof taskGroupsAdapter.getInitialState>;
    selectedTaskList?: TaskList;
}


const initialState: TaskState = {
    tasks: tasksAdapter.getInitialState(),
    taskLists: taskListsAdapter.getInitialState(),
    taskGroups: taskGroupsAdapter.getInitialState(),
    selectedTaskList: undefined,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            tasksAdapter.setAll(state.tasks, action.payload);
        },
        addTask: (state, action: PayloadAction<Task>) => {
            tasksAdapter.addOne(state.tasks, action.payload);
        },
        removeTask: (state, action: PayloadAction<number>) => {
            tasksAdapter.removeOne(state.tasks, action.payload);
        },
    }
});

export const { setTasks, addTask, removeTask } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;

export const { selectById: selectTaskById, selectAll: selectTasks } =
    tasksAdapter.getSelectors<ReduxState>(state => state.taskReducer.tasks);