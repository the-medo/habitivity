import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from '../store/localStore';
import { DateRange } from '../helpers/types/DateRange';
import dayjs from 'dayjs';
import { GroupsOrTasks } from '../types/GroupsOrTasks';
import { GraphView } from '../types/GraphView';
import { OverviewOrJournal } from './Dashboard/DashboardOverview/DashboardDayWrapper';

export interface ScreenState {
  segmentTaskGroup: string;
  segmentTask: string;
  segmentGroupsOrTasks: GroupsOrTasks;
  segmentGraphView?: GraphView;
  segmentOverviewOrJournal?: OverviewOrJournal;
  dateRange: DateRange;
  selectedDay: string;
  displayUnits: boolean;
}

const initialState: ScreenState = {
  segmentTaskGroup: getItem(LSKey.SCREEN_SEGMENT_TASK_GROUP) ?? 'all',
  segmentTask: getItem(LSKey.SCREEN_SEGMENT_TASK) ?? 'all',
  segmentGroupsOrTasks: getItem(LSKey.SCREEN_SEGMENT_GROUPS_OR_TASKS) ?? GroupsOrTasks.GROUPS,
  segmentGraphView: getItem(LSKey.SCREEN_SEGMENT_GRAPHS_VIEW) ?? GraphView.STACKED,
  segmentOverviewOrJournal:
    getItem(LSKey.SCREEN_SEGMENT_OVERVIEW_OR_JOURNAL) ?? OverviewOrJournal.OVERVIEW,
  dateRange: getItem(LSKey.SCREEN_DATERANGE) ?? {
    startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  },
  selectedDay: dayjs().format('YYYY-MM-DD'),
  displayUnits: false,
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setSegmentTaskGroup: (state, action: PayloadAction<string>) => {
      setItem(LSKey.SCREEN_SEGMENT_TASK_GROUP, action.payload);
      state.segmentTaskGroup = action.payload;

      // after setting task group, reset task to all
      setItem(LSKey.SCREEN_SEGMENT_TASK, 'all');
      state.segmentTask = 'all';
    },
    setSegmentTask: (state, action: PayloadAction<string>) => {
      setItem(LSKey.SCREEN_SEGMENT_TASK, action.payload);
      state.segmentTask = action.payload;
    },
    setSegmentGroupsOrTasks: (state, action: PayloadAction<GroupsOrTasks>) => {
      setItem(LSKey.SCREEN_SEGMENT_GROUPS_OR_TASKS, action.payload);
      state.segmentGroupsOrTasks = action.payload;
    },
    setSegmentGraphView: (state, action: PayloadAction<GraphView>) => {
      setItem(LSKey.SCREEN_SEGMENT_GRAPHS_VIEW, action.payload);
      state.segmentGraphView = action.payload;
    },
    setSegmentOverviewOrJournal: (state, action: PayloadAction<OverviewOrJournal>) => {
      setItem(LSKey.SCREEN_SEGMENT_OVERVIEW_OR_JOURNAL, action.payload);
      state.segmentOverviewOrJournal = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      setItem(LSKey.SCREEN_DATERANGE, action.payload);
      state.dateRange = action.payload;
    },
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    setDisplayUnits: (state, action: PayloadAction<boolean>) => {
      state.displayUnits = action.payload;
    },
  },
});

export const {
  setSegmentTaskGroup,
  setSegmentTask,
  setSegmentGroupsOrTasks,
  setSegmentGraphView,
  setSegmentOverviewOrJournal,
  setSelectedDay,
  setDateRange,
  setDisplayUnits,
} = screenSlice.actions;

export const screenReducer = screenSlice.reducer;
