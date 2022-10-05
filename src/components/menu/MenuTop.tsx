import React, {useCallback} from "react";
import {Layout, Menu} from 'antd';
import styled, {css} from "styled-components";
import {NavLink, useMatches, useNavigate} from "react-router-dom";
import firebase from "firebase/compat";
import {LogoutOutlined} from "@ant-design/icons";
import {icons, IconType} from "../icons/icons";
import {LogoBig, LogoSmall} from "../../assets/svg";
import Svg from "../../assets/svg/Svg";
import {useSlider} from "../../hooks/useSlider";

const { Header } = Layout;

export type MenuTopItem = {
    key: string;
    to?: string,
    label?: string,
    isDefault?: boolean;
    icon?: IconType;
    onClick?: () => void;
}

export const menuTopItemsLeft: MenuTopItem[] = [
    {
        key: "1",
        to: "/home",
        label: "Home",
        isDefault: true,
    },
    {
        key: "2",
        to: "/calendar",
        label: "Calendar",
    },
    {
        key: "3",
        to: "/settings",
        label: "Settings",
    },
];


export const menuTopItemsRight: MenuTopItem[] = [
    {
        key: "1",
        to: "/settings",
        icon: IconType.SettingOutlined,
    },
];

const displayMenuItem = (mti: MenuTopItem) => {
    return (
        <Menu.Item key={mti.key} onClick={mti.onClick} icon={mti.icon ? icons[mti.icon] : undefined}>
            {mti.label && mti.to && <NavLink to={mti.to}>{mti.label}</NavLink>}
            {mti.label && !mti.to && <span>{mti.label}</span>}
        </Menu.Item>
    )
}

export const isActive = (search: string, menuItems: MenuTopItem[]) => menuItems.find(mi => mi.to === search) !== undefined;
export const getActiveKeys = (search: string, menuItems: MenuTopItem[]) => menuItems.filter(mi => mi.to === search).map(mi => mi.key);

const LeftMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RightMenuWrapper = styled.div``;

const FullMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopMenuHeader = styled(Header)<{isCollapsed?: boolean}>`
  position: fixed;
  z-index: 1;
  width: 100%;
  padding: 0;
  transition: .5s all;
  
  ${({isCollapsed}) => isCollapsed && css`
    line-height: 3rem;
    height: 3rem;
  `}
  
`

const MenuTop: React.FC = () => {
    const {isCollapsed} = useSlider();
    const matched = useMatches();
    const navigate = useNavigate();

    const logoutHandler = useCallback(() => {
        firebase.auth().signOut();
        navigate("/");
    }, []);

    return (
        <TopMenuHeader isCollapsed={isCollapsed}>
            <FullMenuWrapper>
                <LeftMenuWrapper>
                    <Svg svgImage={isCollapsed ? LogoSmall : LogoBig} height={isCollapsed ? '2.5rem' : '3rem'} width={isCollapsed ? '50px' : '206px'} />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={matched[1].pathname !== "/" ? getActiveKeys(matched[1].pathname, menuTopItemsLeft) : menuTopItemsLeft.filter(mti => mti.isDefault).map(mti => mti.key)}>
                        {menuTopItemsLeft.map(mti => displayMenuItem(mti))}
                    </Menu>
                </LeftMenuWrapper>
                <RightMenuWrapper>
                    <Menu theme="dark" mode="horizontal">
                        {menuTopItemsRight.map(mti => displayMenuItem(mti))}
                        <Menu.Item key={2} icon={<LogoutOutlined />} onClick={logoutHandler} ></Menu.Item>
                    </Menu>
                </RightMenuWrapper>
            </FullMenuWrapper>
        </TopMenuHeader>
    );
}

export default MenuTop;