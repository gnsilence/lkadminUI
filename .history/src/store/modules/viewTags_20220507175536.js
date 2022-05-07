/*
 * @Author: gongnan
 * @Date: 2022-04-24 10:29:59
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-07 17:55:36
 * @Description: file content
 * @FilePath: \front\src\store\modules\viewTags.js
 */
import tool from "@/utils/tool";
export default {
	state: {
		viewTags: tool.data.get('viewTags')||[]
	},
	mutations: {
		pushViewTags(state, route){
			let target = state.viewTags.find((item) => item.fullPath === route.fullPath)
			let isName = route.name
			if(!target && isName){
				state.viewTags.push(route)
				tool.data.set('viewTags', state.viewTags)
			}
		},
		removeViewTags(state, route){
			state.viewTags.forEach((item, index) => {
				if (item.fullPath === route.fullPath){
					state.viewTags.splice(index, 1)
					tool.data.set('viewTags', state.viewTags)
				}
			})
		},
		updateViewTags(state, route){
			state.viewTags.forEach((item) => {
				if (item.fullPath == route.fullPath){
					item = Object.assign(item, route)
				}
			})
			tool.data.set('viewTags', state.viewTags)
		},
		updateViewTagsTitle(state, title=''){
			const nowFullPath = location.hash.substring(1)
			state.viewTags.forEach((item) => {
				if (item.fullPath == nowFullPath){
					item.meta.title = title
				}
			})
			tool.data.set('viewTags', state.viewTags)
		},
		clearViewTags(state){
			state.viewTags = []
			tool.data.remove('viewTags')
		}
	}
}
