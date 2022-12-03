import {ReduxState} from "../store";
import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../firebase";
import {apiSlice} from "./api";
import {Task, taskConverter} from "../types/Tasks";


export const apiTask = apiSlice.enhanceEndpoints({ addTagTypes: ['Task'] }).injectEndpoints({
    endpoints: builder => ({

        getTasksByTaskList: builder.query<Task[], string | undefined>({
            queryFn: async ( taskListId, api ) => {
                console.log("======== API ============ inside getTasks ====================");
                const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

                try {
                    let data: Task[] = [];
                    const tasksRef = collection(db, '/Users/' + userId + '/Tasks').withConverter(taskConverter);
                    const q = query(tasksRef, where("taskListId", "==", taskListId)); //, orderBy("position")
                    await getDocs(q).then((snapshot) => {
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
                        ...result.map(({ id }) => ({ type: 'Task', id } as const)),
                        { type: 'Task', id: 'LIST' },
                    ]
                    : [{ type: 'Task', id: 'LIST' }],
        }),

    })
})


export const {
    useGetTasksByTaskListQuery,
} = apiTask;
