import firebase from 'firebase/compat';
import {QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';


//--------------------------

export type DayModifier = {
    dayType: string;
    multiplier: number;
}

export type TaskModifier = {
    percentageModifier: boolean;
    dayModifier: DayModifier[];
}

export type TaskShared = {
    userId: string,
    taskId: string,
    taskName: string,
    taskPoints: number,
    taskModifiers: TaskModifier,
}

//--------------------------
type TimeCheckpoint = {
    time: string;
    points: number;
}

type UnitCheckpoint = {
    unitCount: string;
    points: number;
}

type OptionCheckpoint = {
    optionId: number;
    option: string;
    points: number;
    isDefault: boolean;
}
//--------------------------

export enum TaskType {
    TIME = 'time',
    DURATION = 'duration',
    CHECKBOX = 'checkbox',
    UNITS = 'units',
    UNIT_CHECKPOINTS = 'unitCheckpoints',
    OPTIONS = 'options'
}

export enum DurationUnits {
    HOUR = 'hour',
    MINUTE = 'minute',
    SECOND = 'second',
}
//--------------------------

type TTTime = TaskShared & {
    taskType: TaskType.TIME,
    taskUnits?: undefined,
    taskCheckpoints: TimeCheckpoint[],
}

type TTDuration = TaskShared & {
    taskType: TaskType.DURATION,
    taskUnits: DurationUnits,
}

type TTCheckbox = TaskShared & {
    taskType: TaskType.CHECKBOX,
    taskUnits?: undefined,
}

type TTUnits = TaskShared & {
    taskType: TaskType.UNITS,
    taskUnits: string,
}

type TTUnitCheckpoints = TaskShared & {
    taskType: TaskType.UNIT_CHECKPOINTS,
    taskUnits: string,
    taskCheckpoints: UnitCheckpoint[],
}

type TTOptions = TaskShared & {
    taskType: TaskType.OPTIONS,
    taskUnits?: undefined,
    taskCheckpoints: OptionCheckpoint[],
}

export type Task = TTTime | TTDuration | TTCheckbox | TTUnits | TTUnitCheckpoints | TTOptions;

export const taskConverter = {
    toFirestore(task: Task): firebase.firestore.DocumentData {
        return task;
    },

    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Task {
        const data = snapshot.data(options)!;
        return data as Task;
    }
};



export const TaskWakeUp: Task = {
    userId: "my-user-id",
    taskId: "task-wake-up-id",
    taskName: "Actually woke up",
    taskPoints: 0,
    taskModifiers: {
        percentageModifier: false,
        dayModifier: [],
    },

    taskType: TaskType.TIME,
    taskCheckpoints: [
        {time: "5:30", points: 2},
        {time: "6:00", points: 1},
        {time: "7:00", points: 0},
        {time: "8:00", points: -1},
        {time: "9:00", points: -2},
    ],
};

