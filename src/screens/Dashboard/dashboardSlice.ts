import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LSKey, setItem } from '../../store/localStore';

export enum DashboardSubpage {
  OVERVIEW = 'overview',
  MONTH = 'month',
  TARGETS = 'targets',
}

export interface DashboardState {
  subpage?: DashboardSubpage;
}

const initialState: DashboardState = {
  subpage: undefined,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSubpage: (state, action: PayloadAction<DashboardSubpage>) => {
      setItem(LSKey.DASHBOARD_SUBPAGE, action.payload);
      state.subpage = action.payload;
    },
  },
});

export const { setSubpage } = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
