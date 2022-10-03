import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MenuLeftItem} from "../components/menu/MenuLeft";

export interface MenuLeftState {
    multiselect: boolean,
    sliderCollapsed: boolean,
    sliderManuallyCollapsed: boolean,
    items: MenuLeftItem[],
}

const initialState: MenuLeftState = {
    multiselect: false,
    sliderCollapsed: false,
    sliderManuallyCollapsed: false,
    items: [],
}

export const menuLeftSlice = createSlice({
    name: 'menu-left',
    initialState,
    reducers: {
        setMultiselect: (state, action: PayloadAction<boolean>) => {
            state.multiselect = action.payload;
        },
        setSliderCollapsed: (state, action: PayloadAction<boolean>) => {
            state.sliderCollapsed = action.payload;
        },
        toggleSliderManuallyCollapsed: (state) => {
            state.sliderManuallyCollapsed = !state.sliderManuallyCollapsed;
        },
        setMenuLeftItems: (state, action: PayloadAction<MenuLeftItem[]>) => {
            state.items = [...action.payload];
        },
    }
});

export const { setMultiselect, setSliderCollapsed, toggleSliderManuallyCollapsed, setMenuLeftItems } = menuLeftSlice.actions;

export const menuLeftReducer = menuLeftSlice.reducer;