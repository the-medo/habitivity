import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuLeftItem } from '../components/menu/MenuLeft/MenuLeft';
import { getItem, LSKey, setItem } from './localStore';
import { RightDrawerStatus } from '../components/menu/DrawerRight/RightDrawer';

export interface MenuLeftState {
  leftMenuAutomaticallyCollapsed: boolean;
  leftMenuManuallyCollapsed: boolean;
  items: MenuLeftItem[];
  itemsSelectedInitialized: boolean;
  itemsSelected: Record<string, boolean | undefined>;

  rightDrawerStatus: RightDrawerStatus;
}

const initialState: MenuLeftState = {
  leftMenuAutomaticallyCollapsed: false,
  leftMenuManuallyCollapsed: getItem(LSKey.MENU_COLLAPSED) ?? false,
  items: [],
  itemsSelectedInitialized: getItem(LSKey.SELECTED_TASK_GROUPS) !== undefined,
  itemsSelected: getItem(LSKey.SELECTED_TASK_GROUPS) ?? {},
  rightDrawerStatus: getItem(LSKey.RIGHT_DRAWER_COLLAPSED) ?? 'opened',
};

export const menuSlice = createSlice({
  name: 'menu-left',
  initialState,
  reducers: {
    setLeftMenuAutomaticallyCollapsed: (state, action: PayloadAction<boolean>) => {
      state.leftMenuAutomaticallyCollapsed = action.payload;
    },
    toggleLeftMenuManuallyCollapsed: state => {
      const newCollapsedValue = !state.leftMenuManuallyCollapsed;
      state.leftMenuManuallyCollapsed = newCollapsedValue;
      setItem(LSKey.MENU_COLLAPSED, newCollapsedValue);
    },
    setMenuLeftItems: (state, action: PayloadAction<MenuLeftItem[]>) => {
      state.items = [...action.payload];
    },
    setVisibilityOfRightDrawer: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.rightDrawerStatus = 'opened';
      } else {
        state.rightDrawerStatus = 'hidden';
      }
    },
    setItemsSelectedInitialized: (state, action: PayloadAction<true>) => {
      state.itemsSelectedInitialized = action.payload;
    },
    setItemsSelected: (state, action: PayloadAction<string[]>) => {
      Object.keys(state.itemsSelected).forEach(i => {
        if (!action.payload.includes(i)) {
          state.itemsSelected[i] = false;
        }
      });

      action.payload.forEach(i => {
        state.itemsSelected[i] = true;
      });

      setItem(LSKey.SELECTED_TASK_GROUPS, state.itemsSelected);
    },
    itemSelect: (state, action: PayloadAction<string>) => {
      state.itemsSelected[action.payload] = true;

      setItem(LSKey.SELECTED_TASK_GROUPS, state.itemsSelected);
    },
    itemDeselect: (state, action: PayloadAction<string>) => {
      state.itemsSelected[action.payload] = false;

      setItem(LSKey.SELECTED_TASK_GROUPS, state.itemsSelected);
    },
    setRightDrawerStatus: (state, action: PayloadAction<RightDrawerStatus>) => {
      let newStatus = action.payload;

      if (newStatus === 'automaticallyOpened') {
        if (state.rightDrawerStatus === 'collapsed') {
          newStatus = 'collapsed';
        } else {
          newStatus = 'opened';
        }
      } else if (newStatus === 'automaticallyCollapsed') {
        if (state.rightDrawerStatus === 'openedByForce') {
          newStatus = 'openedByForce';
        }
      } else if (newStatus === 'opened') {
        if (
          state.rightDrawerStatus === 'automaticallyCollapsed' ||
          state.rightDrawerStatus === 'openedByForce'
        ) {
          newStatus = 'openedByForce';
        }
      } else if (newStatus === 'collapsed') {
        //no change of status
      }
      setItem(LSKey.RIGHT_DRAWER_COLLAPSED, newStatus);

      state.rightDrawerStatus = newStatus;
    },
  },
});

export const {
  setLeftMenuAutomaticallyCollapsed,
  toggleLeftMenuManuallyCollapsed,
  setMenuLeftItems,
  setItemsSelected,
  setItemsSelectedInitialized,
  itemSelect,
  itemDeselect,
  setRightDrawerStatus,
} = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
