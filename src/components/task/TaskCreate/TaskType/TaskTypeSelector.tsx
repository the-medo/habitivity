import React, {Fragment, useState} from "react";
import styled from "styled-components";
import {COLORS, STYLE} from "../../../../styles/CustomStyles";
import TaskTypeItem, {TaskTypeForTTSelector} from "./TaskTypeItem";
import {taskTypesWithDescription} from "./taskTypesWithDescription";

interface TaskTypeSelectorProps {
}

export const TaskTypeWrapper = styled.div`
  border-radius: 1rem;
  //box-shadow: ${STYLE.BASE_SHADOW};
  padding: 1rem;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  margin-bottom: 2rem;
`


export const TaskTypeItemDivider = styled.div`
  flex-grow: 0;
  align-self: stretch;
  content: " ";
  width: 1px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${COLORS.PRIMARY_LIGHT};
`


const TaskTypeSelector: React.FC<TaskTypeSelectorProps> = () => {

    const [selectedTaskType, setSelectedTaskType] = useState<TaskTypeForTTSelector>();

    return (
        <TaskTypeWrapper>
            {
                taskTypesWithDescription.map((tt, i) =>
                    <Fragment key={tt.id}>
                        <TaskTypeItem taskType={tt} isSelected={selectedTaskType?.id === tt.id} setSelectedTaskType={setSelectedTaskType} />
                        {i < taskTypesWithDescription.length - 1 && <TaskTypeItemDivider />}
                    </Fragment>
                )
            }
        </TaskTypeWrapper>
    );
}

export default TaskTypeSelector;