<!--
 * @Author: gongnan
 * @Date: 2022-04-29 16:07:14
 * @LastEditors: gongnan
 * @LastEditTime: 2022-04-29 16:07:41
 * @Description: file content
 * @FilePath: \front\src\views\home\widgets\components\task.vue
-->
<template>
	<el-card shadow="hover" header="时钟" class="item-background">
		<div class="time">
			<h2>{{ time }}</h2>
			<p>{{ day }}</p>
		</div>
	</el-card>
</template>

<script>
	export default {
		title: "代办任务",
		icon: "el-icon-clock",
		description: "待处理的流程",
		data() {
			return {
				time: '',
				day: ''
			}
		},
		mounted() {
			this.showTime()
			setInterval(()=>{
				this.showTime()
			},1000)
		},
		methods: {
			showTime(){
				this.time = this.$TOOL.dateFormat(new Date(), 'hh:mm:ss')
				this.day = this.$TOOL.dateFormat(new Date(), 'yyyy年MM月dd日')
			}
		}
	}
</script>

<style scoped>
	.item-background {background: linear-gradient(to right, #8E54E9, #4776E6);color: #fff;}
	.time h2 {font-size: 40px;}
	.time p {font-size: 14px;margin-top: 13px;opacity: 0.7;}
</style>
