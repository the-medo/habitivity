import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.less'
import LoginPage from "../components/auth/LoginPage";
import {useSelector} from "react-redux";
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

const StyledContent = styled(Layout.Content)<{
    $isLeftMenuCollapsed: boolean;
    $isRightDrawerCollapsed: boolean;
}>`
  padding: 1.5rem;
  margin-left: ${({$isLeftMenuCollapsed}) => $isLeftMenuCollapsed ? SIDER_COLLAPSED_SIZE : LEFT_MENU_WIDTH}rem;
  margin-right: ${({$isRightDrawerCollapsed}) => $isRightDrawerCollapsed ? SIDER_COLLAPSED_SIZE : RIGHT_DRAWER_WIDTH}rem;
  margin-top: ${({$isLeftMenuCollapsed}) => $isLeftMenuCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG}rem;
  min-height: 10rem;
  transition: .5s all;
  background-color: white;
`

export default function PageLayout() {
    const user = useSelector((state: ReduxState) => state.userReducer.user);
    const {isLeftMenuCollapsed, isRightDrawerCollapsed} = useSlider();

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
                    $isRightDrawerCollapsed={isRightDrawerCollapsed}>
                    <Outlet />
                </StyledContent>
                <RightDrawer />
            </Layout>
        </Layout>
    );
}