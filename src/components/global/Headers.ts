import styled, { css } from 'styled-components';

interface HeaderProps {
  $marginTop?: number;
}

const headerFontMixin = css`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
`;

const marginMixin = css<HeaderProps>`
  margin-top: ${({ $marginTop }) => $marginTop ?? 0}rem;
  margin-bottom: 1rem;
`;

export const Header1 = styled.h1<HeaderProps>`
  ${marginMixin};
  ${headerFontMixin};
  font-size: 2rem;
`;

export const Header2 = styled.h2<HeaderProps>`
  ${marginMixin};
  ${headerFontMixin};
`;

export const Header5 = styled.span<HeaderProps>`
  ${marginMixin};
  font-size: 1.13em;
  font-weight: 500;
`;
