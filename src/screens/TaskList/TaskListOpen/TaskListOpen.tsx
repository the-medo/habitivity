import React, {useEffect} from "react";
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../../store";
import {selectTaskLists, setSelectedTaskListId} from "../../../store/taskSlice";

interface TaskListOpenProps {

}

const TaskListOpen: React.FC<TaskListOpenProps> = () => {
    const {taskListId} = useParams();
    const dispatch = useDispatch();
    const taskLists = useSelector((state: ReduxState) => selectTaskLists(state));

    useEffect(() => {
        if (taskListId && taskLists.length > 0) {
            const exists = taskLists.find(tl => tl.id === taskListId);
            if (exists) {
                dispatch(setSelectedTaskListId(taskListId));
            }
        }
    }, [taskLists, taskListId]);

    return <Outlet />;
}

export default TaskListOpen;