import { Task, TaskType, UsedModifiers } from '../../types/Tasks';
import { CompletedDayTask } from '../types/CompletedDay';
import { getPointsBasedOnUnitCheckpoints } from '../getPointsBasedOnUnitCheckpoints';
import { getPointsBasedOnTimeCheckpoints } from '../getPointsBasedOnTimeCheckpoints';

export interface ComputePointsResponse {
  points: number;
  value: number | undefined;
  usedModifiers: UsedModifiers;
}

export const computePoints = (
  task: Task,
  value: number | undefined,
  percentage: number | undefined,
  completedDayTask: CompletedDayTask | undefined,
): ComputePointsResponse => {
  if (value === undefined) value = completedDayTask?.value;
  if (value === undefined)
    return {
      points: 0,
      value,
      usedModifiers: {
        percentage: percentage ?? null,
      },
    };

  let points = 0;
  if (task.taskType === TaskType.DURATION) {
    points = task.taskPoints * (value / task.taskUnitCount);
  } else if (task.taskType === TaskType.UNITS) {
    points = task.taskPoints * (value / task.taskUnitCount);
  } else if (task.taskType === TaskType.UNIT_CHECKPOINTS) {
    console.log(task.taskCheckpoints);
    points = getPointsBasedOnUnitCheckpoints(task.taskCheckpoints, value);
  } else if (task.taskType === TaskType.TIME) {
    points = getPointsBasedOnTimeCheckpoints(task.taskCheckpoints, value);
  } else if (task.taskType === TaskType.CHECKBOX) {
    points = value === 0 ? 0 : task.taskPoints;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (task.taskType === TaskType.OPTIONS) {
    points = task.taskCheckpoints[value].points;
  }

  if (task.taskModifiers.percentageModifier) {
    if (percentage === undefined) {
      percentage = completedDayTask?.usedModifiers.percentage ?? 100;
    }
    points = (points * percentage) / 100;
  }

  return {
    points,
    value,
    usedModifiers: {
      percentage: percentage ?? null,
    },
  };
};
