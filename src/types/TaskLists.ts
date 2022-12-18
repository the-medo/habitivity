import firebase from 'firebase/compat';
import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export enum TaskListType {
  DAILY = 'daily',
}

export interface TaskList {
  id: string;
  userId: string;
  name: string;
  type: TaskListType;
}

// noinspection JSUnusedGlobalSymbols
export const taskListConverter = {
  toFirestore(taskList: TaskList): firebase.firestore.DocumentData {
    return taskList;
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): TaskList {
    const data = snapshot.data(options);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return data as TaskList;
  },
};
