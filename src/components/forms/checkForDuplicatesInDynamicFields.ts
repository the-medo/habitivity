import { TimeCheckpoint } from '../../screens/NewTask/TaskType/TaskCreateTime';
import { OptionCheckpoint } from '../../screens/NewTask/TaskType/TaskCreateOptions';
import { UnitCheckpoint } from '../../screens/NewTask/TaskType/TaskCreateUnitCheckpoints';

export enum DuplicateCheck {
  OPTION,
  TIME,
  UNIT_CHECKPOINT,
}

export interface DuplicateCheckOption {
  type: DuplicateCheck.OPTION;
  value: OptionCheckpoint[] | undefined;
}

export interface DuplicateCheckTime {
  type: DuplicateCheck.TIME;
  value: TimeCheckpoint[] | undefined;
}

export interface DuplicateCheckUnitCheckpoint {
  type: DuplicateCheck.UNIT_CHECKPOINT;
  value: UnitCheckpoint[] | undefined;
}

export function checkForDuplicatesInDynamicFields({
  type,
  value,
}: DuplicateCheckOption | DuplicateCheckTime | DuplicateCheckUnitCheckpoint): boolean {
  let hasDuplicates = false;
  if (value) {
    const allFieldValues: string[] = [];

    switch (type) {
      case DuplicateCheck.OPTION:
        value.forEach(o => o?.option && allFieldValues.push(o.option));
        break;
      case DuplicateCheck.UNIT_CHECKPOINT:
        value.forEach(o => o?.unitCountForPoint && allFieldValues.push(o.unitCountForPoint));
        break;
      case DuplicateCheck.TIME:
        value.forEach(o => o?.time && allFieldValues.push(o.time.format('HH:mm')));
        break;
    }

    const uniqueFieldValues = new Set(allFieldValues);
    if (uniqueFieldValues.size !== allFieldValues.length) hasDuplicates = true;
  }
  return hasDuplicates;
}
