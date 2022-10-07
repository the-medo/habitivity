import React, {ReactNode} from "react";
import {createGlobalStyle, css, ThemeProvider} from 'styled-components';


export let REM_SIZE = 24; //in pixels

/* rest of the sizes are in REM */
export const SIDER_COLLAPSED_SIZE = 3;
export const LEFT_MENU_WIDTH = 13;
export const RIGHT_DRAWER_WIDTH = 13;
export const TOP_MENU_SMALL = 3;
export const TOP_MENU_BIG = 4;

const GlobalStyle = createGlobalStyle`
  :root {
    //font-size: ${REM_SIZE}px;
    font-size: 100%;
  }
  
  html {
    --ant-primary-color: red;
  }

  li.ant-menu-item .ant-menu-item-icon + span:empty {
    margin-left: 0;
  }
`


interface GlobalStyleAndThemeProps {
    children?: ReactNode
}

export const withScrollbar = css`
  &::-webkit-scrollbar {
    width: .5rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: .5rem;
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