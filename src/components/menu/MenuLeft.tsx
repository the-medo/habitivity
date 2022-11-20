import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../store";
import {icons, IconType} from "../icons/icons";
import {
    SIDER_COLLAPSED_SIZE,
    LEFT_MENU_WIDTH,
} from "../../styles/GlobalStyleAndTheme";
import {setLeftMenuAutomaticallyCollapsed, toggleLeftMenuManuallyCollapsed} from "../../store/menuSlice";
import {DoubleLeftOutlined} from "@ant-design/icons";
import {useSlider} from "../../hooks/useSlider";
import {LeftMenu, LeftMenuNavLink, LeftSider, MenuCollapsor} from "./MenuLeftComponents";
import {ItemType} from "antd/es/menu/hooks/useItems";



export type MenuLeftItem = {
    key: string;
    to: string,
    label: string,
    icon?: IconType,
    isDefault?: boolean,
    childItems: MenuLeftSubItem[],
}

const parseMenuLeftItem = (item: MenuLeftItem, isLeftMenuCollapsed: boolean): ItemType => {
    return ({
        key: item.key,
        title: item.label,
        label: <LeftMenuNavLink to={item.to}>
            {item.icon ? icons[item.icon] : (isLeftMenuCollapsed ? icons[IconType.RightCircleOutlined] : null)}
            {isLeftMenuCollapsed ? undefined : item.label}
        </LeftMenuNavLink>
    });
}

export type MenuLeftSubItem = Omit<MenuLeftItem, 'childItems' >;

const MenuLeft: React.FC = () => {
    const dispatch = useDispatch();
    const {items} = useSelector((state: ReduxState) => state.menuReducer);
    const {isLeftMenuCollapsed, isLeftMenuWithContent, leftMenuAutomaticallyCollapsed, leftMenuManuallyCollapsed} = useSlider();
    const leftMenuItems = useMemo(() => items.map(i => parseMenuLeftItem(i, isLeftMenuCollapsed)), [items, isLeftMenuCollapsed])

    if (!isLeftMenuWithContent) {
        return null;
    }

    return (
        <LeftSider
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
            {leftMenuItems.length > 0 && <LeftMenu
                mode="inline"
                style={{height: '100%'}}
                items={leftMenuItems}
                selectedKeys={[]}
            />}
            {!leftMenuAutomaticallyCollapsed && <MenuCollapsor $isCollapsed={leftMenuManuallyCollapsed} onClick={() => dispatch(toggleLeftMenuManuallyCollapsed())}>
                <DoubleLeftOutlined rotate={leftMenuManuallyCollapsed ? 180 : 0} />
            </MenuCollapsor>}
        </LeftSider>
    );
}

export default MenuLeft;