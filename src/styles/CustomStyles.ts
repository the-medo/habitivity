/* eslint-disable @typescript-eslint/naming-convention */
import { generate } from '@ant-design/colors';

/* https://ant.design/docs/spec/colors */
const primaryColors = generate('#1da57a');

export const COLORS = {
  PRIMARY: primaryColors[5],
  PRIMARY_LIGHT: primaryColors[0],
  PRIMARY_DARK: primaryColors[8],
  PRIMARY_STEPS: primaryColors,
  WHITE: 'white',
  GREY: 'grey',
  GREY_BORDER: '#f4f4f4',
  GREY_LIGHT: '#fafafa',
  GREY_MEDIUM: '#d9d9d9',
  GREY_DARK: 'darkgrey',
  GREY_MENU_BORDER: 'rgba(5, 5, 5, 0.06)',
  BACKGROUND: '#fff',
  BLUE_LIGHT: '#cdd9ee',
  BLUE_GREY_DARK: 'rgb(77 92 106)',
  BLUE_DARK: '#001529',
};

export const STYLE = {
  //restyling ant design components
  PRIMARY_COLOR: COLORS.PRIMARY,
  HEADING_COLOR: COLORS.PRIMARY_DARK,
  MENU_ITEM_ACTIVE_BG: 'transparent',
  MENU_DARK_ITEM_ACTIVE_BG: 'transparent',
  MENU_ITEM_PADDING_HORIZONTAL: 100,
  MENU_ITEM_PADDING: '.25rem',
  MENU_ITEM_HEIGHT: '1.5rem',
  MENU_ITEM_COLOR: COLORS.PRIMARY_DARK,
  MENU_HIGHLIGHT_COLOR: COLORS.PRIMARY_DARK,
  BODY_BACKGROUND: COLORS.BACKGROUND,
  BORDER_COLOR_SPLIT: COLORS.GREY_BORDER,
  LAYOUT_BODY_BACKGROUND: COLORS.BACKGROUND,
  FONT_SIZE_BASE: '1rem', //fcks up dropdown menu (??)
  LINE_HEIGHT_BASE: 1.5,

  COLORPICKER_WIDTH: 276,
  COLORPICKER_HEIGHT: 100,
  ICONPICKER_WIDTH: 480,
  ICONPICKER_HEIGHT: 200,

  //other
  BASE_SHADOW: `0 0 5px 2px rgba(0,0,0,0.1)`,
}; /* rest of the sizes are in REM */

export const SIDER_COLLAPSED_SIZE = 3;
export const LEFT_MENU_WIDTH = 13;
export const RIGHT_DRAWER_WIDTH = 13;
export const TOP_MENU_SMALL = 3;
export const TOP_MENU_BIG = 4;
