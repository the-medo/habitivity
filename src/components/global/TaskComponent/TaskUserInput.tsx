import React, { ChangeEvent, useCallback } from 'react';
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
import { Spin } from 'antd';
import { dayjsToMiddayDate } from '../../../helpers/date/dayjsToMiddayDate';

interface TaskUserInputProps {
  task: Task;
}

const TaskUserInput: React.FC<TaskUserInputProps> = ({ task }) => {
  const [completeTask, { isLoading: isCompleting }] = useCompleteTaskMutation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePoints = useCallback(
    debounce((points: number, value: number) => {
      points = Math.ceil(points * 100) / 100;
      const date = dayjsToMiddayDate();

      console.log('=========== GOING TO COMPLETE TASK ===========');
      completeTask({
        task,
        date,
        points,
        value,
        usedModifiers: {
          percentage: null,
        },
      });
    }, 500),
    [completeTask],
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
        points = value === 0 ? 0 : task.taskPoints;
      } else if (task.taskType === TaskType.OPTIONS) {
        points = task.taskCheckpoints[value].points;
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
        <Spin spinning={isCompleting}>
          <TaskUserInputDuration
            value={undefined}
            units={task.taskUnits}
            onChange={onChangeInputHandler}
          />
        </Spin>
      );
    case TaskType.TIME: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputTime value={undefined} onChange={onChangeTimeHandler} />
        </Spin>
      );
    }
    case TaskType.CHECKBOX: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputCheckbox value={undefined} onChange={onChangeSelectHandler} />
        </Spin>
      );
    }
    case TaskType.UNITS: {
      return (
        <Spin spinning={isCompleting}>
          <TaskUserInputUnits
            value={undefined}
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
            value={undefined}
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
            value={undefined}
            options={task.taskCheckpoints}
            onChange={onChangeSelectHandler}
          />
        </Spin>
      );
    }
  }
};

export default TaskUserInput;
