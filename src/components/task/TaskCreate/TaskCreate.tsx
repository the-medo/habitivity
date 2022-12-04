import React, {Fragment} from "react";
import {useParams} from "react-router-dom";
import TaskCreateForm from "./TaskCreateForm";

interface TaskCreateProps {

}

const TaskCreate: React.FC<TaskCreateProps> = () => {
    const {taskGroupId} = useParams();

    return (
        <Fragment>
            <h1>Create new task</h1>
            <TaskCreateForm />
        </Fragment>
    );
}

export default TaskCreate;