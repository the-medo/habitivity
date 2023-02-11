import { CSSProperties } from 'react';
import styled from 'styled-components';

interface RowGapProps {
  $gap?: CSSProperties['gap'];
}

export const RowGap = styled.div<RowGapProps>`
  display: flex;
  gap: ${p => p.$gap ?? '0.5rem'};
`;

export const RowGapCentered = styled(RowGap)`
  align-items: center;
`;

export const RowGapWrap = styled(RowGap)`
  flex-wrap: wrap;
`;
