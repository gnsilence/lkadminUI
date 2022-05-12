<!--
 * @Author: gongnan
 * @Date: 2022-05-12 16:34:31
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 17:23:40
 * @Description: file content
 * @FilePath: \front\src\views\other\logplayer.vue
-->
<template>
	<el-card>
		<el-button @click="playrecord">回放录屏</el-button>
	</el-card>
	<div id="replaycontent" style="width: 1000px;height: 500px;background-color: #cccccc"></div>
</template>

<script setup>
	import 'rrweb-player/dist/style.css'
	import rrwebPlayer from 'rrweb-player'
	const playrecord = () => {
		let events = localStorage.getItem('rrweb')
		// eslint-disable-next-line no-new,new-cap
		// new rrwebPlayer({
		// 	target: document.getElementById('replaycontent'),
		// 	data: {
		// 		events
		// 	}
		// })
		new rrwebPlayer({
			target: document.body, // 可以自定义 DOM 元素
			// 配置项
			props: {
				events,
			},
		});
	}
</script>
