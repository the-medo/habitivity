import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MenuLeftItem} from "../components/menu/MenuLeft";
import {getItem, LSKey, setItem} from "./localStore";
import {RightDrawerStatus} from "../components/menu/RightDrawer";

export interface MenuLeftState {
    leftMenuAutomaticallyCollapsed: boolean,
    leftMenuManuallyCollapsed: boolean,
    items: MenuLeftItem[],
    rightDrawerStatus: RightDrawerStatus,
}

const initialState: MenuLeftState = {
    leftMenuAutomaticallyCollapsed: false,
    leftMenuManuallyCollapsed: getItem(LSKey.menuCollapsed) ?? false,
    items: [],
    rightDrawerStatus: getItem(LSKey.rightDrawerCollapsed) ?? "opened"
}

export const menuSlice = createSlice({
    name: 'menu-left',
    initialState,
    reducers: {
        setLeftMenuAutomaticallyCollapsed: (state, action: PayloadAction<boolean>) => {
            state.leftMenuAutomaticallyCollapsed = action.payload;
        },
        toggleLeftMenuManuallyCollapsed: (state) => {
            const newCollapsedValue = !state.leftMenuManuallyCollapsed;
            state.leftMenuManuallyCollapsed = newCollapsedValue;
            setItem(LSKey.menuCollapsed, newCollapsedValue)
        },
        setMenuLeftItems: (state, action: PayloadAction<MenuLeftItem[]>) => {
            state.items = [...action.payload];
        },
        setVisibilityOfRightDrawer:  (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.rightDrawerStatus = "opened";
            } else {
                state.rightDrawerStatus = "hidden";
            }
        },
        setRightDrawerStatus: (state, action: PayloadAction<RightDrawerStatus>) => {
            let newStatus = action.payload;

            if (newStatus === "automaticallyOpened") {
                if (state.rightDrawerStatus === "collapsed") {
                    newStatus = "collapsed";
                } else {
                    newStatus = "opened";
                }
            } else if (newStatus === "automaticallyCollapsed") {
                if (state.rightDrawerStatus === "openedByForce") {
                    newStatus = "openedByForce";
                }
            } else if (newStatus === "opened") {
                if (state.rightDrawerStatus === "automaticallyCollapsed" || state.rightDrawerStatus === "openedByForce") {
                    newStatus = "openedByForce";
                }
            } else if (newStatus === "collapsed") {
                //no change of status
            }
            setItem(LSKey.rightDrawerCollapsed, newStatus);

            state.rightDrawerStatus = newStatus;
        },

    }
});

export const {  setLeftMenuAutomaticallyCollapsed, toggleLeftMenuManuallyCollapsed, setMenuLeftItems, setRightDrawerStatus} = menuSlice.actions;

export const menuReducer = menuSlice.reducer;