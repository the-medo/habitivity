import firebase from "firebase/compat";
import {QueryDocumentSnapshot, SnapshotOptions} from "firebase/firestore";
import {Task} from "./Tasks";

export enum TaskListType {
    DAILY = 'daily'
}

export type TaskList = {
    id: string,
    name: string,
    type: TaskListType,
}

export const taskListConverter = {
    toFirestore(taskList: TaskList): firebase.firestore.DocumentData {
        return taskList;
    },

    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): TaskList {
        const data = snapshot.data(options)!;
        return data as TaskList;
    }
};
