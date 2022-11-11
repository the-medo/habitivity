import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {ReduxState} from "./index";
import {TaskList, taskListConverter} from "../types/TaskLists";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../firebase";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['TaskList'],
    endpoints: builder => ({


        getTaskLists: builder.query<TaskList[], void>({
            providesTags: ['TaskList'],
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
        }),

        createTaskList: builder.mutation<TaskList, TaskList>({
            invalidatesTags: ['TaskList'],
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
        })


    })
})

export const {
    useGetTaskListsQuery,
    useCreateTaskListMutation,
} = apiSlice;