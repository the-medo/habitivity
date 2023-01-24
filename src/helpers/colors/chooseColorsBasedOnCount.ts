import { getGeneratedColors } from './generateColor';

const chosenColors: Record<string, string[] | undefined> = {};

export const chooseColorsBasedOnCount = (baseColor: string, count: number): string[] => {
  const cacheKey = `${baseColor}x${count}`;
  if (chosenColors[cacheKey] !== undefined) return chosenColors[cacheKey] ?? [];

  const colors = getGeneratedColors(baseColor);

  const start = Math.max(5 - count, 0);
  const end = start + count;

  chosenColors[cacheKey] = colors.slice(start, end);
  if (end > 9) for (let i = 10; i < end; i++) chosenColors[cacheKey]?.push(colors[9]);

  return chosenColors[cacheKey] ?? [];
};
