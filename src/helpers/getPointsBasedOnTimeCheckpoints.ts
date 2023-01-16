import { TimeCheckpoint, UnitCheckpoint } from '../types/Tasks';
import { hhmmToMinutes } from './hhmmToMinutes';
import { getPointsBasedOnUnitCheckpoints } from './getPointsBasedOnUnitCheckpoints';

export const getPointsBasedOnTimeCheckpoints = (
  checkpoints: TimeCheckpoint[],
  value: number,
): number => {
  const unitCheckpoints: UnitCheckpoint[] = checkpoints.map(x => ({
    points: x.points,
    unitCount: hhmmToMinutes(x.time),
  }));

  console.log(unitCheckpoints);
  return getPointsBasedOnUnitCheckpoints(unitCheckpoints, value);
};
