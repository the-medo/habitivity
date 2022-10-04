import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {MenuLeftItem} from "../components/menu/MenuLeft";
import {setMenuLeftItems} from "../store/menuLeftSlice";
import {useDispatch} from "react-redux";
import {IconType} from "../components/icons/icons";


const homeMenuLeftItems: MenuLeftItem[] = [
    {
        key: "home1",
        to: "/home/page-1",
        label: "Home menu item1",
        isDefault: true,
        icon: IconType.HomeOutlined,
        childItems: [
            {
                key: "home1-1",
                to: "1",
                label: "Home menu sub item 1-1",
            },
            {
                key: "home1-2",
                to: "2",
                label: "Home menu sub item 1-2",
            },
        ]
    },
    {
        key: "home2",
        to: "/home/page-2",
        label: "Home menu item2",
        icon: IconType.HomeFilled,
        childItems: [
            {
                key: "home2-1",
                to: "1",
                label: "Home menu sub item 2-1",
            },
            {
                key: "home2-2",
                to: "2",
                label: "Home menu sub item 2-2",
            },
        ]
    },
    {
        key: "home3",
        to: "/home/page-3",
        label: "Home menu item3",
        childItems: [
            {
                key: "home3-1",
                to: "1",
                label: "Home menu sub item 3-1",
            },
            {
                key: "home3-2",
                to: "2",
                label: "Home menu sub item 3-2",
            },
        ]
    },
];

const Home: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Setting menu left..");
        dispatch(setMenuLeftItems(homeMenuLeftItems));
    }, [])

    return (
        <div>
            <h1>This is page called HOME</h1>
            <Outlet />
        </div>
    )
}

export default Home;