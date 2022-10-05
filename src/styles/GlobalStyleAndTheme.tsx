import React, {ReactNode} from "react";
import {createGlobalStyle, css, ThemeProvider} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
  }

  li.ant-menu-item .ant-menu-item-icon + span:empty {
    margin-left: 0;
  }
`

export const SLIDER_COLLAPSED_WIDTH = 50;
export const SLIDER_WIDTH = 206;

interface GlobalStyleAndThemeProps {
    children?: ReactNode
}

export const withScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const GlobalStyleAndTheme: React.FC<GlobalStyleAndThemeProps> = ({children}) => {
    return (
        <ThemeProvider theme={{ fontFamily: 'Helvetica Neue' }}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}

export default GlobalStyleAndTheme;