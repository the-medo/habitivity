import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import PageLayout from "./PageLayout";
import ErrorPage from "../ErrorPage";
import Home from "./Home";
import PageOneOne from "./PageOneOne";
import Calendar from "./Calendar";
import Settings from "./Settings";
import Today from "./Today";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<PageLayout />}
            errorElement={<ErrorPage />}
        >
            <Route index element={<Home />} />
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