import firebase from "firebase/compat";
import {QueryDocumentSnapshot, SnapshotOptions} from "firebase/firestore";

export type TaskGroup = {
    id: string,
    name: string,
    taskListId: string,
}

export const taskGroupConverter = {
    toFirestore(taskGroup: TaskGroup): firebase.firestore.DocumentData {
        return taskGroup;
    },

    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): TaskGroup {
        const data = snapshot.data(options)!;
        return data as TaskGroup;
    }
};
