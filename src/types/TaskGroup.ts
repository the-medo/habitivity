import firebase from 'firebase/compat';
import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export interface TaskGroup {
  id: string;
  position: number;
  name: string;
  taskListId: string;
}

// noinspection JSUnusedGlobalSymbols
export const taskGroupConverter = {
  toFirestore(taskGroup: TaskGroup): firebase.firestore.DocumentData {
    return taskGroup;
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): TaskGroup {
    const data = snapshot.data(options);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return data as TaskGroup;
  },
};
