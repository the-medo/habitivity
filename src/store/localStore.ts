import {User} from "../types/User";
import {RightDrawerStatus} from "../components/menu/RightDrawer";

export enum LSKey {
    user = '1',
    menuCollapsed = '2',
    rightDrawerCollapsed = '3'
}

export interface LSValues {
    [LSKey.user]?: User,
    [LSKey.menuCollapsed]?: boolean,
    [LSKey.rightDrawerCollapsed]?: RightDrawerStatus,
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

export const setUser = (user: User | undefined) => setItem(LSKey.user, user);
export const getUser = () => getItem(LSKey.user);