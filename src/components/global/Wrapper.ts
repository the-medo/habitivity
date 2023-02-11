import styled from 'styled-components';
import { CSSProperties } from 'react';

interface WrapperProps {
  $gap?: CSSProperties['gap'];
  $basis?: CSSProperties['flexBasis'];
  $grow?: CSSProperties['flexGrow'];
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  gap: ${p => p.$gap ?? '0.5rem'};
  flex-basis: ${p => p.$basis ?? 'initial'};
  flex-grow: ${p => p.$grow ?? '0'};
`;

export const WrapperColumn = styled(Wrapper)`
  flex-direction: column;
`;
