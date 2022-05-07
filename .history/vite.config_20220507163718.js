/*
 * @Author: gongnan
 * @Date: 2022-04-24 09:52:29
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-07 16:37:18
 * @Description: file content
 * @FilePath: \front\vite.config.js
 */
import {
	defineConfig
} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// gzip压缩
import compressPlugin from 'vite-plugin-compression'
// 按需加载样式
import {
	createStyleImportPlugin,
	VxeTableResolve
} from 'vite-plugin-style-import'
// 自动导入
import AutoImport from "unplugin-auto-import/vite"
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		createStyleImportPlugin({
			resolves: [
				VxeTableResolve()
			]
		}),
		AutoImport({
			// 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
			// 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
			imports: ['vue']
		}),
		compressPlugin({
			ext: '.gz', //gz br
			algorithm: 'gzip', //brotliCompress gzip
			deleteOriginFile: true
		})
	],
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
			plugins: [{
				postcssPlugin: 'internal:charset-removal',
				AtRule: {
					charset: (atRule) => {
						if (atRule.name === 'charset') {
							atRule.remove();
						}
					}
				}
			}],
		},
	},
})
