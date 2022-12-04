import React, {Fragment} from "react";
import styled from "styled-components";
import {COLORS} from "../../../../styles/CustomStyles";
import TaskTypeItem from "./TaskTypeItem";
import {taskTypesWithDescription} from "./taskTypesWithDescription";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../../store";

interface TaskTypeSelectorProps {
}

interface TaskTypeWrapperProps {
    $isTaskTypeSelected: boolean;
}

export const TaskTypeWrapper = styled.div<TaskTypeWrapperProps>`
  border-radius: 1rem;
  padding: 1rem;

  //flex-wrap: wrap;

  flex-basis: ${ ({$isTaskTypeSelected}) => $isTaskTypeSelected ? '20%' : '100%'  } ;
  min-width: 250px;
  
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
    const { selectedTaskType } = useSelector((state: ReduxState) => state.taskReducer);

    return (
        <Fragment>
            <h2>Choose task type:</h2>
            <TaskTypeWrapper $isTaskTypeSelected={!!selectedTaskType}>
                <TaskTypeItemDivider />
                {
                    taskTypesWithDescription.map((tt, i) =>
                        <Fragment key={tt.id}>
                            <TaskTypeItem taskType={tt} />
                            <TaskTypeItemDivider />
                        </Fragment>
                    )
                }
            </TaskTypeWrapper>
        </Fragment>
    );
}

export default TaskTypeSelector;