import React, {useCallback, useEffect, useState} from "react";
import {Button, Dropdown} from 'antd';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {icons, IconType} from "../../icons/icons";
import {useSlider} from "../../../hooks/useSlider";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase";
import UserAvatar from "../../global/UserAvatar";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../store";
import LogoWithTaskList from "../../global/LogoWithTaskList";
import {useSelectedTaskList} from "../../../hooks/useSelectedTaskList";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {useGetTaskListsQuery} from "../../../store/apis/apiTaskList";
import {FullMenuWrapper, LeftMenu, LeftMenuWrapper, RightMenuWrapper, TopMenuHeader, TopMenuNavLink } from "./MenuTopComponents";

export const menuTopItemsLeftDefault: ItemType[] = [
    {
        key: "home",
        label: <TopMenuNavLink to="/home">{icons[IconType.HomeOutlined]}Home</TopMenuNavLink>
    },
    {
        key: "today",
        label: <TopMenuNavLink to="/today">Today</TopMenuNavLink>
    },
    {
        key: "calendar",
        label: <TopMenuNavLink to="/calendar">Calendar</TopMenuNavLink>
    },
];

export const menuTopItemsLeftWhenNoTaskList: ItemType[] = [
    {
        key: "create-task-list",
        label: <TopMenuNavLink to="/task-list/create">Create new task list</TopMenuNavLink>
    },
];

const DivPointerCursor = styled.div`cursor: pointer`;

const MenuTop: React.FC = () => {
    const {isLeftMenuCollapsed} = useSlider();
    const navigate = useNavigate();

    const {
        data: taskLists = [],
    } = useGetTaskListsQuery();

    // const taskLists = useSelector((state: ReduxState) => selectTaskLists(state));
    const selectedTaskListId = useSelector((state: ReduxState) => state.taskReducer.selectedTaskListId);
    const selectedTaskList = useSelectedTaskList();
    const [leftTopMenuItems, setLeftTopMenuItems] = useState<ItemType[]>(selectedTaskListId !== undefined ? menuTopItemsLeftDefault : menuTopItemsLeftWhenNoTaskList);

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
                            <LogoWithTaskList version={isLeftMenuCollapsed ? 'small' : 'big'} title={selectedTaskList?.name} />
                        </DivPointerCursor>
                    </Dropdown>
                    <LeftMenu mode="horizontal" items={leftTopMenuItems} />
                </LeftMenuWrapper>
                <RightMenuWrapper>
                    <Dropdown trigger={["click", "hover"]} menu={{items: userOptionDropdownItems}} overlayStyle={{width: '200px'}} align={{offset: [0, -1]}}>
                        <DivPointerCursor>
                            <UserAvatar />
                        </DivPointerCursor>
                    </Dropdown>
                </RightMenuWrapper>
            </FullMenuWrapper>
        </TopMenuHeader>
    );
}

export default MenuTop;