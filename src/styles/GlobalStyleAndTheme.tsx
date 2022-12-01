import React, {ReactNode} from "react";
import {createGlobalStyle, css, DefaultTheme, ThemeProvider} from 'styled-components';
import {TopMenuNavLink} from "../components/menu/MenuTop/MenuTopComponents";
import {COLORS} from "./CustomStyles";


export let REM_SIZE = 24; //in pixels

/* rest of the sizes are in REM */
export const SIDER_COLLAPSED_SIZE = 3;
export const LEFT_MENU_WIDTH = 13;
export const RIGHT_DRAWER_WIDTH = 13;
export const TOP_MENU_SMALL = 3;
export const TOP_MENU_BIG = 4;

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 100%;
  }  
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", Helvetica, Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat',  -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 600;
  }

  ul.ant-menu > li.ant-menu-item[role="menuitem"] {
    padding: 0.25rem calc(.5rem - 1px) 0.25rem .5rem !important;
    margin: 0;
  }
  
  li.ant-menu-item .ant-menu-item-icon + span:empty {
    margin-left: 0;
  }

  div.ant-menu-submenu.ant-menu-submenu-popup ul {
    transform: translateX(0rem) translateY(-.7rem);
    border-radius: 0 0 .5rem .5rem ;
    
    li {
      &:hover {
        background-color: ${COLORS.BLUE_DARK}; //#001529
      }

      ${TopMenuNavLink} {
        border-radius: 0;
        margin: 0;

        &:hover {
          background-color: transparent;
        }

        a {
          color: ${COLORS.BLUE_LIGHT};
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
        primary: COLORS.PRIMARY,
        secondary: COLORS.PRIMARY,
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