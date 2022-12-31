import { ReduxState } from '../store';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { apiSlice } from './api';
import { Task, taskConverter } from '../types/Tasks';

export const apiTask = apiSlice.enhanceEndpoints({ addTagTypes: ['Task'] }).injectEndpoints({
  endpoints: builder => ({
    getTasksByTaskList: builder.query<Task[], string | undefined>({
      queryFn: async (taskListId, api) => {
        console.log('======== API ============ inside getTasks ====================');
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

        try {
          let data: Task[] = [];
          const tasksRef = collection(db, '/Users/' + userId + '/Tasks').withConverter(
            taskConverter,
          );
          const q = query(tasksRef, where('taskListId', '==', taskListId)); //, orderBy("position")
          await getDocs(q).then(snapshot => {
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
              ...result.map(({ id }) => ({ type: 'Task', id } as const)),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    createTask: builder.mutation<Task, Task>({
      queryFn: async (newTask, api) => {
        console.log('======== API ============ inside createTask ====================');
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

        if (newTask.userId !== userId) {
          return { error: 'Error: User ID in task and store is different!' };
        }

        try {
          const taskRef = doc(db, '/Users/' + userId + '/Tasks/' + newTask.id).withConverter(
            taskConverter,
          );
          await setDoc(taskRef, newTask);
          return { data: newTask };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const { useGetTasksByTaskListQuery, useCreateTaskMutation } = apiTask;
