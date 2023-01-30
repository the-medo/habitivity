import styled from 'styled-components';
import arrow from '../../assets/svg/arrow-rectangle.svg';

export const ArrowDiv = styled.div<{ $height?: number }>`
  height: ${p => p.$height ?? 6}rem;
  width: ${p => (p.$height ?? 6) * 1.09}rem;
  background: url(${arrow}) no-repeat center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem 1rem 0.5rem;
`;
