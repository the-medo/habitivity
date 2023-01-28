import React from 'react';
import { Task } from '../../../types/Tasks';
import styled, { css } from 'styled-components';
import { COLORS } from '../../../styles/CustomStyles';
import TaskUserInput from './TaskUserInput';
import TaskModifiers, { ModifiersInput, ModifiersWrapper } from './TaskModifiers';
import { Header5 } from '../Headers';
import { Dayjs } from 'dayjs';
import { CompletedDayTask } from '../../../helpers/types/CompletedDay';
import { formatPoints } from '../../../helpers/numbers/formatPoints';
import { PointCircle } from '../PointCircle';

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

const TaskInputsAndModifiersWrapper = styled.div`
  //width: 100%;
  display: flex;
  flex-direction: row;
`;
const TaskUserInputsWrapper = styled.div``;

const HeaderTitle = styled(Header5)`
  margin-bottom: 0;
`;

interface TaskWrapperProps {
  $displayMode: TaskDisplayMode;
  $colorLight: string;
  $colorDark: string;
}

const TaskWrapper = styled.div<TaskWrapperProps>`
  display: flex;

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
      }

      ${TaskUserInputsWrapper} {
        padding: 0.5rem;
      }

      ${TaskInputsAndModifiersWrapper} {
        //flex-basis: 8rem;
        flex-direction: column;
      }
    `}

  ${({ $displayMode }) =>
    $displayMode === TaskDisplayMode.ROWS &&
    css`
      flex-direction: row;
      padding: 0.25rem;
      gap: 1.5rem;
      align-items: flex-start;
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

      ${TaskInputsAndModifiersWrapper} {
        flex-basis: 8rem;
        flex-direction: column;

        ${ModifiersWrapper} {
          flex-grow: 1;
          padding: 0;
          justify-content: stretch;
          align-items: stretch;
          flex-direction: column;

          ${ModifiersInput} {
            width: 100%;
          }
        }

        ${TaskUserInputsWrapper} {
          flex-basis: initial;
        }
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
        <PointCircle $color={colorDark} $size="small">
          {formatPoints(completedDayTask?.points)}
        </PointCircle>
      </TaskHeader>
      <TaskInputsAndModifiersWrapper>
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
      </TaskInputsAndModifiersWrapper>
    </TaskWrapper>
  );
};

export default TaskComponent;
