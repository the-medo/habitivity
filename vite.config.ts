import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'

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
        modifyVars: { //variable list: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
          'primary-color': '#1DA57A',
          'heading-color': '#f00',
          'font-size-base': '1rem',
          'font-size-lg': '1.25rem',
          'font-size-sm': '.75rem',
          'body-background': '#fff',
          'padding-lg': '1.5rem',
          'padding-md': '1rem',
          'padding-sm': '.75rem',
          'padding-xs': '.5rem',
          'padding-xxs': '.25rem',
          'margin-lg': '1.5rem',
          'margin-md': '1rem',
          'margin-sm': '.75rem',
          'margin-xs': '.5rem',
          'margin-xxs': '.25rem',

          //toto je nejaky bullshit :(
          // 'height-base': 'calc(2rem) * 1',
          // 'input-height-base': 'calc(2rem) * 1',
          // 'pagination-item-size': '2rem',
          // 'select-single-item-height-lg': '2rem',

          'height-lg': '2.5rem',
          'height-sm': '1.5rem',
          'btn-square-only-icon-size': '1.125rem',
          'btn-square-only-icon-size-lg': '1.375rem',
          'checkbox-size': '1rem',
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