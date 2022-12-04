import styled from "styled-components";
import {
    withScrollbar
} from "../../../styles/GlobalStyleAndTheme";
import { Layout, Menu } from 'antd';
import React from "react";
import {
    COLORS,
    LEFT_MENU_WIDTH,
    SIDER_COLLAPSED_SIZE,
    TOP_MENU_BIG,
    TOP_MENU_SMALL
} from "../../../styles/CustomStyles";
const { Sider, } = Layout;

export const LeftMenu = styled(Menu)`
  padding-top: .25rem;
  background-color: transparent;
  
  & > li.ant-menu-item[role="menuitem"] { /* left menu, otherwise could be:  "aside ul.ant-menu" */
    padding: 0 calc(.5rem - 1px) 0 .5rem !important;
    margin: 0 0 .5rem;
    width: 100%;

    &:hover {
      background-color: transparent !important;
    }
  }
`;

export interface MenuLeftProps {
    $isCollapsed: boolean;
    $isAutomaticallyCollapsed: boolean;
    isManuallyCollapsed: boolean;
}

export const LeftSider = styled(Sider)<Pick<MenuLeftProps, '$isAutomaticallyCollapsed' | '$isCollapsed'>>`
  overflow-y: auto;
  height: calc(
            100vh
            - ${({$isCollapsed}) => $isCollapsed ?  TOP_MENU_SMALL : TOP_MENU_BIG}rem
            ${({$isAutomaticallyCollapsed}) => !$isAutomaticallyCollapsed  && ` - ${SIDER_COLLAPSED_SIZE}rem`}
  );
  position: fixed !important;
  left: 0;
  top: ${({$isCollapsed}) => $isCollapsed ?  TOP_MENU_SMALL : TOP_MENU_BIG}rem;
  bottom: ${SIDER_COLLAPSED_SIZE}rem;
  background-color: ${COLORS.GREY_LIGHT} !important;
  
  ${withScrollbar}
`;

export const MenuCollapsor = styled.div<Pick<MenuLeftProps, '$isCollapsed'>>`
  width: ${({$isCollapsed}) => $isCollapsed ? SIDER_COLLAPSED_SIZE : LEFT_MENU_WIDTH}rem;
  height: ${SIDER_COLLAPSED_SIZE}rem;
  transition: .3s all;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-right: .5rem;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${COLORS.GREY_LIGHT};
  border-right: 1px solid ${COLORS.GREY_BORDER};
  
  & > span > svg {
    transition: .3s all;
  }
`
