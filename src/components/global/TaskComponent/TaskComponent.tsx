import React from 'react';
import { Task } from '../../../types/Tasks';
import styled from 'styled-components';
import { COLORS, STYLE } from '../../../styles/CustomStyles';
import TaskUserInput from './TaskUserInput';

export enum TaskDisplayMode {
  BOXES,
  ROWS,
}

interface TaskComponentProps {
  task: Task;
  displayMode: TaskDisplayMode;
}

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //flex: 0 0 calc(25% - 2rem);
  flex: 0 0 12rem;
  margin: 0.25rem;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: ${COLORS.GREY_LIGHT};
  box-shadow: ${STYLE.BASE_SHADOW};
`;

const TaskHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TaskContent = styled.div`
  width: 100%;
`;

const HeaderTitle = styled.h3`
  margin-bottom: 0;
`;

const HeaderPoints = styled.div`
  background-color: ${COLORS.PRIMARY_LIGHT};
  padding: 0.5rem;
  font-weight: bold;
  border-radius: 50%;
`;

const TaskComponent: React.FC<TaskComponentProps> = ({ task, displayMode }) => {
  if (displayMode === TaskDisplayMode.BOXES) {
    return (
      <TaskWrapper>
        <TaskHeader>
          <HeaderTitle>{task.taskName}</HeaderTitle>
          <HeaderPoints>12</HeaderPoints>
        </TaskHeader>
        <TaskContent>
          <TaskUserInput task={task} />
        </TaskContent>
      </TaskWrapper>
    );
  }

  if (displayMode === TaskDisplayMode.ROWS) {
    return (
      <TaskWrapper>
        <TaskHeader>
          <HeaderTitle>{task.taskName}</HeaderTitle>
          <HeaderPoints>12</HeaderPoints>
        </TaskHeader>
        <TaskContent>
          <TaskUserInput task={task} />
        </TaskContent>
      </TaskWrapper>
    );
  }

  return null;
};

export default TaskComponent;
