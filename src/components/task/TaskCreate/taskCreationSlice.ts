import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deduplicateExamples, ExampleType } from './TaskType/ExampleBox';
import { TaskShared, TaskType } from '../../../types/Tasks';

export interface TaskState {
  examples: ExampleType[];
  newTaskSharedProps?: TaskShared;
  selectedTaskType?: TaskType;
}

const initialState: TaskState = {
  examples: [],
  newTaskSharedProps: undefined,
  selectedTaskType: undefined,
};

export const taskCreationSlice = createSlice({
  name: 'taskCreation',
  initialState,
  reducers: {
    setExamples: (state, action: PayloadAction<ExampleType[]>) => {
      state.examples = deduplicateExamples(action.payload);
    },
    setNewTaskSharedProps: (state, action: PayloadAction<TaskShared | undefined>) => {
      state.newTaskSharedProps = action.payload;
    },
    updateNewTaskSharedProps: (state, action: PayloadAction<Partial<TaskShared> | undefined>) => {
      if (state.newTaskSharedProps && action.payload) {
        state.newTaskSharedProps = {
          ...state.newTaskSharedProps,
          ...action.payload,
        };
      }
    },
    setSelectedTaskType: (state, action: PayloadAction<TaskType | undefined>) => {
      console.log('Setting to... ', action.payload);
      state.selectedTaskType = action.payload;
    },
  },
});

export const { setExamples, setNewTaskSharedProps, updateNewTaskSharedProps, setSelectedTaskType } =
  taskCreationSlice.actions;

export const taskCreationReducer = taskCreationSlice.reducer;
