import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Task, TaskType } from '../../../types/Tasks';
import TaskUserInputDuration from './TaskUserInput/TaskUserInputDuration';
import TaskUserInputUnits from './TaskUserInput/TaskUserInputUnits';
import TaskUserInputUnitCheckpoints from './TaskUserInput/TaskUserInputUnitCheckpoints';
import TaskUserInputCheckbox from './TaskUserInput/TaskUserInputCheckbox';
import TaskUserInputTime from './TaskUserInput/TaskUserInputTime';
import { Dayjs } from 'dayjs';
import TaskUserInputOptions from './TaskUserInput/TaskUserInputOptions';
import { DefaultOptionType } from 'antd/es/select';
import { dayjsToMinutes } from '../../../helpers/date/dayjsToMinutes';
import debounce from 'lodash.debounce';
import { getPointsBasedOnTimeCheckpoints } from '../../../helpers/getPointsBasedOnTimeCheckpoints';
import { getPointsBasedOnUnitCheckpoints } from '../../../helpers/getPointsBasedOnUnitCheckpoints';
import { useCompleteTaskMutation } from '../../../apis/apiTasks';
import { Input, Spin } from 'antd';
import { dateBasicFormatFromDayjs } from '../../../helpers/date/dateBasicFormatFromDate';
import { CompletedDayTask } from '../../../helpers/types/CompletedDay';

interface TaskUserInputProps {
  task: Task;
  date: Dayjs;
  completedDayTask: CompletedDayTask | undefined;
}

const TaskUserInput: React.FC<TaskUserInputProps> = ({ task, date, completedDayTask }) => {
  const [completeTask, { isLoading: isCompleting }] = useCompleteTaskMutation();

  const updatePoints = useCallback(
    (points: number, value: number) => {
      points = Math.ceil(points * 100) / 100;

      console.log('=========== GOING TO COMPLETE TASK ===========');
      completeTask({
        task,
        points,
        date: dateBasicFormatFromDayjs(date),
        value,
        usedModifiers: {
          percentage: null,
        },
      });
    },
    [completeTask, date, task],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePointsDebounce = useCallback(
    debounce((points: number, value: number) => updatePoints(points, value), 500),
    [updatePoints, completeTask, date],
  );

  const onChangeInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        const value = parseFloat(e.target.value);
        console.log('INPUT: ', e.target.value);
        let points = 0;
        if (task.taskType === TaskType.DURATION) {
          points = task.taskPoints * (value / task.taskUnitCount);
        } else if (task.taskType === TaskType.UNITS) {
          points = task.taskPoints * (value / task.taskUnitCount);
        } else if (task.taskType === TaskType.UNIT_CHECKPOINTS) {
          console.log(task.taskCheckpoints);
          points = getPointsBasedOnUnitCheckpoints(task.taskCheckpoints, value);
        }
        updatePointsDebounce(points, value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatePointsDebounce],
  );

  const onChangeTimeHandler = useCallback(
    (value: Dayjs | null) => {
      let time: number | undefined = undefined;
      if (task.taskType === TaskType.TIME) {
        if (value) {
          time = dayjsToMinutes(value);
          const points = getPointsBasedOnTimeCheckpoints(task.taskCheckpoints, time);
          updatePointsDebounce(points, time);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatePointsDebounce],
  );

  const onChangeSelectHandler = useCallback(
    (value: number, option: DefaultOptionType | DefaultOptionType[]) => {
      let points = 0;
      if (task.taskType === TaskType.CHECKBOX) {
        points = value === 0 ? 0 : task.taskPoints;
      } else if (task.taskType === TaskType.OPTIONS) {
        points = task.taskCheckpoints[value].points;
      }
      console.log('POINTS: ', points);
      updatePoints(points, value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatePoints, task.taskType],
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
