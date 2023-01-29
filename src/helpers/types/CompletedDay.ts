import { UsedModifiers } from '../../types/Tasks';
import firebase from 'firebase/compat';
import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export interface CompletedDayTask {
  value: number;
  points: number;
  usedModifiers: UsedModifiers;
}

export interface CompletedDay {
  date: string;
  taskLists: Record<string, number | undefined>;
  taskGroups: Record<string, number | undefined>;
  tasks: Record<string, CompletedDayTask | undefined>;
}

export type CompletedDays = Record<string, CompletedDay | false | undefined>;

// noinspection JSUnusedGlobalSymbols
export const completedDayConverter = {
  toFirestore(task: CompletedDay): firebase.firestore.DocumentData {
    return task;
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): CompletedDay {
    const data = snapshot.data(options);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return data as CompletedDay;
  },
};
