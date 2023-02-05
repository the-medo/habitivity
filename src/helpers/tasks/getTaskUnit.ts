import { Task, TaskType } from '../../types/Tasks';
import { capitalizeFirstLetter } from '../capitalizeFirstLetter';

export const getTaskUnit = (taskDefinition: Task): string => {
  switch (taskDefinition.taskType) {
    case TaskType.TIME:
      return 'Time';
    case TaskType.CHECKBOX:
      return 'Completion';
    case TaskType.OPTIONS:
      return 'Points';
    default:
      return capitalizeFirstLetter(taskDefinition.taskUnits.twoAndMore);
  }
};
