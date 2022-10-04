import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {MenuLeftItem} from "../components/menu/MenuLeft";
import {useDispatch} from "react-redux";
import {setMenuLeftItems} from "../store/menuLeftSlice";
import {IconType} from "../components/icons/icons";

export const settingsMenuLeftItems: MenuLeftItem[] = [
    {
        key: "set1",
        to: "/settings/page-1",
        label: "Settings menu item1",
        isDefault: true,
        icon: IconType.HomeTwoTone,
        childItems: [
            {
                key: "set1-1",
                to: "1",
                label: "Settings menu sub item 1-1",
            },
            {
                key: "set1-2",
                to: "2",
                label: "Settings menu sub item 1-2",
            },
        ]
    },
    {
        key: "set2",
        to: "/settings/page-2",
        label: "Settings menu item2",
        childItems: [
            {
                key: "set2-1",
                to: "1",
                label: "Settings menu sub item 2-1",
            },
            {
                key: "set2-2",
                to: "2",
                label: "Settings menu sub item 2-2",
            },
        ]
    },
    {
        key: "set3",
        to: "/settings/page-3",
        label: "Settings menu item3",
        childItems: [
            {
                key: "set3-1",
                to: "1",
                label: "Settings menu sub item 3-1",
            },
            {
                key: "set3-2",
                to: "2",
                label: "Settings menu sub item 3-2",
            },
        ]
    },
];

const Settings: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Setting menu left..");
        dispatch(setMenuLeftItems(settingsMenuLeftItems));
    }, [])


    return (
        <div>
            <h1>This is page called SETTINGS</h1>
            <Outlet />
        </div>
    )
}

export default Settings;