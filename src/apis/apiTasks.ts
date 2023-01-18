import { ReduxState } from '../store';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { apiSlice, providesList } from './api';
import {
  Task,
  TaskCompleted,
  taskCompletedConverter,
  taskConverter,
  UsedModifiers,
} from '../types/Tasks';
import { TodayEditModeFormFields } from '../screens/Today/TaskGroup/TodayEditMode';
import { CompletedDay, completedDayConverter } from '../helpers/types/CompletedDay';

// import DocumentReference = firebase.firestore.DocumentReference;

interface CreateTaskPayload {
  newTask: Omit<Task, 'id'>;
  taskId: string;
}

interface RearrangeTaskPayload {
  newNames: TodayEditModeFormFields;
}

interface CompleteTaskPayload {
  task: Task;
  points: number;
  value: number;
  date: string;
  usedModifiers?: UsedModifiers;
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

export const apiTask = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Task', 'CompletedDay'] })
  .injectEndpoints({
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

      getCompletedDay: builder.query<CompletedDay | false, { date: string }>({
        queryFn: async ({ date }, api) => {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';
          try {
            const completedDayRefPath = `/Users/${userId}/CompletedDays/${date}`;
            const completedDayRef = doc(db, completedDayRefPath).withConverter(
              completedDayConverter,
            );

            const completedDaySnap = await getDoc(completedDayRef);
            if (completedDaySnap.exists()) {
              console.log('== completedDaySnap exists!!!');
              return { data: completedDaySnap.data() };
            }
            return { data: false };
          } catch (e) {
            return { error: e };
          }
        },
        providesTags: (result, error, arg) => [{ type: 'CompletedDay', id: arg.date }],
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

      completeTask: builder.mutation<TaskCompleted, CompleteTaskPayload>({
        queryFn: async ({ task, date, points, value, usedModifiers }, api) => {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';
          console.log('=========== INSIDE completeTask ===========');

          const patch = {
            points,
            value,
            usedModifiers: usedModifiers ?? {
              percentage: null,
            },
          };
          console.log('== patch ', patch);

          const completedTask: TaskCompleted = {
            ...task,
            ...patch,
            date,
          };
          console.log('== completedTask ', completedTask);

          const completedTaskRefPath = `/Users/${userId}/CompletedTasks/${date}-${task.id}`;
          const completedDayRefPath = `/Users/${userId}/CompletedDays/${date}`;

          try {
            const batch = writeBatch(db);
            console.log('== batch ', batch);
            console.log('== refIds ', completedTaskRefPath, completedDayRefPath);

            const completedDayRef = doc(db, completedDayRefPath).withConverter(
              completedDayConverter,
            );

            let completedDay: CompletedDay = {
              date,
              taskLists: {
                [task.taskListId]: 0,
              },
              taskGroups: {
                [task.taskGroupId]: 0,
              },
              tasks: {
                [task.id]: patch,
              },
            };

            const completedDaySnap = await getDoc(completedDayRef);
            if (completedDaySnap.exists()) {
              console.log('== completedDaySnap exists!!!');
              completedDay = completedDaySnap.data();
            }
            console.log('== completedDay ', completedDay);

            const taskCompletedRef = doc(db, completedTaskRefPath).withConverter(
              taskCompletedConverter,
            );

            const taskCompletedSnap = await getDoc(taskCompletedRef);
            let pointDifference;
            if (taskCompletedSnap.exists()) {
              console.log('== taskCompletedSnap exists!!! - will update');
              const taskCompletedOld = taskCompletedSnap.data();
              batch.update(taskCompletedRef, patch);
              pointDifference = patch.points - taskCompletedOld.points;
            } else {
              console.log('== taskCompletedSnap doesnt exist - will set');
              batch.set(taskCompletedRef, completedTask);
              pointDifference = patch.points;
            }
            console.log('== pointDifference', pointDifference);

            if (pointDifference !== 0) {
              completedDay.taskLists[task.taskListId] =
                (completedDay.taskLists[task.taskListId] ?? 0) + pointDifference;
              completedDay.taskGroups[task.taskGroupId] =
                (completedDay.taskGroups[task.taskGroupId] ?? 0) + pointDifference;
            }
            completedDay.tasks = {
              ...completedDay.tasks,
              [task.id]: patch,
            };
            console.log('== NEW completedDay ', completedDay);

            batch.set(completedDayRef, completedDay);

            await batch.commit();
            return { data: completedTask };
          } catch (e) {
            console.error(e);
            return { error: e };
          }
        },
        invalidatesTags: (result, error, arg) => [{ type: 'CompletedDay', id: arg.date }],
      }),
    }),
  });

export const {
  useGetTasksByTaskListQuery,
  useGetCompletedDayQuery,
  useCreateTaskMutation,
  useRearrangeTasksMutation,
  useCompleteTaskMutation,
} = apiTask;
