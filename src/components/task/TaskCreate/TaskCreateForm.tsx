import React from "react";
import TaskTypeSelector from "./TaskTypeSelector";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../store";
import {taskTypesWithDescription} from "./taskTypesWithDescription";
import TaskTypeItem from "./TaskType/TaskTypeItem";
import {TaskType} from "../../../types/Tasks";
import TaskCreate_Duration from "./TaskType/TaskCreate_Duration";
import ExampleBox from "./TaskType/ExampleBox";
import TaskCreate_Checkbox from "./TaskType/TaskCreate_Checkbox";
import TaskCreate_Time from "./TaskType/TaskCreate_Time";
import TaskCreate_Units from "./TaskType/TaskCreate_Units";
import TaskCreate_UnitCheckpoints from "./TaskType/TaskCreate_UnitCheckpoints";
import TaskCreate_Options from "./TaskType/TaskCreate_Options";

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
            {selectedTaskType === TaskType.TIME && <TaskCreate_Time />}
            {selectedTaskType === TaskType.UNITS && <TaskCreate_Units />}
            {selectedTaskType === TaskType.UNIT_CHECKPOINTS && <TaskCreate_UnitCheckpoints />}
            {selectedTaskType === TaskType.OPTIONS && <TaskCreate_Options />}
            <ExampleBox examples={examples} />
        </TaskCreateFormWrapper>
    );
}

export default TaskCreateForm;