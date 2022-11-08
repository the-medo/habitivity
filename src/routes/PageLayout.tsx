import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.less'
import LoginPage from "../components/auth/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../store";
import MenuTop from "../components/menu/MenuTop";
import MenuLeft from "../components/menu/MenuLeft";
import styled from "styled-components";
import {useSlider} from "../hooks/useSlider";
import RightDrawer from "../components/menu/RightDrawer";
import {
    LEFT_MENU_WIDTH,
    RIGHT_DRAWER_WIDTH,
    SIDER_COLLAPSED_SIZE, TOP_MENU_BIG,
    TOP_MENU_SMALL
} from "../styles/GlobalStyleAndTheme";
import {setSelectedTaskListId, setTaskLists} from "../store/taskSlice";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {taskListConverter} from "../types/TaskLists";
import {useUser} from "../hooks/useUser";

const StyledContent = styled(Layout.Content)<{
    $isLeftMenuCollapsed: boolean;
    $isRightDrawerCollapsed: boolean;
    $isLeftMenuWithContent: boolean;
}>`
  padding: 1.5rem;
  margin-left: ${({$isLeftMenuCollapsed, $isLeftMenuWithContent}) => $isLeftMenuWithContent ? ($isLeftMenuCollapsed ? SIDER_COLLAPSED_SIZE : LEFT_MENU_WIDTH) : 0}rem;
  margin-right: ${({$isRightDrawerCollapsed}) => $isRightDrawerCollapsed ? SIDER_COLLAPSED_SIZE : RIGHT_DRAWER_WIDTH}rem;
  margin-top: ${({$isLeftMenuCollapsed}) => $isLeftMenuCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG}rem;
  min-height: 10rem;
  transition: .5s all;
  background-color: white;
`

export default function PageLayout() {
    const dispatch = useDispatch();
    const user = useUser();
    const selectedTaskListId = useSelector((state: ReduxState) => state.taskReducer.selectedTaskListId);
    const {isLeftMenuCollapsed, isRightDrawerCollapsed, isLeftMenuWithContent} = useSlider();

    useEffect(() => {
        if (user) {
            console.log('/Users/' + user.id + '/TaskLists');
            const taskListsRef = collection(db, '/Users/' + user.id + '/TaskLists').withConverter(taskListConverter);

            console.log("taskListsRef", taskListsRef);

            getDocs(taskListsRef).then((snapshot) => {
                const taskListData = snapshot.docs.map(x => x.data());
                console.log("taskListData before dispatch", taskListData);
                dispatch(setTaskLists(taskListData));
                const selectedExist = taskListData.find(tl => tl.id === selectedTaskListId);
                if (!selectedExist && taskListData.length > 0) {
                    dispatch(setSelectedTaskListId(taskListData[0].id));
                }
            });


        }
    }, [])

    if (!user) {
        return (
            <LoginPage/>
        )
    }

    return (
        <Layout>
            <MenuTop />
            <Layout>
                <MenuLeft />
                <StyledContent
                    $isLeftMenuCollapsed={isLeftMenuCollapsed}
                    $isRightDrawerCollapsed={isRightDrawerCollapsed}
                    $isLeftMenuWithContent={isLeftMenuWithContent}
                >
                    <Outlet />
                </StyledContent>
                <RightDrawer />
            </Layout>
        </Layout>
    );
}