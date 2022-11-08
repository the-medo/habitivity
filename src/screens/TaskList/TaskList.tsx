import React from "react";
import {Outlet} from "react-router-dom";

interface TaskListProps {

}

const TaskList: React.FC<TaskListProps> = () => {

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default TaskList;