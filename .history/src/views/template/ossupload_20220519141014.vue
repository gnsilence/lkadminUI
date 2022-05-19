<!--
 * @Author: gongnan
 * @Date: 2022-05-19 10:48:32
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-19 14:10:14
 * @Description: file content
 * @FilePath: \front\src\views\template\ossupload.vue
-->
<template>
	<uploader @file-added="onFileAdded" @file-success="onFileSuccess" @file-progress="onFileProgress" @file-error="onFileError" :options="options" class="uploader-example">
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
	import {
		useEventBus
	} from '@vueuse/core'
	import {
		Compose
	} from "@/api/common";
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	export default {
		setup() {
			const bus = useEventBus('openUploader')
			// 监听事件总线
			const listener = (event) => {
				console.log(`news: ${event}`)
			}
			const unsubscribe = bus.on(listener) // 开始监听
			const panelShow = ref(false)
			const collapse = ref(false)
			const attrs = reactive(ACCEPT_CONFIG.getAll())
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
			/**
			 * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
			 * @param id
			 * @param status
			 */
			const statusSet = (id, status) => {
				let statusMap = {
					md5: {
						text: "校验MD5",
						bgc: "#fff",
					},
					merging: {
						text: "合并中",
						bgc: "#e2eeff",
					},
					transcoding: {
						text: "转码中",
						bgc: "#e2eeff",
					},
					failed: {
						text: "上传失败",
						bgc: "#e2eeff",
					},
				};
				// nextTick(() => {
				// 	$(`<p class="myStatus_${id}"></p>`)
				// 		.appendTo(`.file_${id} .uploader-file-status`)
				// 		.css({
				// 			position: "absolute",
				// 			top: "0",
				// 			left: "0",
				// 			right: "0",
				// 			bottom: "0",
				// 			zIndex: "1",
				// 			backgroundColor: statusMap[status].bgc,
				// 		})
				// 		.text(statusMap[status].text);
				// });
			}
			const onFileAdded = () => {}
			const onFileProgress = () => {}
			const onFileSuccess = async(rootFile, file, response, chunk) => {
    console.log('%c⧭', 'color: #8c0038', response)
				let res = JSON.parse(response);
				// 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
				if (!res.success) {
					ElMessage.error({
						message: res.msg
					})
					// 文件状态设为“失败”
					statusSet(file.id, "failed");
					return;
				}
				// 如果服务端返回需要合并;
				// alert(res.data.needMerge == true);
				if (res.data.needMerge) {
					// 文件状态设为“合并中”
					console.log(file.id);
					statusSet(file.id, "merging");
					const merge = await Compose({
						data: JSON.stringify({
							identifier: file.uniqueIdentifier
						})
					})
					if (merge.success) {
					}
					// $.ajax({
					// 	type: "post",
					// 	url: baseUrl + "minio/Compose",
					// 	contentType: "application/json;charset=UTF-8", //指定消息请求类型
					// 	data: JSON.stringify({
					// 		identifier: file.uniqueIdentifier,
					// 	}),
					// 	success: function(data) {
					// 		Bus.$emit("fileSuccess");
					// 		self.statusRemove(file.id);
					// 	},
					// 	error: function(data) {
					// 		$(".myStatus_" + file.id).hide();
					// 		self.statusSet(file.id, "failed");
					// 	},
					// });
				} else {
					bus.emit("fileSuccess");
					console.log("上传成功");
				}
			}
			onMounted(() => {
					nextTick(() => {
						window.uploader = uploader.value.uploader
					})
				}),
				onUnmounted(() => {
					bus.off(listener)
				})
			return {
				uploader,
				options,
				attrs,
				statusText,
				complete,
				fileComplete,
				onFileSuccess,
				onFileAdded,
				onFileProgress
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
