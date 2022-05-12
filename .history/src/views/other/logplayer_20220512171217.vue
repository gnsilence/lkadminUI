<!--
 * @Author: gongnan
 * @Date: 2022-05-12 16:34:31
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 17:12:17
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
		let events = JSON.parse('[{"type":3,"data":{"source":0,"texts":[],"attributes":[{"id":1077,"attributes":{"class":"el-message el-message--error"}}],"removes":[],"adds":[]},"timestamp":1652346722348},{"type":4,"data":{"href":"http://localhost:2888/setting/role","width":1194,"height":881},"timestamp":1652346609600}]')
		// eslint-disable-next-line no-new,new-cap
		// new rrwebPlayer({
		// 	target: document.getElementById('replaycontent'),
		// 	data: {
		// 		events
		// 	}
		// })
		new rrwebPlayer({
			target: document.getElementById('replaycontent'), // 可以自定义 DOM 元素
			// 配置项
			props: {
				events,
			},
		});
	}
</script>
