import React, {useCallback, useEffect, useState} from "react";
import {Button, Dropdown, Layout, Menu} from 'antd';
import styled, {css} from "styled-components";
import {NavLink, useMatches, useNavigate} from "react-router-dom";
import {icons, IconType} from "../icons/icons";
import {useSlider} from "../../hooks/useSlider";
import { TOP_MENU_BIG, TOP_MENU_SMALL} from "../../styles/GlobalStyleAndTheme";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import UserAvatar, {StyledUserAvatar} from "../global/UserAvatar";
import {useSelector} from "react-redux";
import {ReduxState} from "../../store";
import LogoWithTaskList from "../global/LogoWithTaskList";
import {useSelectedTaskList} from "../../hooks/useSelectedTaskList";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {useGetTaskListsQuery} from "../../store/apis/apiTaskList";

const { Header } = Layout;

export type MenuTopItem = {
    key: string;
    to?: string,
    label?: string,
    isDefault?: boolean;
    icon?: IconType;
    onClick?: () => void;
}

export const menuTopItemsLeftDefault: MenuTopItem[] = [
    {
        key: "1",
        to: "/home",
        label: "Home",
        isDefault: true,
    },
    {
        key: "2",
        to: "/today",
        label: "Today",
        isDefault: false,
    },
    {
        key: "3",
        to: "/calendar",
        label: "Calendar",
    },
];

export const menuTopItemsLeftWhenNoTaskList: MenuTopItem[] = [
    {
        key: "1",
        to: "/task-list/create",
        label: "Create new task list",
        isDefault: true,
    },
];


const displayMenuItem = (mti: MenuTopItem) => {
    return (
        <Menu.Item key={mti.key} onClick={mti.onClick} icon={mti.icon ? icons[mti.icon] : undefined}>
            {mti.label && mti.to && <NavLink to={mti.to}>{mti.label}</NavLink>}
            {mti.label && !mti.to && <span>{mti.label}</span>}
        </Menu.Item>
    )
}

export const isActive = (search: string, menuItems: MenuTopItem[]) => menuItems.find(mi => mi.to === search) !== undefined;
export const getActiveKeys = (search: string, menuItems: MenuTopItem[]) => menuItems.filter(mi => mi.to === search).map(mi => mi.key);

const LeftMenuWrapper = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
`;

const RightMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FullMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;


const TopMenuHeader = styled(Header)<{$isCollapsed?: boolean}>`
  position: fixed;
  z-index: 1;
  width: 100%;
  padding: 0;
  transition: .5s all;
  line-height: ${TOP_MENU_BIG}rem;
  height: ${TOP_MENU_BIG}rem;
  overflow: hidden;
  
  ${({$isCollapsed}) => $isCollapsed && css`
    line-height: ${TOP_MENU_SMALL}rem;
    height: ${TOP_MENU_SMALL}rem;
  `}
  
  ${StyledUserAvatar} {
    width: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    line-height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    margin: ${({$isCollapsed}) => $isCollapsed ? 0.35 : 0.45}rem;
  }
`;

const LeftMenu = styled(Menu).attrs(() => ({
    theme: "dark",
}))`
  min-width: 0;
  flex: auto;
`

const DivPointerCursor = styled.div`cursor: pointer`;


const MenuTop: React.FC = () => {
    const {isLeftMenuCollapsed} = useSlider();
    const matched = useMatches();
    const navigate = useNavigate();

    const {
        data: taskLists = [],
    } = useGetTaskListsQuery();

    // const taskLists = useSelector((state: ReduxState) => selectTaskLists(state));
    const selectedTaskListId = useSelector((state: ReduxState) => state.taskReducer.selectedTaskListId);
    const selectedTaskList = useSelectedTaskList();
    const [leftTopMenuItems, setLeftTopMenuItems] = useState<MenuTopItem[]>(selectedTaskListId !== undefined ? menuTopItemsLeftDefault : menuTopItemsLeftWhenNoTaskList);

    useEffect(() => {
        if (selectedTaskListId) {
            setLeftTopMenuItems(menuTopItemsLeftDefault);
        } else {
            setLeftTopMenuItems(menuTopItemsLeftWhenNoTaskList);
        }
    }, [selectedTaskListId, taskLists])

    const logoutHandler = useCallback(() => {
        signOut(auth).then(() => navigate("/"));
    }, []);

    const taskListDropdownItems: ItemType[] =
        taskLists
            .filter(tl => tl.id !== selectedTaskListId)
            .map((tl): ItemType => ({
                label: tl.name,
                key: `tl-${tl.id}`,
                onClick: () => navigate(`/task-list/${tl.id}`),
                icon: icons[IconType.RightOutlined],
                style: {marginLeft: '.5rem'}
            })).concat([{
                type: "divider"
            }], (selectedTaskList ? [{
                label: <Button style={{width: '100%'}} icon={icons[IconType.EditOutlined]} >Edit current task list</Button>,
                key: `tl-edit`,
                onClick: () => navigate(`/task-list/edit`),
            }]: []), [{
                label: <Button type="primary" style={{width: '100%'}} icon={icons[IconType.PlusOutlined]} >Create new task list</Button>,
                key: `tl-create`,
                onClick: () => navigate(`/task-list/create`),
            }]);

    const userOptionDropdownItems: ItemType[] = [
        {
            label: "Settings",
            key: "1",
            icon: icons[IconType.SettingOutlined],
            onClick: () => navigate("/settings"),
        },
        {
            type: "divider"
        },
        {
            label: "Logout",
            key: "3",
            icon: icons[IconType.LogoutOutlined],
            onClick: logoutHandler,
        }
    ]

    return (
        <TopMenuHeader $isCollapsed={isLeftMenuCollapsed}>
            <FullMenuWrapper>
                <LeftMenuWrapper>
                    <Dropdown trigger={["click", "hover"]} menu={{items: taskListDropdownItems}} align={{targetOffset: [0, isLeftMenuCollapsed ? 0 : -5]}}>
                        <DivPointerCursor>
                                {/*TODO - in case of touch screen, dont link to homepage*/}
                                {/*<Link to={`/`}>*/}
                                    <LogoWithTaskList version={isLeftMenuCollapsed ? 'small' : 'big'} title={selectedTaskList?.name} />
                                {/*</Link>*/}
                        </DivPointerCursor>
                    </Dropdown>
                    <LeftMenu mode="horizontal" defaultSelectedKeys={matched[1].pathname !== "/" ? getActiveKeys(matched[1].pathname, leftTopMenuItems) : leftTopMenuItems.filter(mti => mti.isDefault).map(mti => mti.key)}>
                        {
                            leftTopMenuItems.map(mti => displayMenuItem(mti))
                        }
                    </LeftMenu>
                </LeftMenuWrapper>
                <RightMenuWrapper>
                    <Dropdown trigger={["click", "hover"]} menu={{items: userOptionDropdownItems}} overlayStyle={{width: '200px'}} align={{offset: [0, -1]}}>
                        <DivPointerCursor style={{cursor: "pointer"}}>
                            <UserAvatar />
                        </DivPointerCursor>
                    </Dropdown>
                </RightMenuWrapper>
            </FullMenuWrapper>
        </TopMenuHeader>
    );
}

export default MenuTop;