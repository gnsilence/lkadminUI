<!--
 * @Author: gongnan
 * @Date: 2022-05-10 11:15:15
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-10 11:17:31
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
	<div>
		<div v-if="pageLoading">
			<el-main class="container">
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
	const work = defineAsyncComponent(() =>
		import ('./work'));
	const widgets = defineAsyncComponent(() =>
		import ('./widgets'));
	export default {
		name: "dashboard",
		components: {
			work,
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
	.container {
		height: 100%;
		overflow-x: hidden;
	}
</style>
