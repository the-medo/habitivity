import { ExampleType } from '../ExampleBox';
import { countableString, pointCountable } from '../../../../helpers/unitSyntaxHelpers';

export const examplesCheckbox = (taskName = 'Task name', pointCount: string): ExampleType[] => {
  const baseExampleKey = `ucfp-${taskName}-pc-${pointCount}`;
  const examples: ExampleType[] = [];
  if (pointCount) {
    examples.push({
      key: `1-${baseExampleKey}`,
      example: `Complete "${taskName}" to get ${
        pointCount !== '' ? pointCount : 'X'
      } ${countableString(pointCount, pointCountable)}`,
    });
    examples.push({
      key: `2-not-losing-points`,
      example: `You don't lose any points for not completing this task`,
    });
  } else {
    examples.push({
      key: `no-examples`,
      example: `Examples of your setup will be shown here after filling the form.`,
    });
  }
  return examples;
};
