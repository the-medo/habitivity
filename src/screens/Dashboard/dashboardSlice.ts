import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from '../../store/localStore';
import { DateRange } from '../../helpers/types/DateRange';
import dayjs from 'dayjs';

export enum DashboardSubpage {
  OVERVIEW = 'overview',
  MONTH = 'month',
  TARGETS = 'targets',
}

export enum DashboardGroupsOrTasks {
  GROUPS = 'groups',
  TASKS = 'tasks',
}

export enum DashboardGraphView {
  STACKED = 'stacked',
  NOTSTACKED = 'not-stacked',
}

export interface DashboardState {
  subpage?: DashboardSubpage;
  segmentTaskGroup?: string;
  segmentGroupsOrTasks?: DashboardGroupsOrTasks;
  segmentGraphView?: DashboardGraphView;
  dateRange: DateRange;
}

const initialState: DashboardState = {
  subpage: undefined,
  segmentTaskGroup: 'all',
  segmentGroupsOrTasks: DashboardGroupsOrTasks.GROUPS,
  segmentGraphView: DashboardGraphView.STACKED,
  dateRange: getItem(LSKey.DASHBOARD_DATERANGE) ?? {
    startDate: dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
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
    setSegmentTaskGroup: (state, action: PayloadAction<string>) => {
      setItem(LSKey.DASHBOARD_SEGMENT_TASK_GROUP, action.payload);
      state.segmentTaskGroup = action.payload;
    },
    setSegmentGroupsOrTasks: (state, action: PayloadAction<DashboardGroupsOrTasks>) => {
      setItem(LSKey.DASHBOARD_SEGMENT_GROUPS_OR_TASKS, action.payload);
      state.segmentGroupsOrTasks = action.payload;
    },
    setSegmentGraphView: (state, action: PayloadAction<DashboardGraphView>) => {
      setItem(LSKey.DASHBOARD_SEGMENT_GRAPHS_STACKED, action.payload);
      state.segmentGraphView = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      setItem(LSKey.DASHBOARD_DATERANGE, action.payload);
      state.dateRange = action.payload;
    },
  },
});

export const {
  setSubpage,
  setSegmentTaskGroup,
  setSegmentGroupsOrTasks,
  setSegmentGraphView,
  setDateRange,
} = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
