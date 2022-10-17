import { resolve } from 'path';

import {
  defineConfig
} from 'vite'

import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  build: {
    outDir: 'docs'
  },
  plugins: [vue(), svgLoader({
    svgoConfig: {}
  })
  ],
  server: {
    port: 8888,
    proxy: {
      '/devapi': {
        target: 'xxxxxxxx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/devapi/, '')
      },
    }
  },
  resolve: {
    // 文件夹别名
    alias: [{
      find: '@',
      replacement: resolve(__dirname, '../src'),
    },
    {
      find: '@static',
      replacement: resolve(__dirname, '../public/static'),
    },
    {
      find: '@img',
      replacement: resolve(__dirname, '../src/assets/img'),
    },
    {
      find: '@css',
      replacement: resolve(__dirname, '../src/assets/css'),
    },
    {
      find: '@assets',
      replacement: resolve(__dirname, '../src/assets'),
    },
    {
      find: '@pinia',
      replacement: resolve(__dirname, '../src/pinia'),
    },
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@css/varuables.scss";`
      },
      less: {
        modifyVars: {
          'arcoblue-6': '#1d63ff',
        },
        javascriptEnabled: true,
      }
    }
  }
});