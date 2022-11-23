import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.less'
import LoginPage from "../components/auth/LoginPage";
import MenuTop from "../components/menu/MenuTop/MenuTop";
import MenuLeft from "../components/menu/MenuLeft/MenuLeft";
import styled from "styled-components";
import {useSlider} from "../hooks/useSlider";
import RightDrawer from "../components/menu/DrawerRight/RightDrawer";
import {
    LEFT_MENU_WIDTH,
    RIGHT_DRAWER_WIDTH,
    SIDER_COLLAPSED_SIZE, TOP_MENU_BIG,
    TOP_MENU_SMALL
} from "../styles/GlobalStyleAndTheme";
import {useUser} from "../hooks/useUser";
import {COLORS} from "../styles/CustomStyles";

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
    const user = useUser();
    const {isLeftMenuCollapsed, isRightDrawerCollapsed, isLeftMenuWithContent} = useSlider();

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