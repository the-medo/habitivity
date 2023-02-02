import React from 'react';
import { LineProps, PointSymbolProps } from '@nivo/line';

const CustomSymbol = ({
  size,
  color,
  borderWidth,
  borderColor,
}: Readonly<PointSymbolProps>): React.ReactNode => (
  <g>
    <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
);

export const lineGraphCustomPointProps: Partial<LineProps> = {
  pointBorderColor: {
    from: 'color',
    modifiers: [['darker', 0.3]],
  },
  pointSymbol: CustomSymbol,
  pointSize: 10,
  pointBorderWidth: 1,
};
