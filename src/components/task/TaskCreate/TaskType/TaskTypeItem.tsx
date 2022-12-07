import React, {useCallback} from "react";
import Svg from "../../../../assets/svg/Svg";
import {COLORS} from "../../../../styles/CustomStyles";
import styled, {css} from "styled-components";
import {TaskType} from "../../../../types/Tasks";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../../../store";
import {setSelectedTaskType} from "../../../../store/taskSlice";
import {Button} from "antd";
import {icons, IconType} from "../../../icons/icons";

export interface TaskTypeForTTSelector {
    id: TaskType;
    svg: React.FC;
    title: string;
    description: string;
    examples: string[];
}

interface TaskTypeItemProps {
    taskType: TaskTypeForTTSelector;
}

interface TaskTypeItemWrapperProps {
    $isCurrentSelected: boolean;
}

const TaskTypeItemWrapper = styled.div<TaskTypeItemWrapperProps>`
  display: flex;
  //flex-grow: 1;
  flex-direction: column;

  flex-basis: 20%;
  min-width: 10rem;

  border-radius: 1rem;

  padding: 1rem;
  gap: .5rem;
  align-items: center;
  transition: .3s all;

  &:hover {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }

  ${({$isCurrentSelected}) => $isCurrentSelected && css` background-color: ${COLORS.PRIMARY_LIGHT}; `}

`

const TaskTypeItemTitle = styled.h3`margin-top: 1rem;`;
const TaskTypeItemDescription = styled.p``

const TaskTypeItemExamples = styled.div`
  font-size: 80%;
  font-style: italic;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-end;
`

const TaskTypeItem: React.FC<TaskTypeItemProps> = ({taskType}) => {

    const dispatch = useDispatch();
    const { selectedTaskType } = useSelector((state: ReduxState) => state.taskReducer);

    const isCurrentSelected = selectedTaskType === taskType.id;

    const onTaskTypeClick = useCallback(() => {
        if (!isCurrentSelected) dispatch(setSelectedTaskType(taskType.id));
    }, [isCurrentSelected]);

    return (
        <TaskTypeItemWrapper $isCurrentSelected={isCurrentSelected} onClick={onTaskTypeClick}>
            <Svg
                svgImage={taskType.svg}
                height={'6rem'}
                $colorPrimary={COLORS.PRIMARY_DARK}
            />
            <TaskTypeItemTitle>{taskType.title}</TaskTypeItemTitle>
            <TaskTypeItemDescription>{taskType.description}</TaskTypeItemDescription>
            <TaskTypeItemExamples>
                Example:
                <ul>
                    {taskType.examples.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
            </TaskTypeItemExamples>
            {isCurrentSelected && <Button onClick={() => dispatch(setSelectedTaskType(undefined))} icon={icons[IconType.EditOutlined]}>Change type</Button>}
        </TaskTypeItemWrapper>
    );
}

export default TaskTypeItem;