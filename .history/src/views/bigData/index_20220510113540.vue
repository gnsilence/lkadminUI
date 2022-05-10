<!--
 * @Author: gongnan
 * @Date: 2022-05-10 11:15:15
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-10 11:35:40
 * @Description: file content
 * @FilePath: \front\src\views\bigData\index.vue
-->
<!--
 * @Author: gongnan
 * @Date: 2022-04-24 10:29:59
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-10 10:07:19
 * @Description: file content
 * @FilePath: \front\src\views\home\index.vue
-->
<template>
	<div style="overflow-x:hidden;overflow-y:hidden;scrollbar-width: 1px;" class="wighcontainer">
		<div v-if="pageLoading">
			<el-main>
				<el-card shadow="never">
					<el-skeleton :rows="1"></el-skeleton>
				</el-card>
				<el-card shadow="never" style="margin-top: 15px;">
					<el-skeleton></el-skeleton>
				</el-card>
			</el-main>
		</div>
		<widgets @on-mounted="onMounted"></widgets>
	</div>
</template>

<script>
	import {
		defineAsyncComponent
	} from 'vue';
	const widgets = defineAsyncComponent(() =>
		import ('./widgets'));
	export default {
		name: "dashboard",
		components: {
			widgets
		},
		data() {
			return {
				pageLoading: true,
				dashboard: '0'
			}
		},
		created() {
			this.dashboard = this.$TOOL.data.get("USER_INFO").dashboard || '0';
		},
		mounted() {
		},
		methods: {
			onMounted() {
				this.pageLoading = false
			}
		}
	}
</script>

<style scoped>
</style>
