import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from './localStore';

export interface TaskState {
  selectedTaskListId?: string;
}

const initialState: TaskState = {
  selectedTaskListId: getItem(LSKey.SELECTED_TASK_LIST_ID),
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setSelectedTaskListId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedTaskListId = action.payload;
      setItem(LSKey.SELECTED_TASK_LIST_ID, action.payload);
    },
  },
});

export const { setSelectedTaskListId } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;
