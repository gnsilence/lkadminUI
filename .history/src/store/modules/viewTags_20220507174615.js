export default {
	state: {
		viewTags: localStorage.getItem('viewTags')||[]
	},
	mutations: {
		pushViewTags(state, route){
			let target = state.viewTags.find((item) => item.fullPath === route.fullPath)
			let isName = route.name
			if(!target && isName){
				state.viewTags.push(route)
				localStorage.setItem('viewTags', state.viewTags)
			}
		},
		removeViewTags(state, route){
			state.viewTags.forEach((item, index) => {
				if (item.fullPath === route.fullPath){
					state.viewTags.splice(index, 1)
					localStorage.setItem('viewTags', state.viewTags)
				}
			})
		},
		updateViewTags(state, route){
			state.viewTags.forEach((item) => {
				if (item.fullPath == route.fullPath){
					item = Object.assign(item, route)
				}
			})
			localStorage.setItem('viewTags', state.viewTags)
		},
		updateViewTagsTitle(state, title=''){
			const nowFullPath = location.hash.substring(1)
			state.viewTags.forEach((item) => {
				if (item.fullPath == nowFullPath){
					item.meta.title = title
				}
			})
			localStorage.setItem('viewTags', state.viewTags)
		},
		clearViewTags(state){
			state.viewTags = []
		}
	}
}
