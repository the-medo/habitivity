import React from "react";
import styled from "styled-components";
import { Layout, Menu } from 'antd';
import {NavLink, useMatches, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../store";
import {icons, IconType} from "../icons/icons";
import {SLIDER_COLLAPSED_WIDTH, SLIDER_WIDTH, withScrollbar} from "../../styles/GlobalStyleAndTheme";
import {setSliderCollapsed, toggleSliderManuallyCollapsed} from "../../store/menuLeftSlice";
import {DoubleLeftOutlined} from "@ant-design/icons";
const { Sider, } = Layout;

interface MenuLeftProps {

}

const StyledSider = styled(Sider)`
  background: #fff;
  overflow-y: auto;
  height: calc(100vh - 64px - 50px);
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 50px;
  
  ${withScrollbar}
`

const StyledMenu = styled(Menu)`
`

const MenuCollapsor = styled.div<{isCollapsed: boolean}>`
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
    childItems: MenuLeftSubItem[],
}

export type MenuLeftSubItem = Omit<MenuLeftItem, 'childItems' >;

const combinePaths = (pathParts: string[]): string => pathParts.map(p => p[0] === "/" ? p : '/' + p).join('');
export const getActiveKeys = (fullPath: string, menuItems: MenuLeftItem[]) => {
    const keys: string[] = [];
    menuItems.forEach(mi => {
        if (mi.to === fullPath) keys.push(mi.key);
        mi.childItems.forEach(ci => {
            if (combinePaths([mi.to, ci.to]) === fullPath) keys.push(ci.key)
        });
    });

    return keys;
}

const MenuLeft: React.FC<MenuLeftProps> = () => {
    const matched = useMatches();
    const params = useParams();
    const dispatch = useDispatch();
    const {multiselect, items, sliderCollapsed, sliderManuallyCollapsed} = useSelector((state: ReduxState) => state.menuLeftReducer);

    const isCollapsed = sliderCollapsed || sliderManuallyCollapsed;

    console.log(matched, params);

    return (
        <StyledSider
            width={SLIDER_WIDTH}
            breakpoint="lg"
            collapsedWidth={SLIDER_COLLAPSED_WIDTH}
            onBreakpoint={broken => {
                dispatch(setSliderCollapsed(broken))
            }}
            collapsed={isCollapsed}
        >
            {items.length > 0 && <StyledMenu
                mode="inline"
                style={{height: '100%'}}
                multiple={multiselect}
                defaultSelectedKeys={getActiveKeys(matched[matched.length - 1].pathname, items)}
                //onClick...
                //onSelect...
                //onDeselect...
            >
                {
                    items.map(mli => {
                        return (
                            <>
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
                            </>
                        )
                    })
                }
            </StyledMenu>}
            {!sliderCollapsed && <MenuCollapsor isCollapsed={sliderManuallyCollapsed} onClick={() => dispatch(toggleSliderManuallyCollapsed())}>
                <DoubleLeftOutlined rotate={sliderManuallyCollapsed ? 180 : 0} />
            </MenuCollapsor>}
        </StyledSider>
    );
}

export default MenuLeft;