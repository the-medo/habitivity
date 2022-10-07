import React, {Fragment, useMemo} from "react";
import styled from "styled-components";
import { Layout, Menu } from 'antd';
import {NavLink, useMatches} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../store";
import {icons, IconType} from "../icons/icons";
import {
    SIDER_COLLAPSED_SIZE,
    LEFT_MENU_WIDTH,
    withScrollbar,
    REM_SIZE,
    TOP_MENU_SMALL, TOP_MENU_BIG
} from "../../styles/GlobalStyleAndTheme";
import {setLeftMenuAutomaticallyCollapsed, toggleLeftMenuManuallyCollapsed} from "../../store/menuSlice";
import {DoubleLeftOutlined} from "@ant-design/icons";
import {useSlider} from "../../hooks/useSlider";
const { Sider, } = Layout;

interface MenuLeftProps {
  $isCollapsed: boolean;
  $isAutomaticallyCollapsed: boolean;
  isManuallyCollapsed: boolean;
}

const StyledSider = styled(Sider)<Pick<MenuLeftProps, '$isAutomaticallyCollapsed' | '$isCollapsed'>>`
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

const StyledMenu = styled(Menu)`
`

const MenuCollapsor = styled.div<Pick<MenuLeftProps, '$isCollapsed'>>`
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

export type MenuLeftItem = {
    key: string;
    to: string,
    label: string,
    icon?: IconType,
    isDefault?: boolean,
    childItems: MenuLeftSubItem[],
}

export type MenuLeftSubItem = Omit<MenuLeftItem, 'childItems' >;

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

const MenuLeft: React.FC = () => {
    const matched = useMatches();
    const dispatch = useDispatch();
    const {items} = useSelector((state: ReduxState) => state.menuReducer);
    const {isLeftMenuCollapsed, leftMenuAutomaticallyCollapsed, leftMenuManuallyCollapsed} = useSlider();
    const selectedKeys = useMemo(() => getActiveKeys(matched[matched.length - 1].pathname, items), [matched, items]);


    return (
        <StyledSider
            width={`${LEFT_MENU_WIDTH}rem`}
            collapsedWidth={`${SIDER_COLLAPSED_SIZE}rem`}
            breakpoint="lg"
            onBreakpoint={broken => {
                dispatch(setLeftMenuAutomaticallyCollapsed(broken))
            }}
            collapsed={isLeftMenuCollapsed}
            $isCollapsed={isLeftMenuCollapsed}
            $isAutomaticallyCollapsed={leftMenuAutomaticallyCollapsed}
        >
            {items.length > 0 && <StyledMenu
                mode="inline"
                style={{height: '100%'}}
                selectedKeys={selectedKeys}
                //onClick...
                //onSelect...
                //onDeselect...
            >
                {
                    (items.map(mli => {
                        return (
                            <Fragment key={mli.key}>
                            <Menu.Item
                                key={mli.key}
                                icon={mli.icon ? icons[mli.icon] : (isLeftMenuCollapsed ? icons[IconType.RightCircleOutlined] : null)}
                                style={{
                                    paddingLeft: isLeftMenuCollapsed ? '1rem' : '1.5rem'
                                }}
                            >
                                {mli.to ? <NavLink to={mli.to}>{mli.label}</NavLink> : mli.label}
                            </Menu.Item>
                            {
                                mli.childItems.map(c =>
                                    <Menu.Item
                                        key={c.key}
                                        icon={c.icon ? icons[c.icon] : (isLeftMenuCollapsed ? icons[IconType.RightCircleOutlined] : null)}
                                        style={{
                                            paddingLeft: isLeftMenuCollapsed ? '1rem' : '3rem'
                                        }}
                                    >
                                        {(c.to) ? <NavLink to={combinePaths([mli.to, c.to])}>{c.label}</NavLink> : c.label}
                                    </Menu.Item>
                                )
                            }
                        </Fragment>
                    )}))
                }
            </StyledMenu>}
            {!leftMenuAutomaticallyCollapsed && <MenuCollapsor $isCollapsed={leftMenuManuallyCollapsed} onClick={() => dispatch(toggleLeftMenuManuallyCollapsed())}>
                <DoubleLeftOutlined rotate={leftMenuManuallyCollapsed ? 180 : 0} />
            </MenuCollapsor>}
        </StyledSider>
    );
}

export default MenuLeft;