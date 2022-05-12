<!--
 * @Author: gongnan
 * @Date: 2022-05-12 16:34:31
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 17:44:29
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
		let events = JSON.parse(localStorage.getItem('rrweb'))
		// eslint-disable-next-line no-new,new-cap
		let player = new rrwebPlayer({
			target: document.getElementById('replaycontent'), // 可以自定义 DOM 元素
			// skipInactive:true,
			// 配置项
			props: {
				events,
			},
		});
		player.addEventListener('finish',()=>{
			onend()
		})
	}
	const onend=()=>{
		console.log('end')
	}
</script>
