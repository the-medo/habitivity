import React, { useCallback } from 'react';
import Svg from '../../../assets/svg/Svg';
import { COLORS } from '../../../styles/CustomStyles';
import styled, { css } from 'styled-components';
import { TaskType } from '../../../types/Tasks';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setSelectedTaskType } from '../taskCreationSlice';
import { Button } from 'antd';
import { icons, IconType } from '../../../components/icons/icons';

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

export const TaskTypeItemWrapper = styled.div<TaskTypeItemWrapperProps>`
  border-radius: 1rem;
  min-width: 10rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: 0.3s all;

  display: flex;
  flex: 1 1 250px;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  &:hover {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }

  ${({ $isCurrentSelected }) =>
    $isCurrentSelected &&
    css`
      background-color: ${COLORS.PRIMARY_LIGHT};
    `}
`;

const TaskTypeItemTitle = styled.h3`
  margin-top: 1rem;
`;
const TaskTypeItemDescription = styled.p``;

const TaskTypeItemExamples = styled.div`
  font-size: 80%;
  font-style: italic;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-end;
`;

const TaskTypeItem: React.FC<TaskTypeItemProps> = ({ taskType }) => {
  const dispatch = useDispatch();
  const { selectedTaskType } = useSelector((state: ReduxState) => state.taskCreationReducer);

  const isCurrentSelected = selectedTaskType === taskType.id;

  const onTaskTypeClick = useCallback(() => {
    if (!isCurrentSelected) dispatch(setSelectedTaskType(taskType.id));
  }, [dispatch, isCurrentSelected, taskType.id]);

  const setSelectedTaskTypeHandler = useCallback(
    () => dispatch(setSelectedTaskType(undefined)),
    [dispatch],
  );

  return (
    <TaskTypeItemWrapper $isCurrentSelected={isCurrentSelected} onClick={onTaskTypeClick}>
      <Svg svgImage={taskType.svg} height="6rem" $colorPrimary={COLORS.PRIMARY_DARK} />
      <TaskTypeItemTitle>{taskType.title}</TaskTypeItemTitle>
      <TaskTypeItemDescription>{taskType.description}</TaskTypeItemDescription>
      <TaskTypeItemExamples>
        Example:
        <ul>
          {taskType.examples.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </TaskTypeItemExamples>
      {isCurrentSelected && (
        <Button onClick={setSelectedTaskTypeHandler} icon={icons[IconType.EDIT_OUTLINED]}>
          Change type
        </Button>
      )}
    </TaskTypeItemWrapper>
  );
};

export default TaskTypeItem;
