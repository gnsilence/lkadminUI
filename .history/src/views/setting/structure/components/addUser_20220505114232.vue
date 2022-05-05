<!--
 * @Author: gongnan
 * @Date: 2022-05-05 11:34:06
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 11:42:32
 * @Description: file content
 * @FilePath: \front\src\views\setting\structure\components\addUser.vue
-->
<template>
<el-container v-loading="pageLoading"></el-container>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
const pageLoading = ref(false)
</script>
