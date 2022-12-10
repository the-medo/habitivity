import React from "react";
import TaskTypeSelector from "./TaskType/TaskTypeSelector";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../store";
import {taskTypesWithDescription} from "./TaskType/taskTypesWithDescription";
import TaskTypeItem from "./TaskType/TaskTypeItem";
import {TaskType} from "../../../types/Tasks";
import TaskCreate_Duration from "./TaskType/TaskCreate_Duration";
import ExampleBox from "./TaskType/ExampleBox";
import TaskCreate_Checkbox from "./TaskType/TaskCreate_Checkbox";

interface TaskCreateFormProps {

}

const TaskCreateFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`



const TaskCreateForm: React.FC<TaskCreateFormProps> = () => {
    const { selectedTaskType } = useSelector((state: ReduxState) => state.taskReducer);
    const { examples } = useSelector((state: ReduxState) => state.taskCreationReducer);

    if (selectedTaskType === undefined) return <TaskTypeSelector />;

    return (
        <TaskCreateFormWrapper>
            <TaskTypeItem taskType={taskTypesWithDescription.find(tt => tt.id === selectedTaskType)!} />
            {selectedTaskType === TaskType.DURATION && <TaskCreate_Duration />}
            {selectedTaskType === TaskType.CHECKBOX && <TaskCreate_Checkbox />}
            <ExampleBox examples={examples} />
        </TaskCreateFormWrapper>
    );
}

export default TaskCreateForm;