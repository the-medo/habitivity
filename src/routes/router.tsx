/* eslint-disable react-perf/jsx-no-jsx-as-prop */

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PageLayout from './PageLayout';
import ErrorPage from '../ErrorPage';
import Calendar from '../screens/Calendar/Calendar';
import Settings from '../screens/Settings/Settings';
import Today from '../screens/Today/Today';
import TaskListCreate from '../screens/TaskList/TaskListCreate';
import TaskListEdit from '../screens/TaskList/TaskListEdit';
import Dashboard from '../screens/Dashboard/Dashboard';
import TodayDefault from '../screens/Today/TodayDefault';
import TaskCreate from '../screens/NewTask/TaskCreate';
import TaskListDefault from '../screens/TaskList/TaskListDefault';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />} errorElement={<ErrorPage />}>
      <Route path="create" element={<TaskListCreate />} />
      <Route path="settings" element={<Settings />} />
      <Route path=":taskListId" element={<TaskListDefault />}>
        <Route path="edit" element={<TaskListEdit />} />
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="today" element={<Today />}>
          <Route index element={<TodayDefault />} />
        </Route>
        <Route path="new-task">
          <Route index element={<TaskCreate />} />
          <Route path=":taskGroupId" element={<TaskCreate />} />
        </Route>
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Route>,
  ),
);
