import { ReduxState } from '../store';
import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { apiSlice, providesList } from './api';
import { TaskGroup, taskGroupConverter } from '../types/TaskGroup';
import { PartialWithId } from '../types/PartialWithId';

export const apiTaskList = apiSlice.enhanceEndpoints({ addTagTypes: ['TaskGroup'] }).injectEndpoints({
  endpoints: builder => ({
    getTaskGroupsByTaskList: builder.query<TaskGroup[], string | undefined>({
      queryFn: async (taskListId, api) => {
        console.log('======== API ============ inside getTaskGroups ====================');
        if (!taskListId) {
          return { data: [] };
        }

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

        try {
          let data: TaskGroup[] = [];
          const taskGroupsRef = collection(db, '/Users/' + userId + '/TaskGroups').withConverter(
            taskGroupConverter,
          );
          const q = query(taskGroupsRef, where('taskListId', '==', taskListId)); //, orderBy("position")
          await getDocs(q).then(snapshot => {
            data = snapshot.docs.map(x => x.data()).sort((a, b) => a.position - b.position);
          });
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: (result, error, arg) => providesList(result, 'TaskGroup', arg),
    }),

    createTaskGroups: builder.mutation<
      { newTaskGroups: TaskGroup[]; taskListId: string },
      { newTaskGroups: TaskGroup[]; taskListId: string }
    >({
      queryFn: async ({ newTaskGroups, taskListId }, api) => {
        console.log('======== API ============ inside createTaskGroups ====================', {
          newTaskGroups,
          taskListId,
        });
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

        try {
          const batch = writeBatch(db);
          newTaskGroups.forEach(tg => {
            const taskGroupRef = doc(db, '/Users/' + userId + '/TaskGroups/' + tg.id).withConverter(
              taskGroupConverter,
            );
            batch.set(taskGroupRef, tg);
          });
          await batch.commit();
          return { data: { newTaskGroups, taskListId } };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: (result, error, arg) =>
        providesList(result?.newTaskGroups, 'TaskGroup', arg.taskListId),
    }),

    updateTaskGroups: builder.mutation<
      { arrayOfTaskGroups: PartialWithId<TaskGroup>[]; taskListId: string },
      PartialWithId<TaskGroup>[]
    >({
      queryFn: async (arrayOfTaskGroups, api) => {
        console.log('======== API ============ inside updateTaskGroups ====================');
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const state = api.getState() as ReduxState;
        const userId = state.userReducer.user?.id ?? 'no-user-id';
        const selectedTaskListId = state.taskReducer.selectedTaskListId ?? 'undefined';

        try {
          const batch = writeBatch(db);
          arrayOfTaskGroups.forEach(({ id, ...patch }) => {
            const taskGroupRef = doc(db, '/Users/' + userId + '/TaskGroups/' + id).withConverter(
              taskGroupConverter,
            );
            batch.update(taskGroupRef, patch);
          });

          await batch.commit();
          return {
            data: {
              arrayOfTaskGroups,
              taskListId: selectedTaskListId,
            },
          };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: result =>
        providesList(result?.arrayOfTaskGroups, 'TaskGroup', result?.taskListId),
    }),

    deleteTaskGroups: builder.mutation<{ taskListId: string; ids: string[] }, string[]>({
      queryFn: async (ids, api) => {
        console.log('======== API ============ inside deleteTaskGroup ====================');
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const state = api.getState() as ReduxState;
        const userId = state.userReducer.user?.id ?? 'no-user-id';
        const selectedTaskListId = state.taskReducer.selectedTaskListId ?? 'undefined';

        try {
          const batch = writeBatch(db);
          ids.forEach(id => {
            const taskGroupRef = doc(db, '/Users/' + userId + '/TaskGroups/' + id).withConverter(
              taskGroupConverter,
            );
            batch.delete(taskGroupRef);
          });
          await batch.commit();
          return { data: { taskListId: selectedTaskListId, ids } };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: result => [
        ...(result?.ids ?? []).map(id => ({ type: 'TaskGroup', id } as const)),
        { type: 'TaskGroup', id: `LIST${result?.taskListId ?? 'undefined'}` },
      ],
    }),
  }),
});

export const {
  useGetTaskGroupsByTaskListQuery,
  useCreateTaskGroupsMutation,
  useUpdateTaskGroupsMutation,
  useDeleteTaskGroupsMutation,
} = apiTaskList;
