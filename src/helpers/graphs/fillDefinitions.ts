import { ArrayElement } from '../types/ArrayElement';
import { SvgDefsAndFill } from '@nivo/core';
import { ComputedDatum } from '@nivo/pie';

export enum GraphFill {
  DOTS = 'dots',
  LINES = 'lines',
}

export const createFillMatch = <T>(
  id: string,
  type: GraphFill = GraphFill.DOTS,
): ArrayElement<NonNullable<SvgDefsAndFill<ComputedDatum<T>>['fill']>> => ({
  match: { id },
  id: type,
});

export const fillDefinitions = [
  {
    id: GraphFill.DOTS,
    type: 'patternDots',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.3)',
    size: 4,
    padding: 1,
    stagger: true,
  },
  {
    id: GraphFill.LINES,
    type: 'patternLines',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.3)',
    rotation: -45,
    lineWidth: 6,
    spacing: 10,
  },
];
