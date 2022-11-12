import {TaskList, taskListConverter} from "../../types/TaskLists";
import {ReduxState} from "../index";
import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {apiSlice} from "../api";


export const apiTaskList = apiSlice.enhanceEndpoints({ addTagTypes: ['TaskList'] }).injectEndpoints({
    endpoints: builder => ({

        getTaskLists: builder.query<TaskList[], void>({
            queryFn: async ( arg, api ) => {
                console.log("======== API ============ inside getTaskLists ====================");
                const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

                try {
                    let data: TaskList[] = [];
                    const taskListsRef = collection(db, '/Users/' + userId + '/TaskLists').withConverter(taskListConverter);
                    await getDocs(taskListsRef).then((snapshot) => {
                        data = snapshot.docs.map(x => x.data());
                    });
                    return {data};
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'TaskList', id } as const)),
                        { type: 'TaskList', id: 'LIST' },
                    ]
                    : [{ type: 'TaskList', id: 'LIST' }],
        }),

        getTaskListById: builder.query<TaskList, string>({
            queryFn: async ( taskListId, api ) => {
                console.log("======== API ============ inside getTaskListById ====================");
                const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

                try {
                    const taskListsRef = doc(db, '/Users/' + userId + '/TaskLists/' + taskListId).withConverter(taskListConverter);
                    const data = (await getDoc(taskListsRef)).data();
                    return {data};
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: (result, error, id) =>  [{ type: 'TaskList', id }],
        }),


        createTaskList: builder.mutation<TaskList, TaskList>({
            queryFn: async ( newTaskList, api ) => {
                console.log("======== API ============ inside createTaskList ====================");
                const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

                try {
                    const taskListRef = doc(db, '/Users/' + userId + '/TaskLists/' + newTaskList.id).withConverter(taskListConverter);
                    await setDoc(taskListRef, newTaskList);
                    return { data: newTaskList };
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: [{ type: 'TaskList', id: 'LIST' }],
        }),


        updateTaskList: builder.mutation<TaskList, Partial<TaskList> & Pick<TaskList, 'id'>>({
            queryFn: async ( {id, ...patch}, api ) => {
                console.log("======== API ============ inside updateTaskList ====================");
                const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

                try {
                    const taskListRef = doc(db, '/Users/' + userId + '/TaskLists/' + id).withConverter(taskListConverter);
                    await updateDoc(taskListRef, patch);
                    return { data: undefined };
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'TaskList', id }],
        }),


        deleteTaskList: builder.mutation<TaskList, string>({
            queryFn: async ( id, api ) => {
                console.log("======== API ============ inside deleteTaskList ====================");
                const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

                try {
                    const taskListRef = doc(db, '/Users/' + userId + '/TaskLists/' + id).withConverter(taskListConverter);
                    await deleteDoc(taskListRef);
                    return { data: undefined };
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'TaskList', id }],
        })


    })
})


export const {
    useGetTaskListsQuery,
    useGetTaskListByIdQuery,
    useCreateTaskListMutation,
    useUpdateTaskListMutation,
    useDeleteTaskListMutation,
} = apiTaskList;
