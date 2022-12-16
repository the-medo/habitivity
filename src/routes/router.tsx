/* eslint-disable react-perf/jsx-no-jsx-as-prop */

import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import PageLayout from './PageLayout';
import ErrorPage from '../ErrorPage';
import Calendar from '../screens/Calendar/Calendar';
import Settings from '../screens/Settings/Settings';
import Today from '../screens/Today/Today';
import TaskList from '../screens/TaskList/TaskList';
import TaskListCreate from '../screens/TaskList/TaskListCreate';
import TaskListOpen from '../screens/TaskList/TaskListOpen';
import TaskListDetail from '../screens/TaskList/TaskListDetail';
import TaskListEdit from '../screens/TaskList/TaskListEdit';
import Dashboard from '../screens/Dashboard/Dashboard';
import TodayDefault from '../screens/Today/TodayDefault';
import TaskCreate from '../components/task/TaskCreate/TaskCreate';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<PageLayout/>} errorElement={<ErrorPage/>}>
            <Route index element={<Today/>}/>
            <Route path="task-list" element={<TaskList/>}>
                <Route index element={<TaskListDetail/>}/>
                <Route path=":taskListId" element={<TaskListOpen/>}>
                    <Route index element={<TaskListDetail/>}/>
                    <Route path="create" element={<TaskListCreate/>}/>
                    <Route path="edit" element={<TaskListEdit/>}/>
                </Route>
                <Route path="create" element={<TaskListCreate/>}/>
                <Route path="edit" element={<TaskListEdit/>}/>
            </Route>
            <Route path="dashboard" element={<Dashboard/>}></Route>
            <Route path="today" element={<Today/>}>
                <Route index element={<TodayDefault/>}/>
                <Route path="new-task">
                    <Route index element={<TaskCreate/>}/>
                    <Route path=":taskGroupId" element={<TaskCreate/>}/>
                </Route>
            </Route>
            <Route path="calendar" element={<Calendar/>}/>
            <Route path="settings" element={<Settings/>}></Route>
        </Route>,
    ),
);
