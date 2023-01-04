import React, { useCallback, useMemo } from 'react';
import TaskTypeSelector from './TaskTypeSelector';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { taskTypesWithDescription } from './taskTypesWithDescription';
import TaskTypeItem from './TaskType/TaskTypeItem';
import { Task, TaskType } from '../../types/Tasks';
import TaskCreateDuration from './TaskType/TaskCreateDuration';
import ExampleBox from './TaskType/ExampleBox';
import TaskCreateCheckbox from './TaskType/TaskCreateCheckbox';
import TaskCreateTime from './TaskType/TaskCreateTime';
import TaskCreateUnits from './TaskType/TaskCreateUnits';
import TaskCreateUnitCheckpoints from './TaskType/TaskCreateUnitCheckpoints';
import TaskCreateOptions from './TaskType/TaskCreateOptions';
import { Spin } from 'antd';
import { useCreateTaskMutation } from '../../apis/apiTasks';
import { setSelectedTaskType } from './taskCreationSlice';
import { setNotification } from '../../store/notificationSlice';

const TaskCreateFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export interface TaskCreateProps {
  createTaskHandler: (task?: Task) => void;
}

const TaskCreateForm: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedTaskType } = useSelector((state: ReduxState) => state.taskCreationReducer);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation();

  const taskTypeWithDescription = useMemo(
    () => taskTypesWithDescription.find(tt => tt.id === selectedTaskType),
    [selectedTaskType],
  );

  const createTaskHandler = useCallback(
    (task?: Task) => {
      if (task) {
        dispatch(setSelectedTaskType(undefined));
        createTask(task).then(res => {
          if ('data' in res) {
            console.log('Creating notification');
            dispatch(
              setNotification({
                type: 'success',
                message: `Task created!`,
                description: `Your task "${res.data.taskName}" has been created successfully!`,
                placement: 'topRight',
              }),
            );
          } else if ('error' in res) {
            console.log('Creating notification');
            dispatch(
              setNotification({
                type: 'error',
                message: `There was an error while creating your task.`,
                description: `${res.error ?? 'Unknown error'}`,
                placement: 'topRight',
              }),
            );
          }
        });
      }
    },
    [createTask, dispatch],
  );

  return (
    <Spin spinning={isCreatingTask}>
      {taskTypeWithDescription === undefined && <TaskTypeSelector />}
      {taskTypeWithDescription !== undefined && (
        <TaskCreateFormWrapper>
          <TaskTypeItem taskType={taskTypeWithDescription} />
          {selectedTaskType === TaskType.DURATION && (
            <TaskCreateDuration createTaskHandler={createTaskHandler} />
          )}
          {selectedTaskType === TaskType.CHECKBOX && (
            <TaskCreateCheckbox createTaskHandler={createTaskHandler} />
          )}
          {selectedTaskType === TaskType.TIME && (
            <TaskCreateTime createTaskHandler={createTaskHandler} />
          )}
          {selectedTaskType === TaskType.UNITS && (
            <TaskCreateUnits createTaskHandler={createTaskHandler} />
          )}
          {selectedTaskType === TaskType.UNIT_CHECKPOINTS && (
            <TaskCreateUnitCheckpoints createTaskHandler={createTaskHandler} />
          )}
          {selectedTaskType === TaskType.OPTIONS && (
            <TaskCreateOptions createTaskHandler={createTaskHandler} />
          )}
          <ExampleBox />
        </TaskCreateFormWrapper>
      )}
    </Spin>
  );
};

export default TaskCreateForm;
