import styled, {css} from "styled-components";
import {Layout, Menu} from "antd";
import {LEFT_MENU_WIDTH, SIDER_COLLAPSED_SIZE, TOP_MENU_BIG, TOP_MENU_SMALL} from "../../../styles/GlobalStyleAndTheme";
import {StyledUserAvatar} from "../../global/UserAvatar";
import {NavLink} from "react-router-dom";
import {COLORS} from "../../../styles/CustomStyles";
const { Header } = Layout;

export const TopMenuNavLink = styled(NavLink)`

  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: .5rem;
  margin: 0 .25rem;
  padding: 0 .75rem;
  
  font-size: 1.25rem;
  transition: .3s all;
  
  span svg {
    margin-right: .5rem;
    font-size: 1.25rem;
    color: ${COLORS.BLUE_LIGHT};
  }
  
  &:hover, &[aria-current="page"].active {
    background-color: ${COLORS.BLUE_DARK}; //#001529
  }
`;


export const TopMenuLeftPartWrapper = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
`;


export const TopMenuLeftPart = styled(Menu).attrs(() => ({
  theme: "dark",
}))<{$isCollapsed?: boolean}>`
  min-width: 0;
  flex: auto;
  ${({$isCollapsed}) => css`width: calc(100vw - 5rem - ${$isCollapsed ? SIDER_COLLAPSED_SIZE : LEFT_MENU_WIDTH}rem)`}
`

export const TopMenuHeader = styled(Header)<{$isCollapsed?: boolean}>`
  position: fixed;
  
  z-index: 1;
  width: 100%;
  padding: 0;
  transition: .5s all;
  overflow: hidden;
  
  /* must be here because of antd css rules overruling it in "TestMenuItem" styled component... better than !important... I guess? */
  ${TopMenuLeftPartWrapper} ${TopMenuLeftPart} ${TopMenuNavLink} { 
    color: ${COLORS.BLUE_LIGHT};
    ${({$isCollapsed}) => css`
      line-height: ${$isCollapsed ? 2 : 2.5}rem;
      height: ${$isCollapsed ? 2: 2.5}rem;
      font-size: ${$isCollapsed ? 1: 1.25}rem;
    `}
  }

  ${({$isCollapsed}) => css`
    line-height: ${$isCollapsed ? TOP_MENU_SMALL : TOP_MENU_BIG}rem;
    height: ${$isCollapsed ? TOP_MENU_SMALL: TOP_MENU_BIG}rem;
  `}
  
  ${StyledUserAvatar} {
    width: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - 1 : TOP_MENU_BIG - 1}rem;
    height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - 1 : TOP_MENU_BIG - 1}rem;
    line-height: ${({$isCollapsed}) => $isCollapsed ? TOP_MENU_SMALL - 1 : TOP_MENU_BIG - 1}rem;
  }
`;



export const RightMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

export const FullMenuWrapper = styled.div`
  margin: 0.25rem 0;
  display: flex;
  justify-content: space-between;
`;