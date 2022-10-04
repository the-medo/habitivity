import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import LoginPage from "../components/auth/LoginPage";
import {useSelector} from "react-redux";
import {ReduxState} from "../store";
import MenuTop from "../components/menu/MenuTop";
import MenuLeft from "../components/menu/MenuLeft";
import styled from "styled-components";

const StyledContent = styled(Layout.Content)<{$isSliderCollapsed: boolean}>`
  padding: 1.5rem;
  margin-left: ${({$isSliderCollapsed}) => $isSliderCollapsed ? 50 : 207}px;
  margin-top: 4rem;
  min-height: 280px;
  transition: .5s all;
  background-color: white;
`

export default function PageLayout() {
    const user = useSelector((state: ReduxState) => state.userReducer.user);
    const isSliderCollapsed = useSelector((state: ReduxState) => state.menuLeftReducer.sliderCollapsed || state.menuLeftReducer.sliderManuallyCollapsed);

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
                <StyledContent $isSliderCollapsed={isSliderCollapsed}>
                    <Outlet />
                </StyledContent>
            </Layout>
        </Layout>
    );
}