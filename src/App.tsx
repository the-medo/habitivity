import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./routes/Root";
import ErrorPage from "./ErrorPage";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/Contact";
import EditContact, { action as editAction} from "./routes/Edit";
import { action as destroyAction} from "./routes/Destroy";
import Index from "./routes/IndexRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root />}
            errorElement={<ErrorPage />}
            loader={rootLoader}
        >
            <Route
                action={rootAction}
                errorElement={<ErrorPage />}
            >
                <Route
                    index
                    element={<Index />}
                />
                <Route
                    path="contacts/:contactId"
                    element={<Contact />}
                    loader={contactLoader}
                    action={contactAction}
                >
                </Route>
                <Route
                    path="contacts/:contactId/edit"
                    element={<EditContact />}
                    loader={contactLoader}
                    action={editAction}
                >
                </Route>
                <Route
                    path="contacts/:contactId/destroy"
                    element={null}
                    action={destroyAction}
                    // errorElement={<div>Oops! There was an error.</div>}
                >
                </Route>
            </Route>
        </Route>
    )
)

function App() {

  return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
