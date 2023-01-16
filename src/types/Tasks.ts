import firebase from 'firebase/compat';
import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { UnitSyntax } from '../helpers/unitSyntaxHelpers';

//--------------------------

export interface DayModifier {
  dayType: string;
  multiplier: number;
}

export interface TaskModifier {
  percentageModifier: boolean;
  dayModifier: DayModifier[];
}

export interface TaskShared {
  id?: string;
  position: number;
  version: number;
  userId: string;
  taskGroupId: string;
  taskListId: string;
  isActive: boolean;
}

//--------------------------
export interface TimeCheckpoint {
  time: string;
  points: number;
}

export interface UnitCheckpoint {
  unitCount: number;
  points: number;
}

export interface OptionCheckpoint {
  optionId: number;
  option: string;
  points: number;
}

//--------------------------

export enum TaskType {
  TIME = 'time',
  DURATION = 'duration',
  CHECKBOX = 'checkbox',
  UNITS = 'units',
  UNIT_CHECKPOINTS = 'unitCheckpoints',
  OPTIONS = 'options',
}

export enum DurationUnits {
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
}

export const durationUnitsSyntax: Record<DurationUnits, UnitSyntax> = {
  [DurationUnits.HOUR]: {
    zero: 'hours',
    one: 'hour',
    twoAndMore: 'hours',
  },
  [DurationUnits.MINUTE]: {
    zero: 'minutes',
    one: 'minute',
    twoAndMore: 'minutes',
  },
  [DurationUnits.SECOND]: {
    zero: 'seconds',
    one: 'second',
    twoAndMore: 'seconds',
  },
};
//--------------------------

export type TTTime = TaskShared & {
  taskName: string;
  taskModifiers: TaskModifier;
  taskType: TaskType.TIME;
  taskUnits?: undefined;
  taskCheckpoints: TimeCheckpoint[];
};

export type TTDuration = TaskShared & {
  taskName: string;
  taskModifiers: TaskModifier;
  taskType: TaskType.DURATION;
  taskUnits: UnitSyntax; //from DurationUnitsSyntax
  taskUnitCount: number;
  taskPoints: number;
};

export type TTCheckbox = TaskShared & {
  taskName: string;
  taskModifiers: TaskModifier;
  taskType: TaskType.CHECKBOX;
  taskPoints: number;
};

export type TTUnits = TaskShared & {
  taskName: string;
  taskModifiers: TaskModifier;
  taskType: TaskType.UNITS;
  taskUnits: UnitSyntax;
  taskUnitCount: number;
  taskPoints: number;
};

export type TTUnitCheckpoints = TaskShared & {
  taskName: string;
  taskModifiers: TaskModifier;
  taskType: TaskType.UNIT_CHECKPOINTS;
  taskUnits: UnitSyntax;
  taskCheckpoints: UnitCheckpoint[];
};

export type TTOptions = TaskShared & {
  taskName: string;
  taskModifiers: TaskModifier;
  taskType: TaskType.OPTIONS;
  taskUnits?: undefined;
  taskCheckpoints: OptionCheckpoint[];
};

export type Task = TTTime | TTDuration | TTCheckbox | TTUnits | TTUnitCheckpoints | TTOptions;

// noinspection JSUnusedGlobalSymbols
export const taskConverter = {
  toFirestore(task: Task): firebase.firestore.DocumentData {
    return task;
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Task {
    const data = snapshot.data(options);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return data as Task;
  },
};
