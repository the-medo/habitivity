import React from 'react';
import { Task } from '../../../types/Tasks';
import styled from 'styled-components';
import { COLORS, STYLE } from '../../../styles/CustomStyles';
import TaskUserInput from './TaskUserInput';
import TaskModifiers from './TaskModifiers';

export enum TaskDisplayMode {
  BOXES,
  ROWS,
}

interface TaskComponentProps {
  task: Task;
  displayMode: TaskDisplayMode;
}

const TaskHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TaskUserInputWrapper = styled.div``;

const HeaderTitle = styled.h3`
  margin-bottom: 0;
`;

const HeaderPoints = styled.div`
  background-color: ${COLORS.PRIMARY_LIGHT};
  padding: 0.5rem;
  font-weight: bold;
  border-radius: 50%;
`;

const TaskWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.25rem;

  &:hover {
    background-color: ${COLORS.GREY_LIGHT};
  }
`;

const TaskWrapperBox = styled(TaskWrapper)`
  flex-direction: column;
  flex: 0 0 12rem;
  gap: 0.5rem;
  box-shadow: ${STYLE.BASE_SHADOW};
`;

const TaskWrapperRow = styled(TaskWrapper)`
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
  border-bottom: 1px solid ${COLORS.GREY_LIGHT};

  ${HeaderTitle} {
    flex-basis: 15rem;
  }

  ${TaskUserInputWrapper} {
    flex-basis: 8rem;
  }
`;

const TaskComponent: React.FC<TaskComponentProps> = ({ task, displayMode }) => {
  switch (displayMode) {
    case TaskDisplayMode.BOXES:
      return (
        <TaskWrapperBox>
          <TaskHeader>
            <HeaderTitle>{task.taskName}</HeaderTitle>
            <HeaderPoints>12</HeaderPoints>
          </TaskHeader>
          <TaskUserInput task={task} />
          <TaskModifiers value={50} taskModifiers={task.taskModifiers} />
        </TaskWrapperBox>
      );
    case TaskDisplayMode.ROWS:
      return (
        <TaskWrapperRow>
          <HeaderPoints>12</HeaderPoints>
          <HeaderTitle>{task.taskName}</HeaderTitle>
          <TaskUserInputWrapper>
            <TaskUserInput task={task} />
          </TaskUserInputWrapper>
          <TaskModifiers value={50} taskModifiers={task.taskModifiers} />
        </TaskWrapperRow>
      );
  }
};

export default TaskComponent;
