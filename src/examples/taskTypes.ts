import {
  DurationUnits,
  DurationUnitsSyntax,
  Task,
  TaskType,
  TTCheckbox,
  TTDuration,
  TTOptions,
  TTTime,
  TTUnitCheckpoints,
  TTUnits,
} from '../types/Tasks';
import { TaskList, TaskListType } from '../types/TaskLists';
import { TaskGroup } from '../types/TaskGroup';

//===========================================================

export const taskListExample: TaskList = {
  id: 'task-list-example',
  userId: 'random-user-id',
  name: 'Task List Example',
  type: TaskListType.DAILY,
};

//===========================================================

export const taskGroupExample1: TaskGroup = {
  id: 'task-group-example-1',
  position: 1,
  name: 'Task Group 1',
  taskListId: 'task-list-example',
};

export const taskGroupExample2: TaskGroup = {
  id: 'task-group-example-2',
  position: 2,
  name: 'Task Group 2',
  taskListId: 'task-list-example',
};

//===========================================================

export const taskWakeUp: TTTime = {
  taskType: TaskType.TIME,
  userId: 'my-user-id',
  id: 'task-wake-up-id',
  position: 1,
  taskName: 'Actually woke up',
  taskListId: 'task-list-example',
  taskGroupId: 'task-group-example-1',
  isActive: true,
  taskPoints: 0,
  taskModifiers: {
    percentageModifier: false,
    dayModifier: [],
  },
  taskCheckpoints: [
    { time: '5:30', points: 2 },
    { time: '6:00', points: 1 },
    { time: '7:00', points: 0 },
    { time: '8:00', points: -1 },
    { time: '9:00', points: -2 },
  ],
};

export const taskSleep: TTUnitCheckpoints = {
  taskType: TaskType.UNIT_CHECKPOINTS,
  userId: 'my-user-id',
  id: 'task-sleep',
  position: 2,
  taskName: 'Sleep',
  taskListId: 'task-list-example',
  taskGroupId: 'task-group-example-1',
  isActive: true,
  taskPoints: 0,
  taskModifiers: {
    percentageModifier: false,
    dayModifier: [],
  },
  taskUnits: DurationUnitsSyntax[DurationUnits.HOUR],
  taskCheckpoints: [
    { unitCount: 4, points: -2 },
    { unitCount: 8, points: 1 },
  ],
};

export const taskElevate: TTCheckbox = {
  taskType: TaskType.CHECKBOX,
  userId: 'my-user-id',
  id: 'task-elevate',
  position: 3,
  taskName: 'Elevate',
  taskListId: 'task-list-example',
  taskGroupId: 'task-group-example-1',
  isActive: true,
  taskPoints: 1,
  taskModifiers: {
    percentageModifier: false,
    dayModifier: [],
  },
};

export const taskBookReading: TTUnits = {
  taskType: TaskType.UNITS,
  userId: 'my-user-id',
  id: 'task-book-reading',
  position: 4,
  taskName: 'Book',
  taskListId: 'task-list-example',
  taskGroupId: 'task-group-example-2',
  isActive: true,
  taskPoints: 10, //10 pages for 1 point
  taskModifiers: {
    percentageModifier: false,
    dayModifier: [],
  },
  taskUnits: {
    zero: 'pages',
    one: 'page',
    twoAndMore: 'pages',
  },
};

export const taskExercise: TTDuration = {
  taskType: TaskType.DURATION,
  userId: 'my-user-id',
  id: 'task-exercise',
  position: 5,
  taskName: 'Exercise',
  taskListId: 'task-list-example',
  taskGroupId: 'task-group-example-2',
  isActive: true,
  taskPoints: 15, //15 minutes for 1 point
  taskModifiers: {
    percentageModifier: false,
    dayModifier: [],
  },
  taskUnits: DurationUnitsSyntax[DurationUnits.MINUTE],
};

export const taskOverallRandom: TTOptions = {
  taskType: TaskType.OPTIONS,
  userId: 'my-user-id',
  id: 'task-overall-random',
  position: 6,
  taskName: 'Random feelings',
  taskListId: 'task-list-example',
  taskGroupId: 'task-group-example-2',
  isActive: true,
  taskModifiers: {
    percentageModifier: false,
    dayModifier: [],
  },
  taskPoints: 0,
  taskCheckpoints: [
    {
      optionId: 1,
      option: 'Average',
      points: 0,
      isDefault: true,
    },
    {
      optionId: 2,
      option: 'Not productive feeling',
      points: -1,
      isDefault: false,
    },
    {
      optionId: 3,
      option: 'Productive feeling',
      points: 1,
      isDefault: false,
    },
  ],
};

export const _exampleTaskLists: TaskList[] = [taskListExample];
export const _exampleTaskGroups: TaskGroup[] = [taskGroupExample1, taskGroupExample2];
export const _exampleTasks: Task[] = [
  taskWakeUp,
  taskSleep,
  taskElevate,
  taskBookReading,
  taskExercise,
  taskOverallRandom,
];
