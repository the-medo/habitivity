import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {MenuLeftItem} from "../components/menu/MenuLeft/MenuLeft";
import {useDispatch} from "react-redux";
import {setMenuLeftItems} from "../store/menuSlice";
import {IconType} from "../components/icons/icons";

const calendarMenuLeftItems: MenuLeftItem[] = [
    {
        key: "cal1",
        to: "/calendar/page-1",
        label: "Calendar menu item1",
        isDefault: true,
        icon: IconType.HomeTwoTone,
        childItems: [
            {
                key: "cal1-1",
                to: "1",
                label: "Calendar menu sub item 1-1",
            },
            {
                key: "cal1-2",
                to: "2",
                label: "Calendar menu sub item 1-2",
            },
        ]
    },
    {
        key: "cal2",
        to: "/calendar/page-2",
        label: "Calendar menu item2",
        childItems: [
            {
                key: "cal2-1",
                to: "1",
                label: "Calendar menu sub item 2-1",
            },
            {
                key: "cal2-2",
                to: "2",
                label: "Calendar menu sub item 2-2",
            },
        ]
    },
    {
        key: "cal3",
        to: "/calendar/page-3",
        label: "Calendar menu item3",
        childItems: [
            {
                key: "cal3-1",
                to: "1",
                label: "Calendar menu sub item 3-1",
            },
            {
                key: "cal3-2",
                to: "2",
                label: "Calendar menu sub item 3-2",
            },
        ]
    },
];

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