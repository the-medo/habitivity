import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {StoreProvider} from "./store";
import firebase from "firebase/compat";
import {firebaseConfig} from "./firebaseConfig";
import {getFirestore} from "firebase/firestore";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

//TODO maybe change to <Menu.Item> to ItemType[] ?

const _warn = console.warn;
const warnsToSkip: string[] = [];
console.warn = (msg, ...args) => {
    const isWarningToSkip = warnsToSkip.some(es => `${msg}`.includes(es));
    if (!isWarningToSkip) _warn.apply(console, [msg, ...args]);
}

const _error = console.error;
const errorsToSkip: string[] = [
    'children',
];
console.error = (msg, ...args) => {
    const isErrorToSkip = errorsToSkip.some(es => `${msg}`.includes(es));
    if (!isErrorToSkip) _error.apply(console, [msg, ...args]);
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
