import {User} from "../types/User";

export enum LSKey {
    user = '1',
    menuCollapsed = '2'
}

export interface LSValues {
    [LSKey.user]?: User,
    [LSKey.menuCollapsed]?: number,
}

function setItem<T extends LSKey>(key: T, value: LSValues[T]): void {
    if (key) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.removeItem(key);
    }
}

function getItem<T extends LSKey>(key: T): LSValues[T] | undefined {
    const savedItem = localStorage.getItem(key);
    if (savedItem !== null) {
        return JSON.parse(savedItem) as LSValues[T];
    }
    return undefined;
}

export const setUser = (user: User | undefined) => setItem(LSKey.user, user);
export const getUser = () => getItem(LSKey.user);