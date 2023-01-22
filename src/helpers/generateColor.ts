import { generate } from '@ant-design/colors';

const generatedColors: Record<string, string[] | undefined> = {};

export const generateColor = (c?: string, step = 5): string => {
  if (!c) c = '#1da57a';

  c = c.replace('#', '');

  if (!generatedColors[c]) {
    generatedColors[c] = generate(c);
  }

  if (step > 9) step = 9;
  else if (step < 0) step = 0;

  return generatedColors[c]?.[step] ?? 'error';
};
