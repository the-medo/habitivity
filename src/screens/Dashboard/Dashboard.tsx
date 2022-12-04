import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {MenuLeftItem} from "../../components/menu/MenuLeft/MenuLeft";
import {useDispatch} from "react-redux";
import {setMenuLeftItems} from "../../store/menuSlice";
import {Header1} from "../../components/global/Headers";

export const dashboardMenuLeftItems: MenuLeftItem[] = [];

const Dashboard: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Setting menu left..");
        dispatch(setMenuLeftItems(dashboardMenuLeftItems));
    }, [])


    return (
        <div>
            <Header1>This is page called DASHBOARD</Header1>
            <Outlet />
        </div>
    )
}

export default Dashboard;