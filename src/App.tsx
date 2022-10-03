import React, {useEffect} from 'react';
import { RouterProvider} from "react-router-dom";
import {router} from "./routes/router";
import GlobalStyleAndTheme from "./styles/GlobalStyleAndTheme";
import firebase from "firebase/compat";
import {setUser} from "./store/localStore";
import {firebaseUserToLocalUser, signIn, signOut} from "./store/userSlice";
import {useDispatch} from "react-redux";
import {ReduxDispatch} from "./store";

function App() {
    const dispatch: ReduxDispatch = useDispatch();

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
            const appUser = await firebaseUserToLocalUser(user);
            setUser(appUser);
            dispatch(appUser ? signIn(appUser) : signOut() );
        });

        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <GlobalStyleAndTheme>
            <RouterProvider router={router} />
        </GlobalStyleAndTheme>
    )
}

export default App;