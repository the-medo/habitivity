import React from "react";
import {useParams} from "react-router-dom";

interface TaskCreateProps {

}

const TaskCreate: React.FC<TaskCreateProps> = () => {
    const {taskGroupId} = useParams();


    return (
        <div>TaskCreate for {taskGroupId}</div>
    );
}

export default TaskCreate;