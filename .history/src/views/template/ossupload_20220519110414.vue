<!--
 * @Author: gongnan
 * @Date: 2022-05-19 10:48:32
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-19 11:04:14
 * @Description: file content
 * @FilePath: \front\src\views\template\ossupload.vue
-->
<template>
	<uploader :options="options" class="uploader-example">
		<uploader-unsupport></uploader-unsupport>
		<uploader-drop>
			<p>Drop files here to upload or</p>
			<uploader-btn>select files</uploader-btn>
			<uploader-btn :attrs="attrs">select images</uploader-btn>
			<uploader-btn :directory="true">select folder</uploader-btn>
		</uploader-drop>
		<uploader-list></uploader-list>
	</uploader>
</template>

<script>
	import {
		nextTick,
		ref,
		onMounted
	} from 'vue'
	import {
		ACCEPT_CONFIG
	} from "@/utils/accept_config";
	import SparkMD5 from "spark-md5";
	export default {
		setup() {
			const baseUrl = ref('http://localhost:9000/oss/')
			const uploader = ref(null)
			const options = {
				target: baseUrl.value + "minio", // '//jsonplaceholder.typicode.com/posts/',
				chunkSize: 5242880,
				fileParameterName: "upfile",
				maxChunkRetries: 5,
				forceChunkSize: true, // 强制每片都小于分片大小
				testChunks: true, //是否开启服务器分片校验
				// 服务器分片校验函数，秒传及断点续传基础
				checkChunkUploadedByResponse: function(chunk, res) {
					res = JSON.parse(res);
					let objMessage = res.data;
					if (objMessage.skipUpload) {
						return true;
					}
					return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
				},
				headers: {
					//   Authorization: Ticket.get() && "Bearer " + Ticket.get().access_token,
				},
				query() {},
			}
			const attrs = {
				accept: 'image/*'
			}
			const statusText = {
				success: 'success',
				error: 'error',
				uploading: 'uploading',
				paused: 'paused',
				waiting: 'waiting'
			}
			const complete = () => {
				console.log('complete', arguments)
			}
			const fileComplete = () => {
				console.log('file complete', arguments)
			}
			onMounted(() => {
				nextTick(() => {
					window.uploader = uploader.value.uploader
				})
			})
			return {
				uploader,
				options,
				attrs,
				statusText,
				complete,
				fileComplete
			}
		}
	}
</script>

<style>
	.uploader-example {
		width: 880px;
		padding: 15px;
		margin: 40px auto 0;
		font-size: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .4);
	}
	.uploader-example .uploader-btn {
		margin-right: 4px;
	}
	.uploader-example .uploader-list {
		max-height: 440px;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
