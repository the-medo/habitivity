import React, {ReactNode, useCallback} from "react";
import {Button, Layout, Menu, Tooltip} from 'antd';
import styled from "styled-components";
import {NavLink, useMatches, useNavigate} from "react-router-dom";
import firebase from "firebase/compat";
import {LogoutOutlined} from "@ant-design/icons";
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
    const navigate = useNavigate();

    const logoutHandler = useCallback(() => {
        firebase.auth().signOut();
        navigate("/");
    }, []);

    return (
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Logo />
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={matched[1].pathname !== "/" ? getActiveKeys(matched[1].pathname, menuTopItems) : menuTopItems.filter(mti => mti.isDefault).map(mti => mti.key)}>
                    {
                        menuTopItems.map(mti => <Menu.Item key={mti.key}><NavLink to={mti.to}>{mti.label}</NavLink></Menu.Item>)
                    }

                </Menu>
                <Tooltip title="Logout">
                    <Button type="primary" shape="circle" icon={<LogoutOutlined />} onClick={logoutHandler} />
                </Tooltip>
            </div>
        </Header>
    );
}

export default MenuTop;