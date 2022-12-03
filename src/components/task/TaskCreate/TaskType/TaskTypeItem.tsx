import React, {useCallback} from "react";
import Svg from "../../../../assets/svg/Svg";
import {COLORS} from "../../../../styles/CustomStyles";
import styled, {css} from "styled-components";
import {TaskType} from "../../../../types/Tasks";

export interface TaskTypeForTTSelector {
    id: TaskType;
    svg: React.FC;
    title: string;
    description: string;
    examples: string[];
}

interface TaskTypeItemProps {
    taskType: TaskTypeForTTSelector;
    isSelected: boolean;
    setSelectedTaskType: React.Dispatch<React.SetStateAction<TaskTypeForTTSelector | undefined>>;
}

interface TaskTypeItemWrapperProps {
    $isSelected: boolean;
}

const TaskTypeItemWrapper = styled.div<TaskTypeItemWrapperProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  flex-basis: 50%;
  border-radius: 1rem;
  
  padding: 1rem;
  gap: .5rem;
  align-items: center;
  transition: .3s all;
  
  &:hover {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }
  
  ${ ({$isSelected}) => $isSelected && css` background-color: ${COLORS.PRIMARY_LIGHT}; ` }
  
`

const TaskTypeItemTitle = styled.h4``
const TaskTypeItemDescription = styled.p`
  font-size: 100%;
`
const TaskTypeItemExamples = styled.div`
  font-size: 80%;
  font-style: italic;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-end;
`

const TaskTypeItem: React.FC<TaskTypeItemProps> = ({taskType, isSelected, setSelectedTaskType}) => {

    return (
        <TaskTypeItemWrapper $isSelected={isSelected} onClick={() => setSelectedTaskType(taskType)}>
            <Svg
                svgImage={taskType.svg}
                height={'8rem'}
                colorPrimary={COLORS.PRIMARY_DARK}
            />
            <TaskTypeItemTitle>{taskType.title}</TaskTypeItemTitle>
            <TaskTypeItemDescription>{taskType.description}</TaskTypeItemDescription>
            <TaskTypeItemExamples>
                Example:
                <ul>
                    {taskType.examples.map(e => <li>{e}</li>)}
                </ul>
            </TaskTypeItemExamples>
        </TaskTypeItemWrapper>
    );
}

export default TaskTypeItem;