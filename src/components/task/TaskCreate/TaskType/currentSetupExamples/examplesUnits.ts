import {
  countableString,
  pointCountable,
  UnitSyntax,
} from '../../../../../helpers/unitSyntaxHelpers';
import { ExampleType } from '../ExampleBox';

export const examplesUnits = (
  unitCountForPoint: number | undefined,
  pointCount: number | undefined,
  units: UnitSyntax,
): ExampleType[] => {
  const examples: ExampleType[] = [];
  if (unitCountForPoint && pointCount) {
    const baseExampleKey = `UCFP-${unitCountForPoint}-pc-${pointCount}-u-${units.zero}-${units.one}-${units.twoAndMore}`;
    const onePointUnitCount = unitCountForPoint / pointCount; // 3 points for 30 units = 30 / 3 = 1 point = 10 units
    const oneUnitPointCount = pointCount / unitCountForPoint; // 3 points for 30 units = 3 / 30 = 1 unit = 0.1 points
    const tenOrHundredUnits = unitCountForPoint >= 10 ? 100 : 10;
    const tenOrHundredUnitPoints = tenOrHundredUnits * oneUnitPointCount;

    if (unitCountForPoint !== 1) {
      examples.push({
        key: `5-${baseExampleKey}`,
        example: `Get ${oneUnitPointCount.toFixed(2)} ${countableString(
          pointCount,
          pointCountable,
        )} for 1.00 ${countableString(1, units)}`,
      });
    }
    examples.push({
      key: `1-${baseExampleKey}`,
      example: `Get 1.00 point for ${onePointUnitCount.toFixed(2)} ${countableString(
        onePointUnitCount,
        units,
      )}`,
    });
    if (pointCount !== 1) {
      examples.push({
        key: `2-${baseExampleKey}`,
        example: `Get ${pointCount.toFixed(2)} ${countableString(
          pointCount,
          pointCountable,
        )} for ${unitCountForPoint.toFixed(2)} ${countableString(unitCountForPoint, units)}`,
      });
    }
    examples.push({
      key: `3-${baseExampleKey}`,
      example: `Get ${tenOrHundredUnitPoints.toFixed(2)} ${countableString(
        tenOrHundredUnitPoints,
        pointCountable,
      )} for ${tenOrHundredUnits.toFixed(2)} ${countableString(tenOrHundredUnits, units)}`,
    });
    examples.push({
      key: `4-${baseExampleKey}`,
      example: `Get ${(tenOrHundredUnitPoints * 2).toFixed(2)} ${countableString(
        tenOrHundredUnitPoints * 2,
        pointCountable,
      )} for ${(tenOrHundredUnits * 2).toFixed(2)} ${countableString(
        tenOrHundredUnits * 2,
        units,
      )}`,
    });
  } else {
    examples.push({
      key: `no-examples`,
      example: `Examples of your setup will be shown here after filling the form.`,
    });
  }
  return examples;
};
