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
    TTUnits
} from "../types/Tasks";
import {TaskList, TaskListType} from "../types/TaskLists";
import {TaskGroup} from "../types/TaskGroup";


//===========================================================

export const TaskListExample: TaskList = {
    id: "task-list-example",
    name: "Task List Example",
    type: TaskListType.DAILY,
}

//===========================================================

export const TaskGroupExample1: TaskGroup = {
    id: "task-group-example-1",
    name: "Task Group 1",
    taskListId: "task-list-example"
}

export const TaskGroupExample2: TaskGroup = {
    id: "task-group-example-2",
    name: "Task Group 2",
    taskListId: "task-list-example"
}

//===========================================================

export const TaskWakeUp: TTTime = {
    taskType: TaskType.TIME,
    userId: "my-user-id",
    taskId: "task-wake-up-id",
    taskName: "Actually woke up",
    taskListId: "task-list-example",
    taskGroupId: "task-group-example-1",
    isActive: true,
    taskPoints: 0,
    taskModifiers: {
        percentageModifier: false,
        dayModifier: [],
    },
    taskCheckpoints: [
        {time: "5:30", points: 2},
        {time: "6:00", points: 1},
        {time: "7:00", points: 0},
        {time: "8:00", points: -1},
        {time: "9:00", points: -2},
    ],
};

export const TaskSleep: TTUnitCheckpoints = {
    taskType: TaskType.UNIT_CHECKPOINTS,
    userId: "my-user-id",
    taskId: "task-sleep",
    taskName: "Sleep",
    taskListId: "task-list-example",
    taskGroupId: "task-group-example-1",
    isActive: true,
    taskPoints: 0,
    taskModifiers: {
        percentageModifier: false,
        dayModifier: [],
    },
    taskUnits: DurationUnitsSyntax[DurationUnits.HOUR],
    taskCheckpoints: [
        {unitCount: 4, points: -2},
        {unitCount: 8, points: 1},
    ]
}

export const TaskElevate: TTCheckbox = {
    taskType: TaskType.CHECKBOX,
    userId: "my-user-id",
    taskId: "task-elevate",
    taskName: "Elevate",
    taskListId: "task-list-example",
    taskGroupId: "task-group-example-1",
    isActive: true,
    taskPoints: 1,
    taskModifiers: {
        percentageModifier: false,
        dayModifier: [],
    },
}

export const TaskBookReading: TTUnits = {
    taskType: TaskType.UNITS,
    userId: "my-user-id",
    taskId: "task-book-reading",
    taskName: "Book",
    taskListId: "task-list-example",
    taskGroupId: "task-group-example-2",
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
}


export const TaskExercise: TTDuration = {
    taskType: TaskType.DURATION,
    userId: "my-user-id",
    taskId: "task-exercise",
    taskName: "Exercise",
    taskListId: "task-list-example",
    taskGroupId: "task-group-example-2",
    isActive: true,
    taskPoints: 15, //15 minutes for 1 point
    taskModifiers: {
        percentageModifier: false,
        dayModifier: [],
    },
    taskUnits: DurationUnitsSyntax[DurationUnits.MINUTE],
}


export const TaskOverallFeeling: TTOptions = {
    taskType: TaskType.OPTIONS,
    userId: "my-user-id",
    taskId: "task-overall-feelings",
    taskName: "Overall feelings",
    taskListId: "task-list-example",
    taskGroupId: "task-group-example-2",
    isActive: true,
    taskModifiers: {
        percentageModifier: false,
        dayModifier: [],
    },
    taskPoints: 0,
    taskCheckpoints: [
        {
            optionId: 1,
            option: "Average",
            points: 0,
            isDefault: true,
        },
        {
            optionId: 2,
            option: "Not productive feeling",
            points: -1,
            isDefault: false,
        },
        {
            optionId: 3,
            option: "Productive feeling",
            points: 1,
            isDefault: false,
        },
    ],
}

export const ExampleTaskLists: TaskList[] = [TaskListExample];
export const ExampleTaskGroups: TaskGroup[] = [TaskGroupExample1, TaskGroupExample2];
export const ExampleTasks: Task[] = [TaskWakeUp, TaskSleep, TaskElevate, TaskBookReading, TaskExercise, TaskOverallFeeling];