import { Position } from './types/Position';
import React from 'react';

export const computeOffsetsAfterClick = (
  e: React.MouseEvent,
  width: number,
  height: number,
): Position => ({
  x: e.clientX + width > window.innerWidth ? e.clientX - width : e.clientX,
  y: e.clientY + height > window.innerHeight ? e.clientY - height : e.clientY,
});
