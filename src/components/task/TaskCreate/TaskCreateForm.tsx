import React, { useMemo } from 'react';
import TaskTypeSelector from './TaskTypeSelector';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { taskTypesWithDescription } from './taskTypesWithDescription';
import TaskTypeItem from './TaskType/TaskTypeItem';
import { TaskType } from '../../../types/Tasks';
import TaskCreateDuration from './TaskType/TaskCreateDuration';
import ExampleBox from './TaskType/ExampleBox';
import TaskCreateCheckbox from './TaskType/TaskCreateCheckbox';
import TaskCreateTime from './TaskType/TaskCreateTime';
import TaskCreateUnits from './TaskType/TaskCreateUnits';
import TaskCreateUnitCheckpoints from './TaskType/TaskCreateUnitCheckpoints';
import TaskCreateOptions from './TaskType/TaskCreateOptions';

const TaskCreateFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TaskCreateForm: React.FC = () => {
  const { selectedTaskType } = useSelector((state: ReduxState) => state.taskReducer);
  const { examples } = useSelector((state: ReduxState) => state.taskCreationReducer);

  const taskTypeWithDescription = useMemo(
    () => taskTypesWithDescription.find(tt => tt.id === selectedTaskType),
    [selectedTaskType],
  );

  if (taskTypeWithDescription === undefined) return <TaskTypeSelector />;

  return (
    <TaskCreateFormWrapper>
      <TaskTypeItem taskType={taskTypeWithDescription} />
      {selectedTaskType === TaskType.DURATION && <TaskCreateDuration />}
      {selectedTaskType === TaskType.CHECKBOX && <TaskCreateCheckbox />}
      {selectedTaskType === TaskType.TIME && <TaskCreateTime />}
      {selectedTaskType === TaskType.UNITS && <TaskCreateUnits />}
      {selectedTaskType === TaskType.UNIT_CHECKPOINTS && <TaskCreateUnitCheckpoints />}
      {selectedTaskType === TaskType.OPTIONS && <TaskCreateOptions />}
      <ExampleBox examples={examples} />
    </TaskCreateFormWrapper>
  );
};

export default TaskCreateForm;
