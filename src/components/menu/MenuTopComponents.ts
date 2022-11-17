import styled, {css} from "styled-components";
import {SVG_COLOR_SECONDARY} from "../../assets/svg/Svg";
import {Layout, Menu} from "antd";
import {LEFT_MENU_WIDTH, SIDER_COLLAPSED_SIZE, TOP_MENU_BIG, TOP_MENU_SMALL} from "../../styles/GlobalStyleAndTheme";
import {StyledUserAvatar} from "../global/UserAvatar";
const { Header } = Layout;

export const TopMenuItem = styled.span`
  border-radius: .5rem;
  margin: .25rem;
  padding: .4rem .5rem;
  height: 1.5rem;
  font-size: 1.1rem;
  line-height: 1rem;
  transition: .3s all;
  
  &:hover {
    background-color: ${SVG_COLOR_SECONDARY}; //#001529
  }
`;

export const TopMenuHeader = styled(Header)<{$isCollapsed?: boolean}>`
  position: fixed;
  z-index: 1;
  width: 100%;
  padding: 0;
  transition: .5s all;
  overflow: hidden;
  
  /* must be here because of antd css rules overruling it in "TestMenuItem" styled component... better than !important... I guess? */
  ${TopMenuItem} > a, ${TopMenuItem}:hover > a { 
    color: #cdd9ee;
  }

  ${({$isCollapsed}) => css`
    line-height: ${$isCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG}rem;
    height: ${$isCollapsed ? TOP_MENU_SMALL: TOP_MENU_BIG}rem;
  `}
  
  ${StyledUserAvatar} {
    width: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    line-height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - .75 : TOP_MENU_BIG - 1}rem;
    margin: ${({$isCollapsed}) => $isCollapsed ? 0.35 : 0.45}rem;
  }
`;



export const LeftMenu = styled(Menu).attrs(() => ({
    theme: "dark",
}))<{$isCollapsed?: boolean}>`
  min-width: 0;
  flex: auto;
  ${({$isCollapsed}) => css`width: calc(100vw - 5rem - ${$isCollapsed ? SIDER_COLLAPSED_SIZE : LEFT_MENU_WIDTH}rem)`}
`

export const LeftMenuWrapper = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
`;

export const RightMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FullMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;