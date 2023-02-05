import { CompletedDay } from '../types/CompletedDay';

export const getValueFromDay = (
  data: false | CompletedDay | undefined,
  selectedTaskListId: string,
  taskGroup: string,
  task: string,
  takeUnits: boolean,
): number => {
  let val;
  if (taskGroup === 'all') {
    val = data ? data.taskLists[selectedTaskListId] ?? 0 : 0;
  } else {
    if (task === 'all') {
      val = data ? data.taskGroups[taskGroup] ?? 0 : 0;
    } else {
      val = data ? (takeUnits ? data.tasks[task]?.value : data.tasks[task]?.points) ?? 0 : 0;
    }
  }

  return val;
};
