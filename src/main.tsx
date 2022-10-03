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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
