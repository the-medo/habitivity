import React, { ChangeEvent, useCallback } from 'react';
import { Task, TaskType } from '../../../types/Tasks';
import TaskUserInputDuration from './TaskUserInput/TaskUserInputDuration';
import TaskUserInputUnits from './TaskUserInput/TaskUserInputUnits';
import TaskUserInputUnitCheckpoints from './TaskUserInput/TaskUserInputUnitCheckpoints';
import TaskUserInputCheckbox from './TaskUserInput/TaskUserInputCheckbox';
import TaskUserInputTime from './TaskUserInput/TaskUserInputTime';
import TaskUserInputOptions from './TaskUserInput/TaskUserInputOptions';
import { Dayjs } from 'dayjs';
import { DefaultOptionType } from 'antd/es/select';
import { dayjsToMinutes } from '../../../helpers/dayjs/dayjsToMinutes';
import debounce from 'lodash.debounce';
import { getPointsBasedOnTimeCheckpoints } from '../../../helpers/getPointsBasedOnTimeCheckpoints';
import { getPointsBasedOnUnitCheckpoints } from '../../../helpers/getPointsBasedOnUnitCheckpoints';

interface TaskUserInputProps {
  task: Task;
}

const TaskUserInput: React.FC<TaskUserInputProps> = ({ task }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePoints = useCallback(
    debounce((points: number, value: number) => {
      points = Math.ceil(points * 100) / 100;
      console.log('IN DEBOUNCE -  points: ', points, ' value: ', value);
    }, 500),
    [],
  );

  const onChangeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const value = parseInt(e.target.value);
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
      updatePoints(points, value);
    }
  }, []);

  const onChangeTimeHandler = useCallback((value: Dayjs | null) => {
    let time: number | undefined = undefined;
    if (task.taskType === TaskType.TIME) {
      if (value) {
        time = dayjsToMinutes(value);
        const points = getPointsBasedOnTimeCheckpoints(task.taskCheckpoints, time);
        updatePoints(points, time);
      }
    }
  }, []);

  const onChangeSelectHandler = useCallback(
    (value: number, option: DefaultOptionType | DefaultOptionType[]) => {
      let points = 0;
      if (task.taskType === TaskType.CHECKBOX) {
        points = task.taskPoints;
      } else if (task.taskType === TaskType.OPTIONS) {
        points = task.taskCheckpoints[value].points;
      }

      if (value) {
        console.log('SELECT: ', value, option);
      }
      console.log('POINTS: ', points);
      updatePoints(points, value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [task.taskType],
  );

  switch (task.taskType) {
    case TaskType.DURATION:
      return (
        <TaskUserInputDuration
          value={undefined}
          units={task.taskUnits}
          onChange={onChangeInputHandler}
        />
      );
    case TaskType.TIME: {
      return <TaskUserInputTime value={undefined} onChange={onChangeTimeHandler} />;
    }
    case TaskType.CHECKBOX: {
      return <TaskUserInputCheckbox value={undefined} onChange={onChangeSelectHandler} />;
    }
    case TaskType.UNITS: {
      return (
        <TaskUserInputUnits
          value={undefined}
          units={task.taskUnits}
          onChange={onChangeInputHandler}
        />
      );
    }
    case TaskType.UNIT_CHECKPOINTS: {
      return (
        <TaskUserInputUnitCheckpoints
          value={undefined}
          units={task.taskUnits}
          onChange={onChangeInputHandler}
        />
      );
    }
    case TaskType.OPTIONS: {
      return (
        <TaskUserInputOptions
          value={undefined}
          options={task.taskCheckpoints}
          onChange={onChangeSelectHandler}
        />
      );
    }
  }
};

export default TaskUserInput;
