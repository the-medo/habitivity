export const dayPieGraphLegends = [
  {
    anchor: 'bottom' as const,
    direction: 'row' as const,
    toggleSerie: true,
    translateY: 56,
    itemWidth: 100,
    itemHeight: 18,
    itemTextColor: '#999',
    symbolSize: 18,
    symbolShape: 'circle' as const,
    effects: [
      {
        on: 'hover' as const,
        style: {
          itemTextColor: '#000',
        },
      },
    ],
  },
];
