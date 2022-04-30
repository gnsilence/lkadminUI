/*
 * @Author: gongnan
 * @Date: 2022-04-24 09:52:29
 * @LastEditors: gongnan
 * @LastEditTime: 2022-04-24 09:59:09
 * @Description: file content
 * @FilePath: \front\src\api\model\auth.js
 */
import config from '@/config'
import http from '@/utils/request'

export default {
	token: {
		url: `${config.API_URL}/login`,
		name: '登录获取TOKEN',
		post: async function (data = {}) {
			return await http.post(this.url, data)
		}
	},
	wechatlogin: {
		url: `${config.API_URL}/wechatlogin`,
		name: '企业微信登录获取TOKEN',
		get: async function (params) {
			return await http.get(this.url, params)
		}
	},
	getLoginUser: {
		url: `${config.API_URL}/getLoginUser`,
		name: '获取用户信息',
		get: async function (data = {}) {
			return await http.get(this.url)
		}
	},
	clearUserCache: {
		url: `${config.API_URL}/clearUserCache`,
		name: '清除缓存',
		get: async function (data = {}) {
			return await http.get(this.url)
		}
	},
	systemUseInfo: {
		url: `${config.API_URL}/sysMachine/use`,
		name: '系统运行信息',
		get: async function (data = {}) {
			return await http.get(this.url)
		}
	},
	systemInfo: {
		url: `${config.API_URL}/sysMachine/base`,
		name: '系统基本信息',
		get: async function (data = {}) {
			return await http.get(this.url)
		}
	}
}
