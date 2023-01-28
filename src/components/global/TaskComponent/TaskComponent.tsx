import React, { useMemo } from 'react';
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
import { Dropdown, DropdownProps } from 'antd';
import { AiOutlineComment, AiOutlineEdit } from 'react-icons/ai';
import { RowGap } from '../RowGap';
import DynamicIcon from '../DynamicIcon';

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
}

const TaskWrapper = styled.div<TaskWrapperProps>`
  display: flex;

  &:hover {
    background-color: ${COLORS.GREY_LIGHT};
  }

  ${({ $displayMode }) =>
    $displayMode === TaskDisplayMode.BOXES &&
    css`
      flex-direction: column;
      flex: 0 0 12rem;
      gap: 0.5rem;
      border-radius: 0.5rem;
      padding: 0.5rem;
      border: 1px solid ${COLORS.GREY_BORDER};

      ${TaskHeader} {
        //width: 10rem;
        min-height: 2rem;
        height: 2rem;
        align-items: center;
        padding: 0;

        ${HeaderTitle} {
          width: calc(10rem - 3rem);
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
}) => {
  const taskInputs = useMemo(
    () => (
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
    ),
    [completedDayTask, isEmpty, selectedDate, task],
  );

  const extraItems: DropdownProps['menu'] = useMemo(
    () => ({
      items: [
        {
          label: 'Add a comment',
          key: '1',
          icon: <AiOutlineComment />,
        },
        {
          label: 'Edit task definition',
          key: '2',
          icon: <AiOutlineEdit />,
        },
      ],
    }),
    [],
  );

  const taskHeader = useMemo(
    () => (
      <TaskHeader>
        <RowGap>
          <PointCircle $color={colorDark} $size="small">
            {formatPoints(completedDayTask?.points)}
          </PointCircle>{' '}
          <HeaderTitle>{task.taskName}</HeaderTitle>
        </RowGap>
        <Dropdown menu={extraItems}>
          <DynamicIcon icon="BsThreeDotsVertical" />
        </Dropdown>
      </TaskHeader>
    ),
    [colorDark, completedDayTask?.points, task.taskName, extraItems],
  );

  return (
    <TaskWrapper $displayMode={displayMode}>
      {taskHeader}
      {taskInputs}
    </TaskWrapper>
  );
};

export default TaskComponent;
