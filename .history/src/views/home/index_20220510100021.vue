<!--
 * @Author: gongnan
 * @Date: 2022-04-24 10:29:59
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-10 10:00:21
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
	<work v-if="dashboard=='1'" @on-mounted="onMounted"></work>
	<widgets v-else @on-mounted="onMounted"></widgets>
</div>
	<el-backtop target=".container" :visibility-height="300" :bottom="100" :right="20">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
    </div>
  </el-backtop>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	const work = defineAsyncComponent(() => import('./work'));
	const widgets = defineAsyncComponent(() => import('./widgets'));

	export default {
		name: "dashboard",
		components: {
			work,
			widgets
		},
		data(){
			return {
				pageLoading: true,
				dashboard: '0'
			}
		},
		created(){
			this.dashboard = this.$TOOL.data.get("USER_INFO").dashboard || '0';
		},
		mounted(){

		},
		methods: {
			onMounted(){
				this.pageLoading = false
			}
		}
	}
</script>

<style scoped>
.container{
 height: 100%;
  overflow-x: hidden;
}
</style>
