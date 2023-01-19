import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';
import LoginPage from '../components/auth/LoginPage';
import MenuTop from '../components/menu/MenuTop/MenuTop';
import MenuLeft from '../components/menu/MenuLeft/MenuLeft';
import styled from 'styled-components';
import { useLeftMenu } from '../hooks/useLeftMenu';
import RightDrawer from '../components/menu/DrawerRight/RightDrawer';
import { useUser } from '../hooks/useUser';
import {
  LEFT_MENU_WIDTH,
  RIGHT_DRAWER_WIDTH,
  SIDER_COLLAPSED_SIZE,
  TOP_MENU_BIG,
  TOP_MENU_SMALL,
} from '../styles/CustomStyles';
import Notifications from './Notifications';
import Backdrop from '../components/global/Backdrop';
import { useRightDrawer } from '../hooks/useRightDrawer';

const StyledContent = styled(Layout.Content)<{
  $isLeftMenuCollapsed: boolean;
  $isRightDrawerCollapsed: boolean;
  $isLeftMenuWithContent: boolean;
}>`
  padding: 1.5rem;
  margin-left: ${({ $isLeftMenuCollapsed, $isLeftMenuWithContent }) => {
    if ($isLeftMenuCollapsed && $isLeftMenuWithContent) return SIDER_COLLAPSED_SIZE;
    if ($isLeftMenuWithContent) return LEFT_MENU_WIDTH;
    return 0;
  }}rem;

  margin-top: ${({ $isLeftMenuCollapsed }) =>
    $isLeftMenuCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG}rem;
  min-height: 10rem;
  transition: 0.5s all;
  background-color: white;

  //TODO: after returning drawer, uncomment:
  // margin-right: ${({ $isRightDrawerCollapsed }) =>
    $isRightDrawerCollapsed ? SIDER_COLLAPSED_SIZE : RIGHT_DRAWER_WIDTH}rem;
`;

const PageLayout: React.FC = () => {
  const user = useUser();
  const { isLeftMenuCollapsed, isLeftMenuWithContent } = useLeftMenu();
  const { isRightDrawerCollapsed } = useRightDrawer();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('/today');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Notifications />
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
      <Backdrop />
    </Layout>
  );
};

export default PageLayout;
