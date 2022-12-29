import { defaultUnitSyntax } from '../hooks/useCustomUnitForm';

export interface UnitSyntax {
  zero: string; //units   seconds
  one: string; //unit    second
  twoAndMore: string; //units   seconds
}

export const generateBasicCountables = (unit: string): UnitSyntax => {
  return {
    zero: unit + 's',
    one: unit,
    twoAndMore: unit + 's',
  };
};

export const pointCountable: UnitSyntax = generateBasicCountables('point');

export const countableString = (
  count: number | string | undefined,
  unitSyntax: UnitSyntax | undefined,
): string => {
  if (!unitSyntax) unitSyntax = defaultUnitSyntax;
  if (count === undefined) count = 0;

  if (typeof count === 'string') {
    count = parseInt(count);
  }

  if (count === 0) {
    return unitSyntax.zero;
  }

  if (count === 1 || count === -1) {
    return unitSyntax.one;
  }

  return unitSyntax.twoAndMore;
};
