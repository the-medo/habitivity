import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AvailablePages {
  TODAY = 'today',
  DASHBOARD = 'dashboard',
  TASK_LIST = 'task-list',
  NEW_TASK = 'new-task',
  CALENDAR = 'calendar',
  SETTINGS = 'settings',
}

export interface RouterState {
  openedPage: AvailablePages | undefined;
}

const initialState: RouterState = {
  openedPage: undefined,
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setOpenedPage: (state, action: PayloadAction<AvailablePages>) => {
      state.openedPage = action.payload;
    },
  },
});

export const { setOpenedPage } = routerSlice.actions;

export const routerReducer = routerSlice.reducer;
