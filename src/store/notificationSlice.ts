import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArgsProps } from 'antd/es/notification/interface';

export interface Notification {
  message: ArgsProps['message'];
  description: ArgsProps['description'];
  placement: ArgsProps['placement'];
  type: ArgsProps['type'];
}

export interface NotificationState {
  notification?: Notification | undefined;
}

const initialState: NotificationState = {
  notification: undefined,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<Notification | undefined>) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
