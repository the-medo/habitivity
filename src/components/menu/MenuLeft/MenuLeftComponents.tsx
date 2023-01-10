import styled from 'styled-components';
import { withScrollbar } from '../../../styles/GlobalStyleAndTheme';
import { Layout, Menu } from 'antd';
import {
  COLORS,
  LEFT_MENU_WIDTH,
  SIDER_COLLAPSED_SIZE,
  TOP_MENU_BIG,
  TOP_MENU_SMALL,
} from '../../../styles/CustomStyles';
import { DynamicIconWrapper } from '../../global/DynamicIcon';

const { Sider } = Layout;

export const LeftMenu = styled(Menu)`
  padding-top: 0.25rem;
  background-color: transparent;
  height: 100%;
  transition: 0.3s all;

  & > li.ant-menu-item {
    /* left menu, otherwise could be:  "aside ul.ant-menu" */
    border-radius: 0;
    background-color: transparent !important;
    padding: 0 calc(0.5rem - 1px) 0 0.5rem !important;
    margin: 0;
    width: 100%;

    &:not(:first-of-type) {
      margin-top: 0.5rem;
    }

    &.task-type {
      height: 2rem;
      margin: 0;
      cursor: default;
    }
  }
`;

export interface MenuLeftProps {
  $isCollapsed: boolean;
  $isAutomaticallyCollapsed: boolean;
  isManuallyCollapsed: boolean;
}

export const LeftSider = styled(Sider)<
  Pick<MenuLeftProps, '$isAutomaticallyCollapsed' | '$isCollapsed'>
>`
  overflow-y: auto;
  height: calc(
    100vh - ${({ $isCollapsed }) => ($isCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG)}rem${({ $isAutomaticallyCollapsed }) => !$isAutomaticallyCollapsed && ` - ${SIDER_COLLAPSED_SIZE}rem`}
  );
  position: fixed !important;
  left: 0;
  top: ${({ $isCollapsed }) => ($isCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG)}rem;
  bottom: ${SIDER_COLLAPSED_SIZE}rem;
  background-color: ${COLORS.GREY_LIGHT} !important;
  transition: 0.3s all !important;

  ${withScrollbar}
`;

export const MenuCollapsor = styled.div<Pick<MenuLeftProps, '$isCollapsed'>>`
  width: ${({ $isCollapsed }) => ($isCollapsed ? SIDER_COLLAPSED_SIZE : LEFT_MENU_WIDTH)}rem;
  height: ${SIDER_COLLAPSED_SIZE}rem;
  transition: 0.3s all;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-right: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${COLORS.GREY_LIGHT};
  border-inline-end: 1px solid ${COLORS.GREY_MENU_BORDER};
  overflow: hidden;
`;

export const MenuCollapsorIcon = styled(DynamicIconWrapper)<Pick<MenuLeftProps, '$isCollapsed'>>`
  svg {
    transition: 0.8s all;
    transform: rotate(${({ $isCollapsed }) => ($isCollapsed ? 180 : 0)}deg);
  }
`;
