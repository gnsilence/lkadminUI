/*
 * @Author: gongnan
 * @Date: 2022-04-24 09:52:29
 * @LastEditors: gongnan
 * @LastEditTime: 2022-04-24 09:58:22
 * @Description: file content
 * @FilePath: \front\vite.config.js
 */
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // https://cn.vitejs.dev/config/#resolve-alias
    alias: {
      // 设置路径
      '~': path.resolve(__dirname, './'),
      // 设置别名
      '@': path.resolve(__dirname, './src')
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  // vite 相关配置
  server: {
    port: 2888,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/api': {
        target: 'https://www.fastmock.site/mock/5039c4361c39a7e3252c5b55971f1bd3/api',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      }
    },
  },
  css: {
    postcss: {
      plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
      ],
    },
  },
})
