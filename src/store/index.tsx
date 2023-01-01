import React, { ReactNode } from 'react';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { userReducer } from './userSlice';
import { menuReducer } from './menuSlice';
import { taskReducer } from './taskSlice';
import { apiSlice } from '../apis/api';
import { taskCreationReducer } from '../components/task/TaskCreate/taskCreationSlice';
import { notificationReducer } from './notificationSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    menuReducer: menuReducer,
    taskReducer: taskReducer,
    notificationReducer: notificationReducer,
    taskCreationReducer: taskCreationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type StoreAction<R> = ThunkAction<Promise<R>, ReduxState, unknown, AnyAction>;

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
