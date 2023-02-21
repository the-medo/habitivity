import firebase from 'firebase/compat';
import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  tags: string[];
}

// noinspection JSUnusedGlobalSymbols
export const journalEntryConverter = {
  toFirestore(journalEntry: JournalEntry): firebase.firestore.DocumentData {
    return journalEntry;
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): JournalEntry {
    const data = snapshot.data(options);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return data as unknown as JournalEntry;
  },
};
