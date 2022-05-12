<!--
 * @Author: gongnan
 * @Date: 2022-05-12 16:34:31
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 16:36:30
 * @Description: file content
 * @FilePath: \front\src\views\other\logplayer.vue
-->
<template>
<el-card>
<el-button @click="getInfo">回放录屏</el-button>
</el-card>
<div id="replaycontent" style="width: 1000px;height: 500px;background-color: #cccccc"></div>
</template>
<script setup>
import 'rrweb-player/dist/style.css'
import rrwebPlayer from 'rrweb-player'

</script>
