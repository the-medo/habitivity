import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deduplicateExamples, ExampleType } from './TaskType/ExampleBox';
import { TaskShared } from '../../../types/Tasks';

export interface TaskState {
  examples: ExampleType[];
  newTaskSharedProps?: TaskShared;
}

const initialState: TaskState = {
  examples: [],
  newTaskSharedProps: undefined,
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
  },
});

export const { setExamples, setNewTaskSharedProps, updateNewTaskSharedProps } =
  taskCreationSlice.actions;

export const taskCreationReducer = taskCreationSlice.reducer;
