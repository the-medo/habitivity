import { Task, TaskType } from '../../types/Tasks';
import { countableString } from '../unitSyntaxHelpers';
import { minutesToDayjs } from '../date/minutesToDayjs';

export const formatUnits = (task: Task, p: number | undefined): string => {
  let num = '-';

  if (p !== undefined) {
    const fixed2points = p * 100 - Math.floor(p) * 100;

    let digitCount = fixed2points % 10 !== 0 ? 2 : 0;
    if (digitCount === 0) digitCount = fixed2points > 9 ? 1 : 0;

    if (p >= 100) num = p.toFixed(Math.min(0, digitCount));
    else if (p >= 10) num = p.toFixed(Math.min(1, digitCount));
    else num = p.toFixed(Math.min(2, digitCount));
  }

  switch (task.taskType) {
    case TaskType.DURATION:
      return `${num} ${countableString(p, task.taskUnits)}`;
    case TaskType.CHECKBOX:
      return p === 1 ? `Done` : `Not done`;
    case TaskType.TIME:
      return p ? minutesToDayjs(p).format('HH:mm') : '-';
    case TaskType.UNITS:
      return `${num} ${countableString(p, task.taskUnits)}`;
    case TaskType.UNIT_CHECKPOINTS:
      return `${num} ${countableString(p, task.taskUnits)}`;
    case TaskType.OPTIONS:
      return p !== undefined
        ? task.taskCheckpoints.find(c => c.optionId === p)?.option ?? '-'
        : '-';
  }
};
