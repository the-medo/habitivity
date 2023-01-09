import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '../helpers/types/Position';
import { CSSProperties } from 'react';

export enum PickerType {
  COLOR,
  ICON,
}

export interface AppState {
  pickerOpened?: PickerType;
  pickerPosition?: Position;
  color?: CSSProperties['color'];
  icon?: {
    icon?: string;
    title?: string;
    description?: string;
  };
}

const initialState: AppState = {
  pickerOpened: undefined,
  pickerPosition: undefined,
  color: undefined,
  icon: undefined,
};

type SetPickerPayload =
  | {
      pickerOpened: PickerType.COLOR;
      pickerPosition: AppState['pickerPosition'];
      color: AppState['color'];
    }
  | {
      pickerOpened: PickerType.ICON;
      pickerPosition: AppState['pickerPosition'];
      icon: AppState['icon'];
    }
  | undefined;

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPicker: (state, action: PayloadAction<SetPickerPayload>) => {
      if (action.payload) {
        state.pickerOpened = action.payload.pickerOpened;
        state.pickerPosition = action.payload.pickerPosition;
        if (action.payload.pickerOpened === PickerType.COLOR) {
          state.color = action.payload.color;
          state.icon = undefined;
        }
        if (action.payload.pickerOpened === PickerType.ICON) {
          state.color = undefined;
          state.icon = action.payload.icon;
        }
      } else {
        state.pickerOpened = undefined;
        state.pickerPosition = undefined;
        state.color = undefined;
        state.icon = undefined;
      }
    },
    setColor: (state, action: PayloadAction<AppState['color']>) => {
      state.color = action.payload;
    },
    setIcon: (state, action: PayloadAction<AppState['icon']>) => {
      state.icon = action.payload;
    },
  },
});

export const { setPicker, setColor, setIcon } = appSlice.actions;

export const appReducer = appSlice.reducer;
