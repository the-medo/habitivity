import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {MenuLeftItem} from "./MenuLeft";
import {
    LEFT_MENU_WIDTH,
    SIDER_COLLAPSED_SIZE,
    TOP_MENU_BIG,
    TOP_MENU_SMALL,
    withScrollbar
} from "../../../styles/GlobalStyleAndTheme";
import { Layout, Menu } from 'antd';
import {icons, IconType} from "../../icons/icons";
import React from "react";
import {useSlider} from "../../../hooks/useSlider";
const { Sider, } = Layout;

export const LeftMenu = styled(Menu)`
  padding-top: .25rem;
`;




export interface MenuLeftProps {
    $isCollapsed: boolean;
    $isAutomaticallyCollapsed: boolean;
    isManuallyCollapsed: boolean;
}

export const LeftSider = styled(Sider)<Pick<MenuLeftProps, '$isAutomaticallyCollapsed' | '$isCollapsed'>>`
  background: #fff;
  overflow-y: auto;
  height: calc(
            100vh
            - ${({$isCollapsed}) => $isCollapsed ?  TOP_MENU_SMALL : TOP_MENU_BIG}rem
            ${({$isAutomaticallyCollapsed}) => !$isAutomaticallyCollapsed  && ` - ${SIDER_COLLAPSED_SIZE}rem`}
  );
  position: fixed;
  left: 0;
  top: ${({$isCollapsed}) => $isCollapsed ?  TOP_MENU_SMALL : TOP_MENU_BIG}rem;
  bottom: ${SIDER_COLLAPSED_SIZE}rem;
  
  ${withScrollbar}
`

export const MenuCollapsor = styled.div<Pick<MenuLeftProps, '$isCollapsed'>>`
  width: ${SIDER_COLLAPSED_SIZE}rem;
  height: ${SIDER_COLLAPSED_SIZE}rem;
  transition: .3s all;
  position: fixed;
  left: ${({$isCollapsed}) => $isCollapsed ? 0 : `calc(${LEFT_MENU_WIDTH}rem - ${SIDER_COLLAPSED_SIZE}rem)`};
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  
  & > span > svg {
    transition: .3s all;
  }
`




// ======================= OLD
const combinePaths = (pathParts: string[]): string => pathParts.map(p => p[0] === "/" ? p : '/' + p).join('');

export const getActiveKeys = (fullPath: string, menuItems: MenuLeftItem[]) => {
    const keys: string[] = [];
    const defaultKeys: string[] = []
    menuItems.forEach(mi => {
        if (mi.to === fullPath) keys.push(mi.key);
        if (mi.isDefault) defaultKeys.push(mi.key);

        mi.childItems.forEach(ci => {
            if (combinePaths([mi.to, ci.to]) === fullPath) keys.push(ci.key)
            if (ci.isDefault) defaultKeys.push(ci.key)
        });
    });

    return keys.length > 0 ? keys : defaultKeys;
}