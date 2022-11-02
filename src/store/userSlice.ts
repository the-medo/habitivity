import {HabitivityUser} from "../types/HabitivityUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUser} from "./localStore";
import {User} from "firebase/auth";


export const firebaseUserToLocalUser = async (firebaseUser: User | null): Promise<HabitivityUser | undefined> => {
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
    user: HabitivityUser | undefined;
}

const initialState: UserState = {
    user: getUser(),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<HabitivityUser>) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = undefined;
        }
    }
});

export const { logIn, logOut } = userSlice.actions;

export const userReducer = userSlice.reducer;