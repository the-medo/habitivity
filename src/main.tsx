import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {StoreProvider} from "./store";

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
