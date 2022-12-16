import React, { Fragment } from 'react';
import styled from 'styled-components';
import TaskTypeItem, { TaskTypeItemWrapper } from './TaskType/TaskTypeItem';
import { taskTypesWithDescription } from './taskTypesWithDescription';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';

interface TaskTypeWrapperProps {
  $isTaskTypeSelected: boolean;
}

export const TaskTypeWrapper = styled.div<TaskTypeWrapperProps>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  flex-basis: ${({ $isTaskTypeSelected }) => ($isTaskTypeSelected ? '20%' : '100%')};

  min-width: 250px;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;

  ${TaskTypeItemWrapper} {
    max-width: 15%;
  }
`;

const TaskTypeSelector: React.FC = () => {
  const { selectedTaskType } = useSelector((state: ReduxState) => state.taskReducer);

  return (
    <>
      <h2>Choose task type:</h2>
      <TaskTypeWrapper $isTaskTypeSelected={!!selectedTaskType}>
        {taskTypesWithDescription.map(tt => (
          <Fragment key={tt.id}>
            <TaskTypeItem taskType={tt} />
          </Fragment>
        ))}
      </TaskTypeWrapper>
    </>
  );
};

export default TaskTypeSelector;
