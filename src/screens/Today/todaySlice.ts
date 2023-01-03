import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from '../../store/localStore';

export enum TodayDisplayMode {
  BOXES,
  ROWS,
}

export interface TodayState {
  isEditMode: boolean;
  displayMode: TodayDisplayMode;
}

const initialState: TodayState = {
  isEditMode: false,
  displayMode: getItem(LSKey.TODAY_DISPLAY_MODE) ?? TodayDisplayMode.BOXES,
};

export const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {
    toggleEditMode: state => {
      state.isEditMode = !state.isEditMode;
    },
    setDisplayMode: (state, action: PayloadAction<TodayDisplayMode>) => {
      setItem(LSKey.TODAY_DISPLAY_MODE, action.payload);
      state.displayMode = action.payload;
    },
  },
});

export const { toggleEditMode, setDisplayMode } = todaySlice.actions;

export const todayReducer = todaySlice.reducer;
