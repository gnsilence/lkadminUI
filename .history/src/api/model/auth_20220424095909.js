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
	}
}
