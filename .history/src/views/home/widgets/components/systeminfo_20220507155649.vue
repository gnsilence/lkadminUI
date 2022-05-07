<template>
	<el-card class="chartinfo" shadow="hover" header="系统信息" v-loading="loading">
		<div>
			<div class="tips">
				<div class="tips-item">
					<div class="tips-item-icon">
						<el-icon>
							<el-icon-menu/></el-icon>
					</div>
					<div class="tips-item-message">操作系统: {{SystemInfo.systemOs}}</div>
				</div>
				<div class="tips-item">
					<div class="tips-item-icon">
						<el-icon>
							<el-icon-promotion/></el-icon>
					</div>
					<div class="tips-item-message">框架版本: {{SystemInfo.frameworkDescription}}</div>
				</div>
				<div class="tips-item">
					<div class="tips-item-icon">
						<el-icon>
							<el-icon-milk-tea/></el-icon>
					</div>
					<div class="tips-item-message">当前IP：{{SystemInfo.wanIp}}</div>
				</div>
			</div>
		</div>
		<scEcharts ref="c1" height="300px" :option="option"></scEcharts>
	</el-card>
</template>

<script>
	import scEcharts from '@/components/scEcharts';
	// import {
	// 	inject,
	// 	onMounted,
	// 	ref,
	// 	reactive,
	// 	getCurrentInstance,
	// 	onDeactivated
	// } from "vue"
	import {
		useDraggable
	} from '@vueuse/core'
	import useTimeExecutor from '@/hooks/useTimeExecutor'
	export default {
		title: "系统信息",
		icon: "el-icon-data-line",
		description: "Echarts组件演示",
		components: {
			scEcharts
		},
		setup(props, context) {
			const c1 = ref()
			const {
				appContext
			} = getCurrentInstance()
			const {
				x,
				y,
				style
			} = useDraggable(c1, {
				initialValue: {
					x: 40,
					y: 40
				},
			})
			const _this = appContext.config.globalProperties
			const option = ref({})
			const SystemInfo = ref({})
			const gaugeData = reactive([{
					value: 20,
					name: 'CPU',
					title: {
						offsetCenter: ['0%', '-38%']
					},
					detail: {
						valueAnimation: true,
						offsetCenter: ['0%', '-20%']
					}
				},
				{
					value: 40,
					name: '内存',
					title: {
						offsetCenter: ['0%', '30%']
					},
					detail: {
						valueAnimation: true,
						offsetCenter: ['0%', '10%']
					}
				}
			])
			const loading = ref(false)
			option.value = {
				series: [{
					type: 'gauge',
					startAngle: 90,
					endAngle: -270,
					pointer: {
						show: false
					},
					progress: {
						show: true,
						overlap: false,
						roundCap: true,
						clip: false,
						itemStyle: {
							borderWidth: 1,
							borderColor: '#464646'
						}
					},
					axisLine: {
						lineStyle: {
							width: 40
						}
					},
					splitLine: {
						show: false,
						distance: 0,
						length: 10
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false,
						distance: 50
					},
					data: gaugeData,
					title: {
						fontSize: 14
					},
					detail: {
						width: 50,
						height: 14,
						fontSize: 14,
						color: 'auto',
						borderColor: 'auto',
						borderRadius: 20,
						borderWidth: 1,
						formatter: '{value}%'
					}
				}]
			}
			// 获取服务器系统基础信息
			const getSysteminfo = async() => {
				var res = await _this.$API.auth.systemInfo.get()
				if (res.success) {
					SystemInfo.value = res.data
				}
			}
			// 获取系统cpu,内存使用情况
			const loadData = async() => {
				var res = await _this.$API.auth.systemUseInfo.get()
				gaugeData[0].value = res.data.cpuRate
				gaugeData[1].value = res.data.ramRate
				var o = option.value;
				o.data = gaugeData
			}
			// 使用hooks, 表示每隔5秒会执行loadData去更新数据
			const {
				pause,
				play,
				isLoading
			} = useTimeExecutor({
				second: 5,
				func: loadData
			})
			onMounted(async() => {
				await getSysteminfo()
			})
			onDeactivated(() => {})
			return {
				option,
				getSysteminfo,
				SystemInfo
			}
		}
	}
</script>

<style scoped>
	.tips {
		margin-top: 20px;
		padding: 0 40px;
	}
	.tips-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 7.5px 0;
	}
	.tips-item-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 18px;
		margin-right: 20px;
		color: var(--el-color-primary);
		background: rgba(180, 180, 180, 0.1);
	}
	.tips-item-message {
		flex: 1;
		font-size: 14px;
	}
	.chartinfo {
		justify-content: baseline;
	}
</style>
