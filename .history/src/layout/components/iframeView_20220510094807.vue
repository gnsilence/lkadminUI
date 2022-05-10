<!--
 * @Descripttion: 处理iframe持久化，涉及store(VUEX)
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月30日13:20:41
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-10 09:48:07
-->

<template>
	<div v-show="$route.meta.type=='iframe'" class="iframe-pages">
		<iframe v-for="item in iframeList" :key="item.meta.url" v-show="$route.meta.url==item.meta.url" :src="item.meta.url" frameborder='0'></iframe>
			<el-backtop :visibility-height="100" :bottom="100" :right="20">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		watch: {
			$route(e) {
				this.push(e)
			},
		},
		created() {
			this.push(this.$route);
		},
		computed:{
			iframeList(){
				return this.$store.state.iframe.iframeList
			},
			ismobile(){
				return this.$store.state.global.ismobile
			},
			layoutTags(){
				return this.$store.state.global.layoutTags
			}
		},
		mounted() {

		},
		methods: {
			push(route){
				if(route.meta.type == 'iframe'){
					if(this.ismobile || !this.layoutTags){
						this.$store.commit("setIframeList", route)
					}else{
						this.$store.commit("pushIframeList", route)
					}
				}else{
					if(this.ismobile || !this.layoutTags){
						this.$store.commit("clearIframeList")
					}
				}
			}
		}
	}
</script>

<style scoped>
	.iframe-pages {width:100%;height:100%;background: #fff;}
	iframe {border:0;width:100%;height:100%;display: block;}
</style>
