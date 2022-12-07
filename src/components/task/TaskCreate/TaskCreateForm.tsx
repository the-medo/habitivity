import React from "react";
import TaskTypeSelector from "./TaskType/TaskTypeSelector";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../store";
import {taskTypesWithDescription} from "./TaskType/taskTypesWithDescription";
import TaskTypeItem from "./TaskType/TaskTypeItem";
import {TaskType} from "../../../types/Tasks";
import TaskCreate_Duration from "./TaskType/TaskCreate_Duration";

interface TaskCreateFormProps {

}

const TaskCreateFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
`



const TaskCreateForm: React.FC<TaskCreateFormProps> = () => {
    const { selectedTaskType } = useSelector((state: ReduxState) => state.taskReducer);

    if (selectedTaskType === undefined) return <TaskTypeSelector />;

    return (
        <TaskCreateFormWrapper>
            <TaskTypeItem taskType={taskTypesWithDescription.find(tt => tt.id === selectedTaskType)!} />
            {selectedTaskType === TaskType.DURATION && <TaskCreate_Duration />}
        </TaskCreateFormWrapper>
    );
}

export default TaskCreateForm;