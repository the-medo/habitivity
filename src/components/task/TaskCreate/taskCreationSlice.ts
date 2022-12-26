import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ExampleType} from "./TaskType/ExampleBox";

export interface TaskState {
  examples: ExampleType[];
}

const initialState: TaskState = {
  examples: [],
};

export const taskCreationSlice = createSlice({
  name: 'taskCreation',
  initialState,
  reducers: {
    setExamples: (state, action: PayloadAction<ExampleType[]>) => {
      state.examples = action.payload;
    },
  },
});

export const { setExamples } = taskCreationSlice.actions;

export const taskCreationReducer = taskCreationSlice.reducer;
