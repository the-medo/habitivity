import { ExampleType } from '../ExampleBox';
import { dayjsToMinutes } from '../../../../helpers/date/dayjsToMinutes';
import { TimeCheckpoint } from '../TaskCreateTime';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';

const getInterval = (timeDiff: number): number => {
  if (timeDiff > 60) return 60;
  if (timeDiff > 15) return 15;
  if (timeDiff > 5) return 5;
  return 1;
};

export const examplesTime = (checkpoints: TimeCheckpoint[] | undefined): ExampleType[] => {
  const examples: ExampleType[] = [];
  const fullData: {
    pointCount: number;
    time: number;
    timeFormatted: string;
  }[] = [];

  if (checkpoints) {
    checkpoints.forEach(c => {
      if (c.time && c.pointCount) {
        fullData.push({
          pointCount: parseFloat(c.pointCount),
          time: dayjsToMinutes(c.time),
          timeFormatted: c.time.format('HH:mm'),
        });
      }
    });

    fullData.sort((a, b) => (a.time < b.time ? -1 : 1));

    if (fullData.length > 0) {
      examples.push({
        key: `1-time-${fullData[0].timeFormatted}-and-earlier`,
        example: `${fullData[0].timeFormatted} and earlier: ${fullData[0].pointCount.toFixed(
          2,
        )} ${countableString(fullData[0].pointCount, pointCountable)}`,
      });

      if (fullData.length > 1) {
        for (let i = 1; i < fullData.length; i++) {
          const timeDiff = fullData[i].time - fullData[i - 1].time;
          const pointDiff = fullData[i].pointCount - fullData[i - 1].pointCount;
          const interval = getInterval(timeDiff);
          const intervalCount = timeDiff / interval;
          if (intervalCount > 1) {
            examples.push({
              key: `2-i-${interval}-${fullData[i].timeFormatted}-${pointDiff}-${timeDiff}`,
              example: `${fullData[i - 1].timeFormatted} - ${
                fullData[i].timeFormatted
              }:  each ${interval} minutes give you ${((pointDiff / timeDiff) * interval).toFixed(
                2,
              )} ${countableString((pointDiff / timeDiff) * interval, pointCountable)}`,
            });
            if (i < fullData.length - 1) {
              examples.push({
                key: `3-time-${fullData[i].timeFormatted}-pd-${fullData[i].pointCount}`,
                example: `${fullData[i].timeFormatted}: ${fullData[i].pointCount.toFixed(
                  2,
                )} ${countableString(fullData[i].pointCount, pointCountable)}`,
              });
            }
          }
        }
      }

      examples.push({
        key: `Key`,
        example: `${fullData[fullData.length - 1].timeFormatted} and later: ${fullData[
          fullData.length - 1
        ].pointCount.toFixed(2)} ${countableString(
          fullData[fullData.length - 1].pointCount,
          pointCountable,
        )}`,
      });
    }
  } else {
    examples.push({
      key: `no-examples`,
      example: `Examples of your setup will be shown here after filling the form.`,
    });
  }
  return examples;
};
