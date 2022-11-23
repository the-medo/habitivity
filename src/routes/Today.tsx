import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {MenuLeftItem} from "../components/menu/MenuLeft/MenuLeft";
import {setMenuLeftItems} from "../store/menuSlice";
import {useDispatch} from "react-redux";
import {IconType} from "../components/icons/icons";


const todayMenuLeftItems: MenuLeftItem[] = [
    {
        key: "today1",
        to: "/today/edit",
        label: "Home menu item1",
        isDefault: true,
        icon: IconType.HomeOutlined,
        childItems: []
    },
];

const Today: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMenuLeftItems(todayMenuLeftItems));
    }, []);



    return (
        <div>
            <h1>This is page called TODAY</h1>
            <Outlet />
        </div>
    )
}

export default Today;