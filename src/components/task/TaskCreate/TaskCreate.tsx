import React, {Fragment} from "react";
import {useParams} from "react-router-dom";
import TaskCreateForm from "./TaskCreateForm";
import {Header1} from "../../global/Headers";

interface TaskCreateProps {

}

const TaskCreate: React.FC<TaskCreateProps> = () => {
    const {taskGroupId} = useParams();

    return (
        <Fragment>
            <Header1>Create new task</Header1>
            <TaskCreateForm />
        </Fragment>
    );
}

export default TaskCreate;