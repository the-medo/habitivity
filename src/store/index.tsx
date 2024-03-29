import React, { ReactNode } from 'react';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { userReducer } from './userSlice';
import { menuReducer } from './menuSlice';
import { apiSlice } from '../apis/api';
import { taskCreationReducer } from '../screens/NewTask/taskCreationSlice';
import { notificationReducer } from './notificationSlice';
import { dayReducer } from '../screens/Day/daySlice';
import { appReducer } from './appSlice';
import { routerReducer, routerSlice } from '../routes/routerSlice';
import { dashboardReducer, dashboardSlice } from '../screens/Dashboard/dashboardSlice';
import { screenReducer, screenSlice } from '../screens/screenSlice';
import { journalReducer, journalSlice } from '../screens/Journal/journalSlice';

export const store = configureStore({
  reducer: {
    appReducer,
    userReducer,
    menuReducer,
    notificationReducer,
    taskCreationReducer,
    dayReducer,
    [screenSlice.name]: screenReducer,
    [dashboardSlice.name]: dashboardReducer,
    [routerSlice.name]: routerReducer,
    [journalSlice.name]: journalReducer,
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
