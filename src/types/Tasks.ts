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
    taskUnits: undefined,
    taskCheckpoints: TimeCheckpoint[],
}

type TTDuration = TaskShared & {
    taskType: TaskType.DURATION,
    taskUnits: DurationUnits,
    taskCheckpoints: undefined,
}

type TTCheckbox = TaskShared & {
    taskType: TaskType.CHECKBOX,
    taskUnits: undefined,
    taskCheckpoints: undefined,
}

type TTUnits = TaskShared & {
    taskType: TaskType.UNITS,
    taskUnits: string,
    taskCheckpoints: undefined,
}

type TTUnitCheckpoints = TaskShared & {
    taskType: TaskType.UNIT_CHECKPOINTS,
    taskUnits: string,
    taskCheckpoints: UnitCheckpoint[],
}

type TTOptions = TaskShared & {
    taskType: TaskType.OPTIONS,
    taskUnits: undefined,
    taskCheckpoints: OptionCheckpoint[],
}

export type Task = TTTime | TTDuration | TTCheckbox | TTUnits | TTUnitCheckpoints | TTOptions;



const test: Task = {
    userId: "asd",
    taskId: "",
    taskName: "",
    taskPoints: 0,
    taskModifiers: {
        percentageModifier: false,
        dayModifier: [],
    },

    taskType: TaskType.DURATION,
    taskCheckpoints: undefined,
    taskUnits: DurationUnits.MINUTE,
};