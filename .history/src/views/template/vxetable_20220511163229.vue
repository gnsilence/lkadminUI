<!--
 * @Author: gongnan
 * @Date: 2022-05-11 16:30:55
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-11 16:32:29
 * @Description: file content
 * @FilePath: \front\src\views\template\vxetable.vue
-->
<template>
	<vxe-toolbar>
		<template #buttons>
		            <vxe-button @click="allAlign = 'left'">居左</vxe-button>
		            <vxe-button @click="allAlign = 'center'">居中</vxe-button>
		            <vxe-button @click="allAlign = 'right'">居右</vxe-button>
</template>
        </vxe-toolbar>

        <vxe-table
          :align="allAlign"
          :data="tableData1">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	export default defineComponent({
		setup() {
			const allAlign = ref(null)
			const tableData1 = ref([{
					id: 10001,
					name: 'Test1',
					role: 'Develop',
					sex: 'Man',
					age: 28,
					address: 'test abc'
				},
				{
					id: 10002,
					name: 'Test2',
					role: 'Test',
					sex: 'Women',
					age: 22,
					address: 'Guangzhou'
				},
				{
					id: 10003,
					name: 'Test3',
					role: 'PM',
					sex: 'Man',
					age: 32,
					address: 'Shanghai'
				},
				{
					id: 10004,
					name: 'Test4',
					role: 'Designer',
					sex: 'Women',
					age: 24,
					address: 'Shanghai'
				}
			])
			return {
				allAlign,
				tableData1
			}
		}
	})
</script>
