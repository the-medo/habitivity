import React from "react";
import { Layout, Menu } from 'antd';
import styled from "styled-components";
import {NavLink, useMatches} from "react-router-dom";
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
    icon?: any;
}

export const menuTopItems = [
    {
        key: "1",
        to: "/home",
        label: "Home",
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
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={matched[1] ? getActiveKeys(matched[1].pathname, menuTopItems) : []}>
                {
                    menuTopItems.map(mti => <Menu.Item key={mti.key}><NavLink to={mti.to}>{mti.label}</NavLink></Menu.Item>)
                }
            </Menu>
        </Header>
    );
}

export default MenuTop;