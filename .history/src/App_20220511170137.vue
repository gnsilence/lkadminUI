<!--
 * @Author: gongnan
 * @Date: 2022-05-05 09:30:02
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-11 17:01:37
 * @Description: file content
 * @FilePath: \front\src\App.vue
-->
<template>
	<el-config-provider :locale="$i18n.messages[$i18n.locale].el" :button="{autoInsertSpace: false}">
		<router-view></router-view>
	</el-config-provider>
</template>

<script>
	import colorTool from '@/utils/color'
	import timer from '@/utils/timer'
	// import * as echarts from 'echarts'
	// import {
	// 	provide,
	// 	onMounted,
	// 	getCurrentInstance,
	// 	onBeforeUnmount
	// } from 'vue'
	export default {
		name: 'App',
		setup() {
			// provide('ec', echarts)
			onBeforeUnmount(() => timer && clearInterval(timer))
			const {
				appContext
			} = getCurrentInstance()
			const _this = appContext.config.globalProperties
			const initSetting = () => {
				const app_color = _this.$TOOL.data.get('APP_COLOR') || _this.$CONFIG.COLOR
				if (app_color) {
					document.documentElement.style.setProperty('--el-color-primary', app_color);
					for (let i = 1; i <= 9; i++) {
						document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(app_color, i / 10));
					}
					document.documentElement.style.setProperty(`--el-color-primary-darken-1`, colorTool.darken(app_color, 0.1));
				}
			}
			initSetting()
			onMounted(() => {})
		}
	}
</script>

<style lang="scss">
	@import '@/style/style.scss';
	@import '@/style/theme/dark.scss';
	// @import '@/style/theme/vextable.scss';
</style>
