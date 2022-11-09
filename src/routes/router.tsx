import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import PageLayout from "./PageLayout";
import ErrorPage from "../ErrorPage";
import Home from "./Home";
import PageOneOne from "./PageOneOne";
import Calendar from "./Calendar";
import Settings from "./Settings";
import Today from "./Today";
import TaskList from "../screens/TaskList/TaskList";
import TaskListCreate from "../screens/TaskList/TaskListCreate/TaskListCreate";
import TaskListOpen from "../screens/TaskList/TaskListOpen/TaskListOpen";
import TaskListDetail from "../screens/TaskList/TaskListDetail/TaskListDetail";
import TaskListEdit from "../screens/TaskList/TaskListEdit/TaskListEdit";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<PageLayout />}
            errorElement={<ErrorPage />}
        >
            <Route index element={<Home />} />
            <Route path="task-list" element={<TaskList />}>
                <Route index element={<TaskListDetail />} />
                <Route path=":taskListId" element={<TaskListOpen />}>
                    <Route index element={<TaskListDetail />} />
                </Route>
                <Route path="create" element={<TaskListCreate />} />
                <Route path="edit" element={<TaskListEdit />} />
            </Route>
            <Route path="home" element={<Home />} >
                <Route path=":subpage" element={<PageOneOne />} >
                    <Route path=":subSub" />
                </Route>
            </Route>
            <Route path="today" element={<Today />} >
            </Route>
            <Route path="calendar" element={<Calendar />} >
                <Route path=":subpage" element={<PageOneOne />} >
                    <Route path=":subSub" />
                </Route>
            </Route>
            <Route path="settings" element={<Settings />} >
                <Route path=":subpage" element={<PageOneOne />} >
                    <Route path=":subSub" />
                </Route>
            </Route>
        </Route>
    )
);