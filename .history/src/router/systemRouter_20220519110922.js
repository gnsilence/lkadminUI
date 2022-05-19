/*
 * @Author: gongnan
 * @Date: 2022-04-24 10:29:59
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-19 11:09:22
 * @Description: file content
 * @FilePath: \front\src\router\systemRouter.js
 */
import config from "@/config"

//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: config.DASHBOARD_URL || '/dashboard',
		children: []
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */ '@/views/userCenter/login'),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/bigData",
		component: () => import( /* webpackChunkName: "bigData" */ '@/views/bigData/index'),
		meta: {
			title: "数据看板"
		}
	},
	{
		path: "/playdebug",
		component: () => import( /* webpackChunkName: "bigData" */ '@/views/other/logplayer'),
		meta: {
			title: "远程debug回放"
		}
	},
	{
		path: "/ossupload",
		component: () => import( /* webpackChunkName: "upload" */ '@/views/template/ossupload'),
		meta: {
			title: "Oss文件上传"
		}
	}
]

export default routes;
