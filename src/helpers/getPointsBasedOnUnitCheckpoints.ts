import { UnitCheckpoint } from '../types/Tasks';

export const getPointsBasedOnUnitCheckpoints = (
  checkpoints: UnitCheckpoint[],
  value: number,
): number => {
  const sorted: UnitCheckpoint[] = [...checkpoints].sort((a, b) => a.unitCount - b.unitCount);

  let lowerCheckpoint: UnitCheckpoint | undefined = undefined;
  let higherCheckpoint: UnitCheckpoint | undefined = undefined;

  if (value <= sorted[0].unitCount) return sorted[0].points;
  if (value >= sorted[sorted.length - 1].unitCount) return sorted[sorted.length - 1].points;

  for (let i = 1; i < sorted.length; i++) {
    if (value >= sorted[i - 1].unitCount && value <= sorted[i].unitCount) {
      lowerCheckpoint = sorted[i - 1];
      higherCheckpoint = sorted[i];
      break;
    }
  }

  if (lowerCheckpoint && higherCheckpoint) {
    if (lowerCheckpoint.unitCount === value) return lowerCheckpoint.points;
    if (higherCheckpoint.unitCount === value) return higherCheckpoint.points;

    const pointsPerUnitAboveLimit =
      (higherCheckpoint.points - lowerCheckpoint.points) /
      (higherCheckpoint.unitCount - lowerCheckpoint.unitCount);
    return (value - lowerCheckpoint.unitCount) * pointsPerUnitAboveLimit + lowerCheckpoint.points;
  }

  return 0;
};
