import React from "react";
import {useParams} from "react-router-dom";
import TaskCreateForm from "./TaskCreateForm";

interface TaskCreateProps {

}

const TaskCreate: React.FC<TaskCreateProps> = () => {
    const {taskGroupId} = useParams();


    return (
        <TaskCreateForm />
    );
}

export default TaskCreate;