import React, {useCallback, useEffect, useState} from "react";
import {Button, Dropdown, Layout, Menu} from 'antd';
import styled, {css} from "styled-components";
import {Link, NavLink, useMatches, useNavigate} from "react-router-dom";
import {LogoutOutlined} from "@ant-design/icons";
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


export const menuTopItemsRight: MenuTopItem[] = [
    {
        key: "1",
        to: "/settings",
        icon: IconType.SettingOutlined,
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
  
  ${({$isCollapsed}) => $isCollapsed && css`
    line-height: ${TOP_MENU_SMALL}rem;
    height: ${TOP_MENU_SMALL}rem;
  `}
  
  ${StyledUserAvatar} {
    width: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    line-height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    margin: ${({$isCollapsed}) => $isCollapsed ? 0.375 : 0.5}rem;
  }
`;

const LeftMenu = styled(Menu)`
  min-width: 0;
  flex: auto;
`


const MenuTop: React.FC = () => {
    const {isLeftMenuCollapsed} = useSlider();
    const matched = useMatches();
    const navigate = useNavigate();

    const {
        data: taskLists = [],
        isLoading,
        isSuccess,
        isError,
        error
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

    useEffect(() => {

        console.log("MenuTop => taskLists changed - ", taskLists)
    }, [taskLists]);


    const logoutHandler = useCallback(() => {
        signOut(auth).then(() => navigate("/"));
    }, []);

    const dropdownItems: ItemType[] =
        taskLists
            .filter(tl => tl.id !== selectedTaskListId)
            .map(tl => ({
                label: <Link to={`/task-list/${tl.id}`}>{tl.name}</Link>,
                key: `tl-${tl.id}`
            })).concat(selectedTaskList ? [{
                label: <Button type="default" style={{width: '100%'}}><Link to={`/task-list/edit`}>Edit current task list</Link></Button>,
                key: `tl-edit`
            }]: []).concat([{
            label: <Button type="primary" style={{width: '100%'}}><Link to={`/task-list/create`}>Create new task list</Link></Button>,
                key: `tl-create`
            }])
    ;

    return (
        <TopMenuHeader $isCollapsed={isLeftMenuCollapsed}>
            <FullMenuWrapper>
                <LeftMenuWrapper>
                    <Dropdown menu={{items: dropdownItems}}>
                        <div>
                        <LogoWithTaskList version={isLeftMenuCollapsed ? 'small' : 'big'} title={selectedTaskList?.name} />
                        </div>
                    </Dropdown>
                    <LeftMenu theme="dark" mode="horizontal" defaultSelectedKeys={matched[1].pathname !== "/" ? getActiveKeys(matched[1].pathname, leftTopMenuItems) : leftTopMenuItems.filter(mti => mti.isDefault).map(mti => mti.key)}>
                        {
                            leftTopMenuItems.map(mti => displayMenuItem(mti))
                        }
                    </LeftMenu>
                </LeftMenuWrapper>
                <RightMenuWrapper>
                    <Menu theme="dark" mode="horizontal">
                        {menuTopItemsRight.map(mti => displayMenuItem(mti))}
                        <Menu.Item key={2} icon={<LogoutOutlined />} onClick={logoutHandler} ></Menu.Item>
                    </Menu>
                    <UserAvatar />
                </RightMenuWrapper>
            </FullMenuWrapper>
        </TopMenuHeader>
    );
}

export default MenuTop;