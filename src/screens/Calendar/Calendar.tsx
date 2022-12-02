import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {MenuLeftItem} from "../../components/menu/MenuLeft/MenuLeft";
import {useDispatch} from "react-redux";
import {setMenuLeftItems} from "../../store/menuSlice";

const calendarMenuLeftItems: MenuLeftItem[] = [];

const Calendar: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Setting menu left..");
        dispatch(setMenuLeftItems(calendarMenuLeftItems));
    }, [])


    return (
        <div>
            <h1>This is page called CALENDAR</h1>
            <Outlet />
        </div>
    )
}

export default Calendar;