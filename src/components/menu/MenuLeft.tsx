import React, {Fragment, useMemo} from "react";
import styled from "styled-components";
import { Layout, Menu } from 'antd';
import {NavLink, useMatches} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../store";
import {icons, IconType} from "../icons/icons";
import {SLIDER_COLLAPSED_WIDTH, SLIDER_WIDTH, withScrollbar} from "../../styles/GlobalStyleAndTheme";
import {setSliderAutomaticallyCollapsed, toggleSliderManuallyCollapsed} from "../../store/menuLeftSlice";
import {DoubleLeftOutlined} from "@ant-design/icons";
import {useSlider} from "../../hooks/useSlider";
const { Sider, } = Layout;

interface MenuLeftProps {
  isCollapsed: boolean;
  $isAutomaticallyCollapsed: boolean;
  isManuallyCollapsed: boolean;
}

const StyledSider = styled(Sider)<Pick<MenuLeftProps, '$isAutomaticallyCollapsed' | 'isCollapsed'>>`
  background: #fff;
  overflow-y: auto;
  height: calc(
            100vh
            ${({isCollapsed}) => isCollapsed ?  ` - 3rem` : ` - 4rem`}
            ${({$isAutomaticallyCollapsed}) => !$isAutomaticallyCollapsed  && ` - 50px`}
  );
  position: fixed;
  left: 0;
  top: ${({isCollapsed}) => isCollapsed ?  `3rem` : `4rem`};
  bottom: 50px;
  
  ${withScrollbar}
`

const StyledMenu = styled(Menu)`
`

const MenuCollapsor = styled.div<Pick<MenuLeftProps, 'isCollapsed'>>`
  width: 50px;
  height: 50px;
  transition: .3s all;
  position: fixed;
  left: ${({isCollapsed}) => isCollapsed ? 0 : `calc(${SLIDER_WIDTH}px - 50px)`};
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
    const {multiselect, items} = useSelector((state: ReduxState) => state.menuLeftReducer);
    const {isCollapsed, sliderAutomaticallyCollapsed, sliderManuallyCollapsed} = useSlider();
    const selectedKeys = useMemo(() => getActiveKeys(matched[matched.length - 1].pathname, items), [matched, items]);


    return (
        <StyledSider
            width={SLIDER_WIDTH}
            breakpoint="lg"
            collapsedWidth={SLIDER_COLLAPSED_WIDTH}
            onBreakpoint={broken => {
                dispatch(setSliderAutomaticallyCollapsed(broken))
            }}
            collapsed={isCollapsed}
            isCollapsed={isCollapsed}
            $isAutomaticallyCollapsed={sliderAutomaticallyCollapsed}
        >
            {items.length > 0 && <StyledMenu
                mode="inline"
                style={{height: '100%'}}
                multiple={multiselect}
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
                                icon={mli.icon ? icons[mli.icon] : (isCollapsed ? icons[IconType.RightCircleOutlined] : null)}
                                style={{
                                    paddingLeft: isCollapsed ? '1rem' : '1.5rem'
                                }}
                            >
                                {mli.to ? <NavLink to={mli.to}>{mli.label}</NavLink> : mli.label}
                            </Menu.Item>
                            {
                                mli.childItems.map(c =>
                                    <Menu.Item
                                        key={c.key}
                                        icon={c.icon ? icons[c.icon] : (isCollapsed ? icons[IconType.RightCircleOutlined] : null)}
                                        style={{
                                            paddingLeft: isCollapsed ? '1rem' : '3rem'
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
            {!sliderAutomaticallyCollapsed && <MenuCollapsor isCollapsed={sliderManuallyCollapsed} onClick={() => dispatch(toggleSliderManuallyCollapsed())}>
                <DoubleLeftOutlined rotate={sliderManuallyCollapsed ? 180 : 0} />
            </MenuCollapsor>}
        </StyledSider>
    );
}

export default MenuLeft;