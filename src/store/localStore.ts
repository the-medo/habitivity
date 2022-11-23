import {HabitivityUser} from "../types/HabitivityUser";
import {RightDrawerStatus} from "../components/menu/DrawerRight/RightDrawer";

export enum LSKey {
    user = '1',
    menuCollapsed = '2',
    rightDrawerCollapsed = '3',
    selectedTaskListId = '4'
}

export interface LSValues {
    [LSKey.user]?: HabitivityUser,
    [LSKey.menuCollapsed]?: boolean,
    [LSKey.rightDrawerCollapsed]?: RightDrawerStatus,
    [LSKey.selectedTaskListId]?: string,
}

export function setItem<T extends LSKey>(key: T, value: LSValues[T]): void {
    if (key && value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.removeItem(key);
    }
}

export function getItem<T extends LSKey>(key: T): LSValues[T] | undefined {
    const savedItem = localStorage.getItem(key);
    if (savedItem && savedItem !== "undefined") {
        return JSON.parse(savedItem) as LSValues[T];
    }
    return undefined;
}

export const setUser = (user: HabitivityUser | undefined) => setItem(LSKey.user, user);
export const getUser = () => getItem(LSKey.user);