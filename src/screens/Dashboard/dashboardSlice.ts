import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from '../../store/localStore';
import { DateRange } from '../../helpers/types/DateRange';
import dayjs from 'dayjs';

export enum DashboardSubpage {
  OVERVIEW = 'overview',
  MONTH = 'month',
  TARGETS = 'targets',
}

export interface DashboardState {
  subpage?: DashboardSubpage;
  dateRange: DateRange;
}

const initialState: DashboardState = {
  subpage: undefined,
  dateRange: getItem(LSKey.DASHBOARD_DATERANGE) ?? {
    startDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  },
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSubpage: (state, action: PayloadAction<DashboardSubpage>) => {
      setItem(LSKey.DASHBOARD_SUBPAGE, action.payload);
      state.subpage = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      setItem(LSKey.DASHBOARD_DATERANGE, action.payload);
      state.dateRange = action.payload;
    },
  },
});

export const { setSubpage, setDateRange } = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
