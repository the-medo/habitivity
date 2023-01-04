import {
  durationUnitsSyntax,
  TaskShared,
  TaskType,
  TTCheckbox,
  TTDuration,
  TTOptions,
  TTTime,
  TTUnitCheckpoints,
  TTUnits,
} from '../../../types/Tasks';
import { FormTaskCheckbox } from './TaskCreateCheckbox';
import { FormTaskDuration } from './TaskCreateDuration';
import { FormTaskOptions } from './TaskCreateOptions';
import { FormTaskTime } from './TaskCreateTime';
import { FormTaskUnitCheckpoints } from './TaskCreateUnitCheckpoints';
import { FormTaskUnits } from './TaskCreateUnits';
import { UnitSyntax } from '../../../helpers/unitSyntaxHelpers';

export interface TTCheckboxWithFormFields {
  taskType: TaskType.CHECKBOX;
  fields: FormTaskCheckbox;
  units?: undefined;
  rt?: TTCheckbox;
}

export interface TTDurationWithFormFields {
  taskType: TaskType.DURATION;
  fields: FormTaskDuration;
  units?: undefined;
  rt?: TTDuration;
}

export interface TTOptionsWithFormFields {
  taskType: TaskType.OPTIONS;
  fields: FormTaskOptions;
  units?: undefined;
  rt?: TTOptions;
}

export interface TTTimeWithFormFields {
  taskType: TaskType.TIME;
  fields: FormTaskTime;
  units?: undefined;
  rt?: TTTime;
}

export interface TTUnitCheckpointsWithFormFields {
  taskType: TaskType.UNIT_CHECKPOINTS;
  fields: FormTaskUnitCheckpoints;
  units: UnitSyntax;
  rt?: TTUnitCheckpoints;
}

export interface TTUnitsWithFormFields {
  taskType: TaskType.UNITS;
  fields: FormTaskUnits;
  units: UnitSyntax;
  rt?: TTUnits;
}

type TaskTypeWithFormFields =
  | TTCheckboxWithFormFields
  | TTDurationWithFormFields
  | TTOptionsWithFormFields
  | TTTimeWithFormFields
  | TTUnitCheckpointsWithFormFields
  | TTUnitsWithFormFields;

export function parseFormFieldsToTask<T extends TaskTypeWithFormFields>(
  sharedProps: TaskShared,
  taskTypeWithFields: T,
): T['rt'] {
  const { taskType, fields, units: taskUnits } = taskTypeWithFields;

  const taskModifiers = {
    percentageModifier: fields.modifierPercentage,
    dayModifier: [],
  };

  const taskName = fields.taskName;

  switch (taskType) {
    case TaskType.CHECKBOX:
      return {
        ...sharedProps,
        taskType,
        taskName,
        taskModifiers,
        taskPoints: Number(fields.pointCount),
      };
    case TaskType.DURATION:
      return {
        ...sharedProps,
        taskType,
        taskName,
        taskModifiers,
        taskUnits: durationUnitsSyntax[fields.units], //from DurationUnitsSyntax
        taskUnitCount: Number(fields.unitCountForPoint),
        taskPoints: Number(fields.pointCount),
      };
    case TaskType.OPTIONS:
      return {
        ...sharedProps,
        taskType,
        taskName,
        taskModifiers,
        taskCheckpoints: fields.options.map((option, i) => ({
          optionId: i,
          option: option.option ?? '',
          points: Number(option.pointCount),
        })),
      };
    case TaskType.TIME:
      return {
        ...sharedProps,
        taskType,
        taskName,
        taskModifiers,
        taskCheckpoints: fields.checkpoints.map(checkpoint => ({
          time: checkpoint.time?.format('HH:mm') ?? '00:00',
          points: Number(checkpoint.pointCount),
        })),
      };
    case TaskType.UNIT_CHECKPOINTS:
      return {
        ...sharedProps,
        taskType,
        taskName,
        taskUnits,
        taskModifiers,
        taskCheckpoints: fields.checkpoints.map(checkpoint => ({
          unitCount: Number(checkpoint.unitCountForPoint),
          points: Number(checkpoint.pointCount),
        })),
      };
    case TaskType.UNITS:
      return {
        ...sharedProps,
        taskType,
        taskName,
        taskUnits,
        taskModifiers,
        taskUnitCount: Number(fields.unitCountForPoint),
        taskPoints: Number(fields.pointCount),
      };
  }
}
