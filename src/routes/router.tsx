/* eslint-disable react-perf/jsx-no-jsx-as-prop */

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PageLayout from './PageLayout';
import ErrorPage from '../ErrorPage';
import Calendar from '../screens/Calendar/Calendar';
import Settings from '../screens/Settings/Settings';
import Day from '../screens/Day/Day';
import TaskListCreate from '../screens/TaskList/TaskListCreate';
import TaskListEdit from '../screens/TaskList/TaskListEdit';
import Dashboard from '../screens/Dashboard/Dashboard';
import DayDefault from '../screens/Day/DayDefault';
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
        <Route path="day" element={<Day />}>
          <Route index element={<DayDefault />} />
        </Route>
        <Route path="new-task/:taskGroupId?" element={<TaskCreate />}></Route>
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Route>,
  ),
);
