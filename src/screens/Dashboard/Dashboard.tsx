import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {MenuLeftItem} from "../../components/menu/MenuLeft/MenuLeft";
import {useDispatch} from "react-redux";
import {setMenuLeftItems} from "../../store/menuSlice";

export const dashboardMenuLeftItems: MenuLeftItem[] = [];

const Dashboard: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Setting menu left..");
        dispatch(setMenuLeftItems(dashboardMenuLeftItems));
    }, [])


    return (
        <div>
            <h1>This is page called DASHBOARD</h1>
            <Outlet />
        </div>
    )
}

export default Dashboard;