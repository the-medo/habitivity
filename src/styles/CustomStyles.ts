import {generate} from "@ant-design/colors";

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
    BACKGROUND: '#fff',
    BLUE_LIGHT: '#cdd9ee',
    BLUE_DARK: 'rgb(77 92 106)',
}

export const STYLE = {
    //restyling ant design components
    PRIMARY_COLOR: COLORS.PRIMARY,
    HEADING_COLOR: COLORS.PRIMARY_DARK,
    MENU_ITEM_ACTIVE_BG: 'transparent',
    MENU_DARK_ITEM_ACTIVE_BG: 'transparent',
    MENU_ITEM_PADDING_HORIZONTAL: '.1rem',
    MENU_ITEM_PADDING: '.25rem',
    MENU_ITEM_HEIGHT: '1.5rem',
    MENU_ITEM_COLOR: COLORS.PRIMARY_DARK,
    MENU_HIGHLIGHT_COLOR: COLORS.PRIMARY_DARK,
    BODY_BACKGROUND: COLORS.BACKGROUND,
    BORDER_COLOR_SPLIT: COLORS.GREY_BORDER,
    LAYOUT_BODY_BACKGROUND: COLORS.BACKGROUND,
    FONT_SIZE_BASE: '1rem', //fcks up dropdown menu (??)
    LINE_HEIGHT_BASE: 1.5,

    //other
    BASE_SHADOW: `0 0 10px 2px rgba(0,0,0,0.3)`,

};