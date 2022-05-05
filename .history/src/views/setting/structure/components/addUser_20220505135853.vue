<template>
	<scDialog :title="title" :htitle="htitle" :show-fullscreen="false" :model-value="visible" :destroy-on-close="true" :width="800" :loading="loading" @closed="$emit('close')">
		<el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
			<el-tab-pane label="用户信息">User</el-tab-pane>
			<el-tab-pane label="员工信息">Config</el-tab-pane>
		</el-tabs>
		<template #footer>
		      <el-button @click="visible=false">取消</el-button>
		      <el-button type="primary" :disabled="roleid.length==0" :loading="isSaveing" @click="clkSubmit">确定</el-button>
</template>
  </scDialog>
</template>

<script>
	import {
		roleDropDown,
		grantRole
	} from '@/api/setting/structure'
	import {
		ref,
		getCurrentInstance
	} from 'vue'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		setup(props, context) {
			const {
				appContext
			} = getCurrentInstance()
			const _this = appContext.config.globalProperties
			const title = ref('设置角色')
			const htitle = ref('（最多选择5个角色）')
			const options = ref([])
			const visible = ref(false)
			const roleid = ref([])
			const isSaveing = ref(false)
			const selectLoading = ref(true)
			const rules = ref()
			const dialogForm = ref()
			const form = ref({})
			const row = ref({})
			const data = ref({
				id: '',
				grantRoleIdList: []
			})
			// 恢复默认角色
			const defaultRole = () => {
				const v = _this.$_.find(options.value, x => {
					return x.isdefaultRole === true
				})
				return v
			}
			// 获取角色下拉数据
			const getRoleDropDown = async() => {
				selectLoading.value = true
				var res = await roleDropDown()
				if (res.code !== 200) {
					ElMessage.error(res.message || '角色加载失败，请稍后重试')
					return
				}
				for (let i = 0, len = res.data.length; i < len; i++) {
					options.value.push({
						label: res.data[i].name,
						value: res.data[i].id,
						isdefaultRole: res.data[i].isdefaultRole
					})
				}
				// 人员角色为空时，为默认角色s
				if (_this.$_.isEmpty(row.value.roleIds)) {
					roleid.value = [defaultRole().value]
				} else {
					var hasroles = [] // 判断自己有的角色,匹配到才进行显示
					options.value.forEach(r => {
						var roleinfo = row.value.roleIds.find(a => a === r.value)
						if (roleinfo) {
							hasroles.push(r.value)
						}
					})
					console.log('findrole', hasroles)
					roleid.value = hasroles // row.value.roleIds
				}
				selectLoading.value = false
			}
			// 打开弹窗
			const open = async() => {
				visible.value = true
			}
			// 点击确定
			const clkSubmit = async() => {
				isSaveing.value = true
				data.value.grantRoleIdList = roleid.value
				var res = await grantRole(data.value)
				isSaveing.value = false
				if (res.code !== 200) {
					ElMessage.error(res.message || '保存失败，请稍后重试')
					return
				}
				context.emit('close')
				ElMessage.success('保存成功！')
				context.emit('success')
			}
			// 清空角色下拉选择框
			const clearSelect = () => {
				// 暂时未用到
			}
			// 点击角色下拉选择框
			const chgSelect = (val) => {
				if (_this.$_.isEmpty(val)) {
					if (defaultRole()) {
						roleid.value = [defaultRole().value]
					}
				}
			}
			return {
				title,
				htitle,
				options,
				visible,
				roleid,
				isSaveing,
				rules,
				form,
				dialogForm,
				data,
				row,
				selectLoading,
				defaultRole,
				open,
				clkSubmit,
				clearSelect,
				chgSelect
			}
		}
	}
</script>

<style>

</style>
