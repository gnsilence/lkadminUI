import axios from 'axios'
import {
	ElMessageBox,
	ElMessage
} from 'element-plus'
import sysConfig from '@/config'
import tool from '@/utils/tool'
import router from '@/router'
import {
	save
} from "./recorderror";
axios.defaults.baseURL = ''

axios.defaults.timeout = sysConfig.TIMEOUT

// HTTP request 拦截器
axios.interceptors.request.use(
	(config) => {
		const token = tool.data.get('TOKEN')
		const reftoken = tool.data.get('x-token')
		if (token) {
			config.headers[sysConfig.TOKEN_NAME] = sysConfig.TOKEN_PREFIX + token
		}
		if (reftoken) {
			config.headers['X-Authorization'] = sysConfig.TOKEN_PREFIX + reftoken
		}
		if (!sysConfig.REQUEST_CACHE && config.method === 'get') {
			config.params = config.params || {}
			config.params['_'] = new Date().getTime()
		}
		Object.assign(config.headers, sysConfig.HEADERS)
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// HTTP response 拦截器
axios.interceptors.response.use(
	(response) => {
		if (response.headers['access-token']) {
			tool.data.set('TOKEN', response.headers['access-token'])
		}
		if (response.headers['x-access-token']) {
			tool.data.set('x-token', response.headers['x-access-token'])
		}
		if (response.data && response.data.code === 400) {
			ElMessage.error({
				title: '请求错误',
				message: 'Status:400，！'
			})
			return false
		}
		return response
	},
	(error) => {
		if (error.response) {
			if (error.response.status === 404) {
				ElMessage.error({
					title: '请求错误',
					message: 'Status:404，正在请求不存在的服务器记录！'
				})
			} else if (error.response.status === 400) {
				ElMessage.error({
					title: '请求错误',
					message: error.response.message || 'Status:400，服务调用发生错误！'
				})
			} else if (error.response.status === 500) {
				ElMessage.error({
					title: '请求错误',
					message: error.response.data.message || 'Status:500，服务器发生错误！'
				})
			} else if (error.response.status === 401) {
				ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
					type: 'error',
					closeOnClickModal: false,
					center: true,
					confirmButtonText: '重新登录'
				}).then(() => {
					router.replace({
						path: '/login'
					})
				}).catch(() => {})
			} else {
				ElMessage.error({
					title: '请求错误',
					message: error.response.data.message || `Status:${error.response.status}，未知错误！`
				})
			}
		} else {
			ElMessage.error({
				title: '请求错误',
				message: '请求服务器无响应！'
			})
		}
		save()
		return Promise.reject(error.response)
	}
)

var http = {

	/** get 请求
	 * @param  {string} url
	 * @param  {请求参数} params
	 * @param  {{responseType: string}} config
	 */
	get: function (url, params = {}, config = {}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: url,
				params: params,
				...config
			}).then((response) => {
				resolve(response.data)
			}).catch((error) => {
				reject(error)
			})
		})
	},

	/** post 请求
	 * @param  {string} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	post: function (url, data = {}, config = {}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data)
			}).catch((error) => {
				reject(error)
			})
		})
	},

	/** put 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	put: function (url, data = {}, config = {}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'put',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data)
			}).catch((error) => {
				reject(error)
			})
		})
	},

	/** patch 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	patch: function (url, data = {}, config = {}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'patch',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data)
			}).catch((error) => {
				reject(error)
			})
		})
	},

	/** delete 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	delete: function (url, data = {}, config = {}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'delete',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data)
			}).catch((error) => {
				reject(error)
			})
		})
	},

	/** jsonp 请求
	 * @param  {接口地址} url
	 * @param  {JSONP回调函数名称} name
	 */
	jsonp: function (url, name = 'jsonp') {
		return new Promise((resolve) => {
			var script = document.createElement('script')
			var _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
			script.id = _id
			script.type = 'text/javascript'
			script.src = url
			window[name] = (response) => {
				resolve(response)
				document.getElementsByTagName('head')[0].removeChild(script)
				try {
					delete window[name]
				} catch (e) {
					window[name] = undefined
				}
			}
			document.getElementsByTagName('head')[0].appendChild(script)
		})
	}
}

export default http
