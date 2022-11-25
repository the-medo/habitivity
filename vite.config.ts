import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'
import {STYLE} from "./src/styles/CustomStyles";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true
  },
  css: {
    devSourcemap: true,
    preprocessorOptions:{
      less: {
        modifyVars: { //variable list: https://github.com/ant-design/ant-design/blob/4.24.3/components/style/themes/default.less
          'primary-color': STYLE.PRIMARY_COLOR,
          'heading-color': STYLE.HEADING_COLOR,
          'menu-item-active-bg': STYLE.MENU_ITEM_ACTIVE_BG,
          'menu-dark-item-active-bg': STYLE.MENU_DARK_ITEM_ACTIVE_BG,
          'menu-item-padding-horizontal': STYLE.MENU_ITEM_PADDING_HORIZONTAL,
          'menu-item-padding': STYLE.MENU_ITEM_PADDING,
          'menu-item-height': STYLE.MENU_ITEM_HEIGHT,
          'menu-item-color': STYLE.MENU_ITEM_COLOR,
          'menu-highlight-color': STYLE.MENU_HIGHLIGHT_COLOR,
          'border-color-split': STYLE.BORDER_COLOR_SPLIT,
          // 'font-size-base': '1rem',
          // 'font-size-lg': '1.25rem',
          // 'font-size-sm': '.75rem',
          'body-background': STYLE.BODY_BACKGROUND,
          // 'padding-lg': '1.5rem',
          // 'padding-md': '1rem',
          // 'padding-sm': '.75rem',
          // 'padding-xs': '.5rem',
          // 'padding-xxs': '.25rem',
          // 'margin-lg': '1.5rem',
          // 'margin-md': '1rem',
          // 'margin-sm': '.75rem',
          // 'margin-xs': '.5rem',
          // 'margin-xxs': '.25rem',

          //toto je nejaky bullshit :(
          // 'height-base': 'calc(2rem) * 1',
          // 'input-height-base': 'calc(2rem) * 1',
          // 'pagination-item-size': '2rem',
          // 'select-single-item-height-lg': '2rem',

          // 'height-lg': '2.5rem',
          // 'height-sm': '1.5rem',
          // 'btn-square-only-icon-size': '1.125rem',
          // 'btn-square-only-icon-size-lg': '1.375rem',
          // 'checkbox-size': '1rem',
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    sourcemap: true
  }
})


/*
,
    watch: {
      usePolling: true
    }
 */