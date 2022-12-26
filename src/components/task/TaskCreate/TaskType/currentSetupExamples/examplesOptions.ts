import { ExampleType } from '../ExampleBox';
import { OptionCheckpoint } from '../TaskCreateOptions';
import { countableString, pointCountable } from '../../../../../helpers/unitSyntaxHelpers';

export const examplesOptions = (options: OptionCheckpoint[]): ExampleType[] => {
  let examples: ExampleType[] = [];

  if (options) {
    options.forEach(o => {
      if (o && o.pointCount && o.option) {
        examples.push({
          key: `o-${o.pointCount}-${o.option}`,
          example: `${o.pointCount} ${countableString(o.pointCount, pointCountable)} for "${
            o.option
          }"`,
        });
      }
    });
  }

  if (examples.length === 0) {
    examples.push({
      key: `no-examples`,
      example: `Examples of your setup will be shown here after filling the form.`,
    });
  }

  return examples;
};
