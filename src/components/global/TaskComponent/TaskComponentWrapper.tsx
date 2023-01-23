import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { TaskDisplayMode } from './TaskComponent';

export const TaskComponentWrapperBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 1rem;
`;

export const TaskComponentWrapperRow = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

interface TaskComponentWrapperProps {
  displayMode: TaskDisplayMode;
  children?: ReactNode;
}

const TaskComponentWrapper: React.FC<TaskComponentWrapperProps> = ({ displayMode, children }) => {
  switch (displayMode) {
    case TaskDisplayMode.BOXES:
      return <TaskComponentWrapperBox>{children}</TaskComponentWrapperBox>;
    case TaskDisplayMode.ROWS:
      return <TaskComponentWrapperRow>{children}</TaskComponentWrapperRow>;
  }
  return null;
};

export default TaskComponentWrapper;
