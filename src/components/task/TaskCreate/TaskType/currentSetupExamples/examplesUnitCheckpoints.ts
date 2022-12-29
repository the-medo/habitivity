import {
  countableString,
  pointCountable,
  UnitSyntax,
} from '../../../../../helpers/unitSyntaxHelpers';
import { ExampleType } from '../ExampleBox';
import { UnitCheckpoint } from '../TaskCreateUnitCheckpoints';

export const examplesUnitCheckpoint = (
  checkpoints: UnitCheckpoint[],
  units: UnitSyntax,
): ExampleType[] => {
  const examples: ExampleType[] = [];

  const fullData: {
    pointCount: number;
    unitCountForPoint: number;
  }[] = [];

  if (checkpoints.length > 0) {
    checkpoints.forEach(c => {
      if (c.pointCount && c.unitCountForPoint) {
        fullData.push({
          pointCount: parseFloat(c.pointCount),
          unitCountForPoint: parseFloat(c.unitCountForPoint),
        });
      }
    });
  }

  fullData.sort((a, b) => (a.unitCountForPoint < b.unitCountForPoint ? -1 : 1));

  if (fullData.length > 0) {
    examples.push({
      key: `1-time-${fullData[0].unitCountForPoint}-${fullData[0].pointCount}-and-less`,
      example: `${fullData[0].unitCountForPoint.toFixed(2)} ${countableString(
        fullData[0].unitCountForPoint,
        units,
      )} and less: ${fullData[0].pointCount.toFixed(2)} ${countableString(
        fullData[0].pointCount,
        pointCountable,
      )}`,
    });

    if (fullData.length > 1) {
      for (let i = 1; i < fullData.length; i++) {
        const unitCountForPointDiff =
          fullData[i].unitCountForPoint - fullData[i - 1].unitCountForPoint;
        const pointCountDiff = fullData[i].pointCount - fullData[i - 1].pointCount;
        const oneUnitDiff = pointCountDiff / unitCountForPointDiff;

        if (unitCountForPointDiff > 1) {
          examples.push({
            key: `2-${fullData[i].unitCountForPoint}-${unitCountForPointDiff}-${pointCountDiff}-each-unit`,
            example: `${fullData[i - 1].unitCountForPoint.toFixed(2)} - ${fullData[
              i
            ].unitCountForPoint.toFixed(2)}: each ${countableString(
              1,
              units,
            )} gives you ${oneUnitDiff.toFixed(2)} ${countableString(oneUnitDiff, pointCountable)}`,
          });
        }

        if (i < fullData.length - 1) {
          examples.push({
            key: `2-${fullData[i].unitCountForPoint}-${pointCountDiff}`,
            example: `For ${fullData[i].unitCountForPoint.toFixed(2)} ${countableString(
              fullData[i].unitCountForPoint,
              units,
            )} get ${fullData[i].pointCount.toFixed(2)} ${countableString(
              fullData[i].pointCount,
              pointCountable,
            )}`,
          });
        }
      }
    }

    examples.push({
      key: `99-time-${fullData[fullData.length - 1].unitCountForPoint}-${
        fullData[fullData.length - 1].pointCount
      }-and-more`,
      example: `${fullData[fullData.length - 1].unitCountForPoint.toFixed(2)} ${countableString(
        fullData[fullData.length - 1].unitCountForPoint,
        units,
      )} and more: ${fullData[fullData.length - 1].pointCount.toFixed(2)} ${countableString(
        fullData[fullData.length - 1].pointCount,
        pointCountable,
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
