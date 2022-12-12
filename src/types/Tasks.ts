import firebase from 'firebase/compat';
import {QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';
import {UnitSyntax} from "../helpers/unitSyntaxHelpers";


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
    id: string,
    position: number,
    userId: string,
    taskGroupId: string,
    taskListId: string,
    isActive: boolean;
    taskName: string,
    taskPoints: number,
    taskModifiers: TaskModifier,
}

//--------------------------
export type TimeCheckpoint = {
    time: string;
    points: number;
}

export type UnitCheckpoint = {
    unitCount: number;
    points: number;
}

export type OptionCheckpoint = {
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

export const DurationUnitsSyntax: Record<DurationUnits, UnitSyntax> = {
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
}
//--------------------------

export type TTTime = TaskShared & {
    taskType: TaskType.TIME,
    taskUnits?: undefined,
    taskCheckpoints: TimeCheckpoint[],
}

export type TTDuration = TaskShared & {
    taskType: TaskType.DURATION,
    taskUnits: UnitSyntax, //from DurationUnitsSyntax
}

export type TTCheckbox = TaskShared & {
    taskType: TaskType.CHECKBOX,
    taskUnits?: undefined,
}

export type TTUnits = TaskShared & {
    taskType: TaskType.UNITS,
    taskUnits: UnitSyntax,
}

export type TTUnitCheckpoints = TaskShared & {
    taskType: TaskType.UNIT_CHECKPOINTS,
    taskUnits: UnitSyntax,
    taskCheckpoints: UnitCheckpoint[],
}

export type TTOptions = TaskShared & {
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


