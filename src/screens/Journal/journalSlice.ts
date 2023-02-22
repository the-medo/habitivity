import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, LSKey, setItem } from '../../store/localStore';
import dayjs from 'dayjs';
import { dateBasicFormatFromDayjs } from '../../helpers/date/dateBasicFormatFromDate';

export interface JournalState {
  selectedDate: string;
}

const initialState: JournalState = {
  selectedDate:
    getItem(LSKey.SELECTED_DATE_SCREEN_JOURNAL)?.[dateBasicFormatFromDayjs(dayjs())] ??
    dateBasicFormatFromDayjs(dayjs()),
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
      setItem(LSKey.SELECTED_DATE_SCREEN_JOURNAL, {
        [dateBasicFormatFromDayjs(dayjs())]: action.payload,
      });
    },
  },
});

export const { setSelectedDate } = journalSlice.actions;

export const journalReducer = journalSlice.reducer;
