import {TaskList, taskListConverter} from "../../types/TaskLists";
import {ReduxState} from "../index";
import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {apiSlice} from "../api";


export const apiTaskList = apiSlice.enhanceEndpoints({ addTagTypes: ['TaskList'] }).injectEndpoints({
    endpoints: builder => ({

        getTaskLists: builder.query<TaskList[], void>({
            queryFn: async ( arg, api ) => {
                console.log("======== API ============ inside getTaskLists ====================");
                const {
                    userReducer: user,
                } = api.getState() as ReduxState;

                try {
                    const userId = user.user?.id
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


        createTaskList: builder.mutation<TaskList, TaskList>({
            queryFn: async ( newTaskList, api ) => {
                console.log("======== API ============ inside createTaskList ====================");
                const {
                    userReducer: user,
                } = api.getState() as ReduxState;

                try {
                    const userId = user.user?.id
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
                const {
                    userReducer: user,
                } = api.getState() as ReduxState;

                try {
                    const userId = user.user?.id
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
                const {
                    userReducer: user,
                } = api.getState() as ReduxState;

                try {
                    const userId = user.user?.id
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
    useCreateTaskListMutation,
    useUpdateTaskListMutation,
    useDeleteTaskListMutation,
} = apiTaskList;
