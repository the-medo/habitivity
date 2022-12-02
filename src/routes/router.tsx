import React, {Fragment} from "react";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import PageLayout from "./PageLayout";
import ErrorPage from "../ErrorPage";
import Calendar from "../screens/Calendar/Calendar";
import Settings from "../screens/Settings/Settings";
import Today from "../screens/Today/Today";
import TaskList from "../screens/TaskList/TaskList";
import TaskListCreate from "../screens/TaskList/TaskListCreate";
import TaskListOpen from "../screens/TaskList/TaskListOpen";
import TaskListDetail from "../screens/TaskList/TaskListDetail";
import TaskListEdit from "../screens/TaskList/TaskListEdit";
import Dashboard from "../screens/Dashboard/Dashboard";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<PageLayout />}
            errorElement={<ErrorPage />}
        >
            <Route index element={<Today />} />
            <Route path="task-list" element={<TaskList />}>
                <Route index element={<TaskListDetail />} />
                <Route path=":taskListId" element={<TaskListOpen />}>
                    <Route index element={<TaskListDetail />} />
                    <Route path="create" element={<TaskListCreate />} />
                    <Route path="edit" element={<TaskListEdit />} />
                </Route>
                <Route path="create" element={<TaskListCreate />} />
                <Route path="edit" element={<TaskListEdit />} />
            </Route>
            <Route path="dashboard" element={<Dashboard />} >
            </Route>
            <Route path="today" element={<Today />} >
                <Route path=":groupId" element={<Fragment />} >
                </Route>
            </Route>
            <Route path="calendar" element={<Calendar />} >
            </Route>
            <Route path="settings" element={<Settings />} >
            </Route>
        </Route>
    )
);