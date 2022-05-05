<!--
 * @Author: gongnan
 * @Date: 2022-05-05 11:34:06
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 13:44:43
 * @Description: file content
 * @FilePath: \front\src\views\setting\structure\components\addUser.vue
-->
<template>
<el-dialog title="新增用户" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
 <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <el-tab-pane label="User">用户信息</el-tab-pane>
    <el-tab-pane label="Config">员工信息</el-tab-pane>
  </el-tabs>
</el-dialog>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
const visible=ref(false)
const open=()=>{
	console.log(fff)
	visible.value=true
}
</script>
