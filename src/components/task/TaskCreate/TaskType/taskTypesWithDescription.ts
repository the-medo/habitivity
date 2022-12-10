import {TaskType1, TaskType2, TaskType3, TaskType4, TaskType5, TaskType6} from "../../../../assets/svg";
import {TaskTypeForTTSelector} from "./TaskTypeItem";
import {TaskType} from "../../../../types/Tasks";

export const taskTypesWithDescription: TaskTypeForTTSelector[] = [
    {
        id: TaskType.DURATION,
        svg: TaskType1,
        title: 'Duration',
        description: 'Get points based on duration spent doing the task',
        examples: [
            'get 1 point for every 15 minutes of exercising',
            'lose 2 points for every 30 browsing social media'
        ],
    },
    {
        id: TaskType.CHECKBOX,
        svg: TaskType2,
        title: 'Done / not done',
        description: 'Get points after you complete the task',
        examples: [
            'get 3 points for completing your daily sudoku!',
            'get 5 points for cooking lunch for next day'
        ],
    },
    {
        id: TaskType.TIME,
        svg: TaskType3,
        title: 'Time',
        description: 'Get points based on WHEN you complete the task',
        examples: [
            'get 1 point when you wake up at 7:00 ',
            'lose 2 points when you wake up after 9:00'
        ],
    },
    {
        id: TaskType.UNITS,
        svg: TaskType4,
        title: 'Points per unit',
        description: 'Get fixed amount of points per unit',
        examples: [
            'get 1 point for every 10 pages you read',
            'get 2 points for every sudoku you solve'
        ],
    },
    {
        id: TaskType.UNIT_CHECKPOINTS,
        svg: TaskType5,
        title: 'Points per unit (v2)',
        description: 'Get flexible amount of points per unit (done through checkpoints)',
        examples: [
            '-3 points for 0 pages',
            '0 points for 5 pages',
            '3 points for 10 pages',
            '6 points for 20 pages and more (6 is maximum)'
        ],
    },
    {
        id: TaskType.OPTIONS,
        svg: TaskType6,
        title: 'Option select',
        description: 'Get fixed amount of points based on what option you choose',
        examples: [
            'asd',
            'des'
        ],
    },
];

