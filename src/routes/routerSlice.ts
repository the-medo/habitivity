import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from '../store/localStore';

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
  selectedTaskListId?: string;
}

const initialState: RouterState = {
  openedPage: undefined,
  selectedTaskListId: getItem(LSKey.SELECTED_TASK_LIST_ID),
};

interface SetSelectedTaskListIdPayload {
  taskListId: string | undefined;
  redirect?: boolean;
}

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setOpenedPage: (state, action: PayloadAction<AvailablePages>) => {
      state.openedPage = action.payload;
    },
    setSelectedTaskListId: (state, action: PayloadAction<SetSelectedTaskListIdPayload>) => {
      if (state.selectedTaskListId !== action.payload.taskListId) {
        const redirect = action.payload.redirect ?? true;

        state.selectedTaskListId = action.payload.taskListId;
        setItem(LSKey.SELECTED_TASK_LIST_ID, action.payload.taskListId);

        if (redirect) {
          window.location.replace(
            `/${action.payload.taskListId ? action.payload.taskListId + '/today' : 'create'}`,
          );
        }
      }
    },
  },
});

export const { setOpenedPage, setSelectedTaskListId } = routerSlice.actions;

export const routerReducer = routerSlice.reducer;
