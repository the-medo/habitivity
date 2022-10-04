import React, {ReactNode} from "react";
import { Layout, Menu } from 'antd';
import styled from "styled-components";
import {NavLink, useMatches} from "react-router-dom";
import firebase from "firebase/compat";
const { Header } = Layout;


const Logo = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
`

export type MenuTopItem = {
    key: string;
    to: string,
    label: string,
    isDefault?: boolean;
    icon?: ReactNode;
}

export const menuTopItems = [
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

export const isActive = (search: string, menuItems: MenuTopItem[]) => menuItems.find(mi => mi.to === search) !== undefined;
export const getActiveKeys = (search: string, menuItems: MenuTopItem[]) => menuItems.filter(mi => mi.to === search).map(mi => mi.key);

const MenuTop: React.FC = () => {
    const matched = useMatches();

    return (
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Logo />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={matched[1].pathname !== "/" ? getActiveKeys(matched[1].pathname, menuTopItems) : menuTopItems.filter(mti => mti.isDefault).map(mti => mti.key)}>
                {
                    menuTopItems.map(mti => <Menu.Item key={mti.key}><NavLink to={mti.to}>{mti.label}</NavLink></Menu.Item>)
                }
                <Menu.Item key="logout" onClick={() => firebase.auth().signOut()}><NavLink to="/">Logout</NavLink></Menu.Item>
            </Menu>
        </Header>
    );
}

export default MenuTop;