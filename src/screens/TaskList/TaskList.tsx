import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {setMenuLeftItems} from "../../store/menuSlice";
import {useDispatch} from "react-redux";

interface TaskListProps {

}

const TaskList: React.FC<TaskListProps> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMenuLeftItems([]));
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default TaskList;