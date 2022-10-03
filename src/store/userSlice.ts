import {User} from "../types/User";
import firebase from "firebase/compat/app/";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUser} from "./localStore";

export const firebaseUserToLocalUser = async (firebaseUser: firebase.User | null): Promise<User | undefined> => {
    if (!firebaseUser) return undefined;

    const token = await firebaseUser.getIdToken();

    return {
        email: firebaseUser.email ?? 'Unknown email',
        id: firebaseUser.uid,
        name: firebaseUser.displayName ?? 'Unknown name',
        token,
    }
}

export interface UserState {
    user: User | undefined;
}

const initialState: UserState = {
    user: getUser(),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = undefined;
        }
    }
});

export const { signIn, signOut } = userSlice.actions;

export const userReducer = userSlice.reducer;