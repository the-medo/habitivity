import React, { useCallback } from 'react';
import { useSlider } from '../../../hooks/useSlider';
import { withScrollbar } from '../../../styles/GlobalStyleAndTheme';
import { setRightDrawerStatus } from '../../../store/menuSlice';
import { Button, Layout } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  COLORS,
  LEFT_MENU_WIDTH,
  RIGHT_DRAWER_WIDTH,
  SIDER_COLLAPSED_SIZE,
  TOP_MENU_BIG,
  TOP_MENU_SMALL,
} from '../../../styles/CustomStyles';

const { Sider } = Layout;

export type RightDrawerStatus =
  | 'hidden'
  | 'opened'
  | 'collapsed'
  | 'automaticallyCollapsed'
  | 'openedByForce'
  | 'automaticallyOpened';

interface RightDrawerProps {
  $isRightDrawerCollapsed: boolean;
  $isLeftMenuCollapsed: boolean;
}

const StyledSider = styled(Sider)<RightDrawerProps>`
  display: none; //hidden for now

  background: ${COLORS.WHITE};
  overflow-y: auto;
  height: calc(
    100vh - ${SIDER_COLLAPSED_SIZE}rem -
      ${({ $isLeftMenuCollapsed }) => ($isLeftMenuCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG)}rem
  );
  position: fixed;
  right: 0;
  top: ${({ $isLeftMenuCollapsed }) => ($isLeftMenuCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG)}rem;
  bottom: ${SIDER_COLLAPSED_SIZE}rem;

  ${withScrollbar}
`;

const RightDrawerCollapsor = styled.div<Pick<RightDrawerProps, '$isRightDrawerCollapsed'>>`
  width: ${SIDER_COLLAPSED_SIZE}rem;
  height: ${SIDER_COLLAPSED_SIZE}rem;
  transition: 0.3s all;
  position: fixed;
  right: ${({ $isRightDrawerCollapsed }) =>
    $isRightDrawerCollapsed ? 0 : `calc(${LEFT_MENU_WIDTH}rem - ${SIDER_COLLAPSED_SIZE}rem)`};
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;

  & > span > svg {
    transition: 0.3s all;
  }
`;

const RightDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { isRightDrawerCollapsed, isLeftMenuCollapsed, isRightDrawerHidden } = useSlider();

  const clickHandler = useCallback(() => {
    return;
  }, []);

  const onBreakHandler = useCallback(
    (broken: boolean) =>
      dispatch(setRightDrawerStatus(broken ? 'automaticallyCollapsed' : 'automaticallyOpened')),
    [dispatch],
  );

  const collapseRightDrawer = useCallback(
    () => dispatch(setRightDrawerStatus(isRightDrawerCollapsed ? 'opened' : 'collapsed')),
    [dispatch, isRightDrawerCollapsed],
  );

  if (isRightDrawerHidden) return null;

  return (
    <StyledSider
      width={`${RIGHT_DRAWER_WIDTH}rem`}
      collapsedWidth={`${SIDER_COLLAPSED_SIZE}rem`}
      breakpoint="lg"
      onBreakpoint={onBreakHandler}
      collapsed={isRightDrawerCollapsed}
      $isRightDrawerCollapsed={isRightDrawerCollapsed}
      $isLeftMenuCollapsed={isLeftMenuCollapsed}
    >
      <Button type="primary" onClick={clickHandler}>
        Test
      </Button>
      <RightDrawerCollapsor
        $isRightDrawerCollapsed={isRightDrawerCollapsed}
        onClick={collapseRightDrawer}
      >
        <DoubleLeftOutlined rotate={isRightDrawerCollapsed ? 0 : 180} />
      </RightDrawerCollapsor>
    </StyledSider>
  );
};

export default RightDrawer;
