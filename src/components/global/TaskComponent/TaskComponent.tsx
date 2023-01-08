import React from 'react';
import { Task } from '../../../types/Tasks';
import styled, { css } from 'styled-components';
import { COLORS, STYLE } from '../../../styles/CustomStyles';
import TaskUserInput from './TaskUserInput';
import TaskModifiers from './TaskModifiers';
import { Header5 } from '../Headers';

export enum TaskDisplayMode {
  BOXES,
  ROWS,
}

interface TaskComponentProps {
  task: Task;
  displayMode: TaskDisplayMode;
}

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskUserInputWrapper = styled.div``;

const HeaderTitle = styled(Header5)`
  margin-bottom: 0;
`;

const HeaderPoints = styled.div`
  background-color: ${COLORS.PRIMARY_LIGHT};
  padding: 0.5rem;
  //font-weight: bold;
  border-radius: 50%;
`;

const TaskWrapper = styled.div<{ $displayMode: TaskDisplayMode }>`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.25rem;

  &:hover {
    background-color: ${COLORS.GREY_LIGHT};
  }

  ${({ $displayMode }) =>
    $displayMode === TaskDisplayMode.BOXES &&
    css`
      flex-direction: column;
      flex: 0 0 12rem;
      gap: 0.5rem;
      box-shadow: ${STYLE.BASE_SHADOW};

      ${TaskHeader} {
        width: 100%;
        min-height: 3.5rem;
        align-items: flex-start;

        ${HeaderTitle} {
          padding: 0.5rem;
        }
      }
    `}

  ${({ $displayMode }) =>
    $displayMode === TaskDisplayMode.ROWS &&
    css`
      flex-direction: row;
      gap: 1.5rem;
      align-items: center;
      border-bottom: 1px solid ${COLORS.GREY_LIGHT};

      ${TaskHeader} {
        flex-basis: 15rem;
        flex-direction: row-reverse;
        gap: 1rem;

        ${HeaderTitle} {
          flex-grow: 1;
        }
      }

      ${TaskUserInputWrapper} {
        flex-basis: 8rem;
      }
    `}
`;

const TaskComponent: React.FC<TaskComponentProps> = ({ task, displayMode }) => {
  return (
    <TaskWrapper $displayMode={displayMode}>
      <TaskHeader>
        <HeaderTitle>{task.taskName}</HeaderTitle>
        <HeaderPoints>12</HeaderPoints>
      </TaskHeader>
      <TaskUserInputWrapper>
        <TaskUserInput task={task} />
      </TaskUserInputWrapper>
      <TaskModifiers value={50} taskModifiers={task.taskModifiers} />
    </TaskWrapper>
  );
};

export default TaskComponent;
