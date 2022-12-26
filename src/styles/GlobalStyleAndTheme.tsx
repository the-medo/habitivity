import React, { ReactNode, useMemo } from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { TopMenuNavLink } from '../components/menu/MenuTop/MenuTopComponents';
import { COLORS, STYLE } from './CustomStyles';
import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", Helvetica, Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type='number'] {
    appearance: textfield;
  }

  // ============= submenu of collapsed top menu in case of small viewport width ============= 
  ul.ant-menu.ant-menu-sub.ant-menu-vertical {
    margin-bottom: 0;
  }

  div.ant-menu-submenu.ant-menu-submenu-popup ul.ant-menu {
    background-color: ${COLORS.BLUE_DARK};
    
    li.ant-menu-item {
      background-color: ${COLORS.BLUE_DARK};
      padding-inline: 0;
      
      &:hover {
         background-color: ${COLORS.BLUE_GREY_DARK}; //#001529
      }

      ${TopMenuNavLink} {
        border-radius: 0;
        margin: 0;
        color: ${COLORS.BLUE_LIGHT};
      }
    }
  }

  // ============= ============= ============= ============= ============= ============= ============= 

`;

interface GlobalStyleAndThemeProps {
  children?: ReactNode;
}

export const withScrollbar = css`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  /* Track */

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
  }

  /* Handle on hover */

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`.toString();

const GlobalStyleAndTheme: React.FC<GlobalStyleAndThemeProps> = ({ children }) => {
  const theme: ConfigProviderProps['theme'] = useMemo(
    () => ({
      token: {
        colorPrimary: STYLE.PRIMARY_COLOR,
        colorTextHeading: STYLE.HEADING_COLOR,
      },
    }),
    [],
  );

  return (
    <ConfigProvider theme={theme}>
      <GlobalStyle to="/" />
      {children}
    </ConfigProvider>
  );
};

export default GlobalStyleAndTheme;
