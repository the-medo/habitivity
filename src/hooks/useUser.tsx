import {ReduxState} from '../store';
import {useSelector} from "react-redux";
import {HabitivityUser} from "../types/HabitivityUser";

export function useUser(): HabitivityUser | undefined {
    return useSelector((state: ReduxState) => state.userReducer.user);
}