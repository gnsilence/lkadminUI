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
	}
]

export default routes;
