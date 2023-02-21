import { ReduxState } from '../store';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { apiSlice } from './api';
import { JournalEntry, journalEntryConverter } from '../types/JournalEntry';

export const apiJournalEntry = apiSlice
  .enhanceEndpoints({ addTagTypes: ['JournalEntry'] })
  .injectEndpoints({
    endpoints: builder => ({
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      getJournalEntries: builder.query<JournalEntry[], void>({
        //from rtk queries documentation, if we don't want any arguments, type should be void
        queryFn: async (_, api) => {
          console.log('======== API ============ inside getJournalEntries ====================');
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

          try {
            let data: JournalEntry[] = [];
            const journalEntriesRef = collection(
              db,
              '/Users/' + userId + '/JournalEntries',
            ).withConverter(journalEntryConverter);
            await getDocs(journalEntriesRef).then(snapshot => {
              data = snapshot.docs.map(x => x.data());
            });
            return { data };
          } catch (e) {
            return { error: e };
          }
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'JournalEntry', id } as const)),
                { type: 'JournalEntry', id: 'LIST' },
              ]
            : [{ type: 'JournalEntry', id: 'LIST' }],
      }),

      getJournalEntryById: builder.query<JournalEntry, string>({
        queryFn: async (journalEntryId, api) => {
          console.log('======== API ============ inside getJournalEntryById ====================');
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

          try {
            const journalEntryRef = doc(
              db,
              '/Users/' + userId + '/JournalEntries/' + journalEntryId,
            ).withConverter(journalEntryConverter);
            const data = (await getDoc(journalEntryRef)).data();
            return { data };
          } catch (e) {
            return { error: e };
          }
        },
        providesTags: (result, error, id) => [{ type: 'JournalEntry', id }],
      }),

      createJournalEntry: builder.mutation<JournalEntry, JournalEntry>({
        queryFn: async (newJournalEntry, api) => {
          console.log('======== API ============ inside createJournalEntry ====================');
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

          try {
            const journalEntryRef = doc(
              db,
              '/Users/' + userId + '/JournalEntries/' + newJournalEntry.id,
            ).withConverter(journalEntryConverter);
            await setDoc(journalEntryRef, newJournalEntry);
            return { data: newJournalEntry };
          } catch (e) {
            return { error: e };
          }
        },
        invalidatesTags: [{ type: 'JournalEntry', id: 'LIST' }],
      }),

      updateJournalEntry: builder.mutation<
        JournalEntry,
        Partial<JournalEntry> & Pick<JournalEntry, 'id'>
      >({
        queryFn: async ({ id, ...patch }, api) => {
          console.log('======== API ============ inside updateJournalEntry ====================');
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

          try {
            const journalEntryRef = doc(
              db,
              '/Users/' + userId + '/JournalEntries/' + id,
            ).withConverter(journalEntryConverter);
            await updateDoc(journalEntryRef, patch);
            return { data: undefined };
          } catch (e) {
            return { error: e };
          }
        },
        invalidatesTags: (result, error, { id }) => [{ type: 'JournalEntry', id }],
      }),

      deleteJournalEntry: builder.mutation<JournalEntry, string>({
        queryFn: async (id, api) => {
          console.log('======== API ============ inside deleteJournalEntry ====================');
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

          try {
            const journalEntryRef = doc(
              db,
              '/Users/' + userId + '/JournalEntries/' + id,
            ).withConverter(journalEntryConverter);
            await deleteDoc(journalEntryRef);
            return { data: undefined };
          } catch (e) {
            return { error: e };
          }
        },
        invalidatesTags: (result, error, id) => [{ type: 'JournalEntry', id }],
      }),
    }),
  });

export const {
  useGetJournalEntriesQuery,
  useGetJournalEntryByIdQuery,
  useCreateJournalEntryMutation,
  useUpdateJournalEntryMutation,
  useDeleteJournalEntryMutation,
} = apiJournalEntry;
