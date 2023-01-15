import { ReduxState } from '../store';
import { collection, doc, getDocs, query, setDoc, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { apiSlice, providesList } from './api';
import { Task, taskConverter } from '../types/Tasks';
import { TodayEditModeFormFields } from '../screens/Today/TaskGroup/TodayEditMode';

interface CreateTaskPayload {
  newTask: Omit<Task, 'id'>;
  taskId: string;
}

interface RearrangeTaskPayload {
  newNames: TodayEditModeFormFields;
}

const getAllTasks = async (userId: string, taskListId: string) => {
  let data: Task[] = [];
  const tasksRef = collection(db, '/Users/' + userId + '/Tasks').withConverter(taskConverter);
  const q = query(tasksRef, where('taskListId', '==', taskListId)); //, orderBy("position")
  await getDocs(q).then(snapshot => {
    data = snapshot.docs.map(x => x.data());
  });

  return data;
};

export const apiTask = apiSlice.enhanceEndpoints({ addTagTypes: ['Task'] }).injectEndpoints({
  endpoints: builder => ({
    getTasksByTaskList: builder.query<Task[], string | undefined>({
      queryFn: async (taskListId, api) => {
        console.log('======== API ============ inside getTasks ====================');
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

        try {
          const data = (await getAllTasks(userId, taskListId ?? 'undefined')).sort(
            (a, b) => a.position - b.position,
          );
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: result => providesList(result, 'Task'),
    }),

    createTask: builder.mutation<Task, CreateTaskPayload>({
      queryFn: async ({ newTask, taskId }, api) => {
        console.log('======== API ============ inside createTask ====================');
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

        if (newTask.userId !== userId) {
          return { error: 'Error: User ID in task and store is different!' };
        }

        //get max position from all tasks in group
        const allTasks = await getAllTasks(userId, newTask.taskListId);

        newTask.position =
          allTasks.reduce((p, c) => {
            return c.taskGroupId === newTask.taskGroupId && p < c.position ? c.position : p;
          }, 0) + 1;

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const newTaskFull = Object.assign(newTask, {
          id: taskId,
        }) as Task;

        try {
          const taskRef = doc(db, '/Users/' + userId + '/Tasks/' + taskId).withConverter(
            taskConverter,
          );

          await setDoc(taskRef, newTaskFull);

          return {
            data: newTaskFull,
          };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    rearrangeTasks: builder.mutation<undefined, RearrangeTaskPayload>({
      queryFn: async ({ newNames }, api) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const taskListId = (api.getState() as ReduxState).taskReducer.selectedTaskListId;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const editItems = (api.getState() as ReduxState).todayReducer.editItems;

        try {
          if (userId && taskListId) {
            const allTasks = await getAllTasks(userId, taskListId);

            const batch = writeBatch(db);

            allTasks.forEach(task => {
              const groupId = Object.keys(editItems).find(
                g => editItems[g]?.find(t => t.taskId === task.id) !== undefined,
              );
              if (groupId) {
                const foundTaskEdited = editItems[groupId]?.find(t => t.taskId === task.id);
                if (foundTaskEdited) {
                  const taskRef = doc(db, `/Users/${userId}/Tasks/${task.id}`).withConverter(
                    taskConverter,
                  );
                  const needsToBeUpdated =
                    groupId !== task.taskGroupId ||
                    foundTaskEdited.position !== task.position ||
                    task.taskName !== newNames[task.id] ||
                    (foundTaskEdited.additionalAction === 'archive' && task.isActive) ||
                    (foundTaskEdited.additionalAction === false && !task.isActive);

                  if (foundTaskEdited.additionalAction === 'delete') {
                    batch.delete(taskRef);
                  } else if (needsToBeUpdated) {
                    const patch: Partial<Task> = {
                      isActive: foundTaskEdited.additionalAction === false,
                      taskName: newNames[task.id],
                      taskGroupId: groupId,
                      position: foundTaskEdited.position,
                    };

                    batch.update(taskRef, patch);
                  }
                }
              }
            });

            await batch.commit();
          }

          return { data: undefined };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const { useGetTasksByTaskListQuery, useCreateTaskMutation, useRearrangeTasksMutation } =
  apiTask;
