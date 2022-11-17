import React, {ReactNode} from "react";
import {createGlobalStyle, css, DefaultTheme, ThemeProvider} from 'styled-components';
import {SVG_COLOR_SECONDARY} from "../assets/svg/Svg";
import {TopMenuItem} from "../components/menu/MenuTopComponents";


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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", Helvetica, Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";;
  }

  li.ant-menu-item .ant-menu-item-icon + span:empty {
    margin-left: 0;
  }

  div.ant-menu-submenu.ant-menu-submenu-popup ul {
    transform: translateX(0rem) translateY(-.7rem);
    border-radius: 0 0 .5rem .5rem ;
    
    li {
      &:hover {
        background-color: ${SVG_COLOR_SECONDARY}; //#001529
      }

      ${TopMenuItem} {
        border-radius: 0;
        margin: 0;

        &:hover {
          background-color: transparent;
        }

        a {
          color: #cdd9ee;
        }
      }

    }
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

const theme: DefaultTheme = {
    fontFamily: 'Helvetica Neue',
    colors: {
        primary: '#1DA57A',
        secondary: '#1DA57A',
    },
}

const GlobalStyleAndTheme: React.FC<GlobalStyleAndThemeProps> = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}

export default GlobalStyleAndTheme;