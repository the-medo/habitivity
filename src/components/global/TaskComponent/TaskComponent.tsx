import React from 'react';
import { Task } from '../../../types/Tasks';
import styled, { css } from 'styled-components';
import { COLORS } from '../../../styles/CustomStyles';
import TaskUserInput from './TaskUserInput';
import TaskModifiers, { ModifiersWrapper } from './TaskModifiers';
import { Header5 } from '../Headers';
import { Dayjs } from 'dayjs';
import { CompletedDayTask } from '../../../helpers/types/CompletedDay';
import { formatPoints } from '../../../helpers/numbers/formatPoints';

export enum TaskDisplayMode {
  BOXES,
  ROWS,
}

interface TaskComponentProps {
  task: Task;
  displayMode: TaskDisplayMode;
  selectedDate: Dayjs;
  completedDayTask: CompletedDayTask | undefined;
  isEmpty: boolean;
  colorDark: string;
  colorLight: string;
}

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskUserInputsWrapper = styled.div``;

const HeaderTitle = styled(Header5)`
  margin-bottom: 0;
`;

const HeaderPoints = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  //font-weight: bold;
  border-radius: 50%;
  font-size: 12px;
  width: 2rem;
  height: 2rem;
`;

interface TaskWrapperProps {
  $displayMode: TaskDisplayMode;
  $colorLight: string;
  $colorDark: string;
}

const TaskWrapper = styled.div<TaskWrapperProps>`
  display: flex;

  ${HeaderPoints} {
    background-color: ${p => p.$colorDark};
    color: white;
  }

  &:hover {
    background-color: ${COLORS.GREY_LIGHT};
  }

  ${({ $displayMode, $colorLight }) =>
    $displayMode === TaskDisplayMode.BOXES &&
    css`
      flex-direction: column;
      flex: 0 0 12rem;
      gap: 0.5rem;
      border: 1px solid ${$colorLight};

      ${TaskHeader} {
        width: 12rem;
        min-height: 2rem;
        height: 2rem;
        align-items: center;
        background-color: ${$colorLight};
        padding: 0.25rem;

        ${HeaderTitle} {
          width: calc(12rem - 3rem);
          padding: 0.25rem;
          white-space: nowrap;
          display: inline;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        ${HeaderPoints} {
          width: 1.5rem;
          height: 1.5rem;
          font-size: 75%;
        }
      }

      ${TaskUserInputsWrapper} {
        padding: 0.5rem;
      }
    `}

  ${({ $displayMode }) =>
    $displayMode === TaskDisplayMode.ROWS &&
    css`
      flex-direction: row;
      padding: 0.5rem;
      gap: 1.5rem;
      align-items: center;
      border-bottom: 1px solid ${COLORS.GREY_LIGHT};

      ${TaskHeader} {
        flex-basis: 15rem;
        flex-direction: row-reverse;
        gap: 1rem;

        ${HeaderTitle} {
          flex-grow: 1;
          align-items: center;
        }
      }

      ${TaskUserInputsWrapper} {
        flex-basis: 8rem;
      }

      ${ModifiersWrapper} {
        padding-bottom: 0;
      }
    `}
`;

const TaskComponent: React.FC<TaskComponentProps> = ({
  task,
  displayMode,
  selectedDate,
  completedDayTask,
  isEmpty,
  colorDark,
  colorLight,
}) => {
  return (
    <TaskWrapper $displayMode={displayMode} $colorLight={colorLight} $colorDark={colorDark}>
      <TaskHeader>
        <HeaderTitle>{task.taskName}</HeaderTitle>
        <HeaderPoints>{formatPoints(completedDayTask?.points)}</HeaderPoints>
      </TaskHeader>
      <TaskUserInputsWrapper>
        {isEmpty ? (
          <div>
            {/* placeholder DIV wrapper */}
            <TaskUserInput date={selectedDate} task={task} completedDayTask={undefined} />
          </div>
        ) : (
          <TaskUserInput date={selectedDate} task={task} completedDayTask={completedDayTask} />
        )}
      </TaskUserInputsWrapper>
      <TaskModifiers
        percentValue={completedDayTask?.usedModifiers.percentage ?? 100}
        date={selectedDate}
        task={task}
        completedDayTask={completedDayTask}
        isReloading={isEmpty}
      />
    </TaskWrapper>
  );
};

export default TaskComponent;
