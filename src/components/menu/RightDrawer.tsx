import React, {useCallback} from "react";
import {useSlider} from "../../hooks/useSlider";
import {
    SIDER_COLLAPSED_SIZE,
    LEFT_MENU_WIDTH,
    withScrollbar,
    TOP_MENU_BIG,
    TOP_MENU_SMALL, REM_SIZE, RIGHT_DRAWER_WIDTH
} from "../../styles/GlobalStyleAndTheme";
import {setRightDrawerStatus,} from "../../store/menuSlice";
import {Button, Layout,} from 'antd';
import {DoubleLeftOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {db} from "../../main";
import { collection, getDocs } from "firebase/firestore";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {taskConverter, TaskWakeUp} from "../../types/Tasks";
const { Sider } = Layout;

export type RightDrawerStatus = "hidden" | "opened" | "collapsed" | "automaticallyCollapsed" | "openedByForce" | "automaticallyOpened";

interface RightDrawerProps {
    $isRightDrawerCollapsed: boolean;
    $isLeftMenuCollapsed: boolean;
}

const StyledSider = styled(Sider)<RightDrawerProps>`
  background: #fff;
  overflow-y: auto;
  height: calc(
            100vh - ${SIDER_COLLAPSED_SIZE}rem
            - ${({$isLeftMenuCollapsed}) => $isLeftMenuCollapsed ?  TOP_MENU_SMALL : TOP_MENU_BIG}rem
  );
  position: fixed;
  right: 0;
  top: ${({$isLeftMenuCollapsed}) => $isLeftMenuCollapsed ?  TOP_MENU_SMALL : TOP_MENU_BIG}rem;
  bottom: ${SIDER_COLLAPSED_SIZE}rem;
  border: 1px solid red;
  
  ${withScrollbar}
`


const RightDrawerCollapsor = styled.div<Pick<RightDrawerProps, '$isRightDrawerCollapsed'>>`
  width: ${SIDER_COLLAPSED_SIZE}rem;
  height: ${SIDER_COLLAPSED_SIZE}rem;
  transition: .3s all;
  position: fixed;
  right: ${({$isRightDrawerCollapsed}) => $isRightDrawerCollapsed ? 0 : `calc(${LEFT_MENU_WIDTH}rem - ${SIDER_COLLAPSED_SIZE}rem)`};
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  
  & > span > svg {
    transition: .3s all;
  }
`

const RightDrawer: React.FC = () => {
    const dispatch = useDispatch();
    const {isRightDrawerCollapsed, isLeftMenuCollapsed, isRightDrawerHidden} = useSlider();

    if (isRightDrawerHidden) return null;

    const clickHandler = useCallback(async () => {
        await firestore()
            .collection('task-testing')
            .withConverter(taskConverter)
            .add(TaskWakeUp)
    }, [])

    return (
        <StyledSider
            width={`${RIGHT_DRAWER_WIDTH}rem`}
            collapsedWidth={`${SIDER_COLLAPSED_SIZE}rem`}
            breakpoint="lg"
            onBreakpoint={broken => {
                dispatch(setRightDrawerStatus(broken ? "automaticallyCollapsed" : "automaticallyOpened"))
            }}
            collapsed={isRightDrawerCollapsed}
            $isRightDrawerCollapsed={isRightDrawerCollapsed}
            $isLeftMenuCollapsed={isLeftMenuCollapsed}
        >
            <Button type={"primary"} onClick={clickHandler}>Test</Button>
            {<RightDrawerCollapsor $isRightDrawerCollapsed={isRightDrawerCollapsed} onClick={() => dispatch(setRightDrawerStatus(isRightDrawerCollapsed ? "opened" : "collapsed"))}>
              <DoubleLeftOutlined rotate={isRightDrawerCollapsed ? 0 : 180} />
            </RightDrawerCollapsor>}
        </StyledSider>
    );
}

export default RightDrawer;