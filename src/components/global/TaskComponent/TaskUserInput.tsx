import React, { ChangeEvent, useCallback } from 'react';
import { Task, TaskType } from '../../../types/Tasks';
import TaskUserInputDuration from './TaskUserInput/TaskUserInputDuration';
import TaskUserInputUnits from './TaskUserInput/TaskUserInputUnits';
import TaskUserInputUnitCheckpoints from './TaskUserInput/TaskUserInputUnitCheckpoints';
import TaskUserInputCheckbox from './TaskUserInput/TaskUserInputCheckbox';
import TaskUserInputTime from './TaskUserInput/TaskUserInputTime';
import { Dayjs } from 'dayjs';
import TaskUserInputOptions from './TaskUserInput/TaskUserInputOptions';
import { dayjsToMinutes } from '../../../helpers/date/dayjsToMinutes';
import debounce from 'lodash.debounce';
import { useCompleteTaskMutation } from '../../../apis/apiTasks';
import { Spin } from 'antd';
import { dateBasicFormatFromDayjs } from '../../../helpers/date/dateBasicFormatFromDate';
import { CompletedDayTask } from '../../../helpers/types/CompletedDay';
import { computePoints, ComputePointsResponse } from '../../../helpers/points/computePoints';

interface TaskUserInputProps {
  task: Task;
  date: Dayjs;
  completedDayTask: CompletedDayTask | undefined;
}

const TaskUserInput: React.FC<TaskUserInputProps> = ({ task, date, completedDayTask }) => {
  const [completeTask, { isLoading: isCompleting }] = useCompleteTaskMutation();

  const updatePoints = useCallback(
    (p: ComputePointsResponse) => {
      console.log('=========== GOING TO COMPLETE TASK ===========');
      completeTask({
        task,
        points: p.points,
        date: dateBasicFormatFromDayjs(date),
        value: p.value ?? 0,
        usedModifiers: p.usedModifiers,
      });
    },
    [completeTask, date, task],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePointsDebounce = useCallback(
    debounce((p: ComputePointsResponse) => updatePoints(p), 500),
    [updatePoints, completeTask, date],
  );

  const onChangeInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        const value = parseFloat(e.target.value);
        updatePointsDebounce(computePoints(task, value, undefined, completedDayTask));
      }
    },
    [updatePointsDebounce, task, completedDayTask],
  );

  const onChangeTimeHandler = useCallback(
    (value: Dayjs | null) => {
      if (task.taskType === TaskType.TIME) {
        if (value) {
          updatePointsDebounce(
            computePoints(task, dayjsToMinutes(value), undefined, completedDayTask),
          );
        }
      }
    },
    [updatePointsDebounce, task, completedDayTask],
  );

  const onChangeSelectHandler = useCallback(
    (value: number) => {
      updatePoints(computePoints(task, value, undefined, completedDayTask));
    },
    [updatePoints, task, completedDayTask],
  );

  switch (task.taskType) {
    case TaskType.DURATION:
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputDuration
            value={completedDayTask?.value}
            units={task.taskUnits}
            onChange={onChangeInputHandler}
          />
        </Spin>
      );
    case TaskType.TIME: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputTime value={completedDayTask?.value} onChange={onChangeTimeHandler} />
        </Spin>
      );
    }
    case TaskType.CHECKBOX: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputCheckbox value={completedDayTask?.value} onChange={onChangeSelectHandler} />
        </Spin>
      );
    }
    case TaskType.UNITS: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputUnits
            value={completedDayTask?.value}
            units={task.taskUnits}
            onChange={onChangeInputHandler}
          />
        </Spin>
      );
    }
    case TaskType.UNIT_CHECKPOINTS: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputUnitCheckpoints
            value={completedDayTask?.value}
            units={task.taskUnits}
            onChange={onChangeInputHandler}
          />
        </Spin>
      );
    }
    case TaskType.OPTIONS: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputOptions
            value={completedDayTask?.value}
            options={task.taskCheckpoints}
            onChange={onChangeSelectHandler}
          />
        </Spin>
      );
    }
  }
};

export default TaskUserInput;
