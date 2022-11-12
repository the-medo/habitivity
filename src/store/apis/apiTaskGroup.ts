import {ReduxState} from "../index";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {apiSlice} from "../api";
import {TaskGroup, taskGroupConverter} from "../../types/TaskGroup";


export const apiTaskList = apiSlice.enhanceEndpoints({ addTagTypes: ['TaskGroup'] }).injectEndpoints({
    endpoints: builder => ({

        getTaskGroups: builder.query<TaskGroup[], {taskListId: string}>({
            queryFn: async ( {taskListId}, api ) => {
                console.log("======== API ============ inside getTaskGroups ====================");
                const userId = (api.getState() as ReduxState).userReducer.user?.id ?? 'no-user-id';

                try {
                    let data: TaskGroup[] = [];
                    const taskGroupsRef = collection(db, '/Users/' + userId + '/TaskGroups').withConverter(taskGroupConverter);
                    await getDocs(taskGroupsRef).then((snapshot) => {
                        data = snapshot.docs.map(x => x.data());
                    });
                    return {data};
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'TaskGroup', id: `single-${id}` } as const)),
                        { type: 'TaskGroup', id: `LIST-${arg.taskListId}` },
                    ]
                    : [{ type: 'TaskGroup', id: `LIST-${arg.taskListId}` }],
        }),



    })
})


export const {
    useGetTaskGroupsQuery,
} = apiTaskList;
