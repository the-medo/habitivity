import {User} from "../types/User";


export const setUser = (user: User | undefined): void => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
}

export const getUser = (): User | undefined => {
    const savedUser = localStorage.getItem('user');
    console.log(savedUser);

    if (savedUser !== null) {
        console.log("USR", JSON.parse(savedUser) as User);
        return JSON.parse(savedUser) as User;
    }
    return undefined;
}