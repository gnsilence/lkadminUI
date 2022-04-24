import config from '@/config'
import http from '@/utils/request'

export default {
	menu: {
		list: {
			url: `${config.API_URL}/sysMenu/tree`,
			addUrl: `${config.API_URL}/sysMenu/add`,
			editUrl: `${config.API_URL}/sysMenu/edit`,
			batchDeleteUrl: `${config.API_URL}/sysMenu/batchDelete`,
			name: '获取菜单',
			get: async function () {
				return await http.get(this.url)
			},
			add: async function (data) {
				return await http.post(this.addUrl, data)
			},
			edit: async function (data) {
				return await http.post(this.editUrl, data)
			},
			batchDelete: async function (data) {
				return await http.post(this.batchDeleteUrl, data)
			}
		}
	},
	dic: {
		tree: {
			url: `${config.API_URL}/sysDictType/tree`,
			addUrl: `${config.API_URL}/sysDictType/add`,
			editUrl: `${config.API_URL}/sysDictType/edit`,
			deleteUrl: `${config.API_URL}/sysDictType/delete`,
			name: '获取字典树',
			get: async function () {
				return await http.get(this.url)
			},
			add: async function (data) {
				return await http.post(this.addUrl, data)
			},
			edit: async function (data) {
				return await http.post(this.editUrl, data)
			},
			delete: async function (data) {
				return await http.post(this.deleteUrl, data)
			}
		},
		list: {
			url: `${config.API_URL}/sysDictData/page`,
			addUrl: `${config.API_URL}/sysDictData/add`,
			editUrl: `${config.API_URL}/sysDictData/edit`,
			deleteUrl: `${config.API_URL}/sysDictData/delete`,
			batchDeleteUrl: `${config.API_URL}/sysDictData/batchDelete`,
			changeStatusUrl: `${config.API_URL}/sysDictData/changeStatus`,
			name: '字典明细',
			get: async function (params) {
				return await http.get(this.url, params)
			},
			add: async function (data) {
				return await http.post(this.addUrl, data)
			},
			edit: async function (data) {
				return await http.post(this.editUrl, data)
			},
			delete: async function (data) {
				return await http.post(this.deleteUrl, data)
			},
			batchDelete: async function (data) {
				return await http.post(this.batchDeleteUrl, data)
			},
			changeStatus: async function (data) {
				return await http.post(this.changeStatusUrl, data)
			}
		},
		get: {
			url: `${config.API_URL}/sysDictData/detail`,
			name: '获取字典数据',
			get: async function (params) {
				return await http.get(this.url, params)
			}
		}
	},
	role: {
		list: {
			url: `${config.API_URL}/system/role/list`,
			name: '获取角色列表',
			get: async function (params) {
				return await http.get(this.url, params)
			}
		}
	},
	user: {
		list: {
			url: `${config.API_URL}/system/user/list`,
			name: '获取用户列表',
			get: async function (params) {
				return await http.get(this.url, params)
			}
		}
	},
	app: {
		list: {
			url: `${config.API_URL}/system/app/list`,
			name: '应用列表',
			get: async function () {
				return await http.get(this.url)
			}
		}
	},
	log: {
		list: {
			url: `${config.API_URL}/system/log/list`,
			name: '日志列表',
			get: async function (params) {
				return await http.get(this.url, params)
			}
		}
	},
	table: {
		list: {
			url: `${config.API_URL}/system/table/list`,
			name: '表格列管理列表',
			get: async function (params) {
				return await http.get(this.url, params)
			}
		},
		info: {
			url: `${config.API_URL}/system/table/info`,
			name: '表格列管理详情',
			get: async function (params) {
				return await http.get(this.url, params)
			}
		}
	}
}
