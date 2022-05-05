<!--
 * @Author: gongnan
 * @Date: 2022-05-05 17:30:47
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 18:03:58
 * @Description: file content
 * @FilePath: \front\src\views\setting\structure\position\index.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="left-panel">
        <el-input v-model="search.Name" class="m-2 w-50" placeholder="请输入关键字" clearable @change="onSearch">
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div class="right-panel">
        <el-button type="primary" @click="Add">
          <el-icon class="el-icon--right" style="margin-right: 5px;">
            <Plus />
          </el-icon>
          新增
        </el-button>
      </div>
    </el-header>
    <el-main class="nopadding">
      <yyTable
        ref="table"
        :api-obj="apiObj"
        stripe
        remote-sort
        remote-filter
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="岗位名称" align="left" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="岗位描述" align="left" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.remark }}</template>
        </el-table-column>
		  <el-table-column label="岗位编码" align="left" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.code }}</template>
        </el-table-column>
		 <el-table-column label="岗位状态" align="left" show-overflow-tooltip>
          <template #default="scope">{{ positionStatus(scope.row.status) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.row)"
            >编辑
            </el-button>
            <el-dropdown>
              <span class="el-dropdown-link" style="color: #409EFF;cursor: pointer;">
                更多 <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :disabled="scope.row.status===0" command="a" @click="handleCommand('a',scope.row)">启用</el-dropdown-item>
                  <el-dropdown-item :disabled="scope.row.status===1" command="b" @click="handleCommand('b',scope.row)">停用</el-dropdown-item>
                  <el-dropdown-item
                    :disabled="scope.row.isNotDel===1"
                    command="c"
                    @click="handleCommand('c',scope.row)"
                  >删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </yyTable>
    </el-main>
  </el-container>
  <el-drawer
    v-model="drawer"
    :title="title"
    direction="rtl"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <el-container v-loading="drawerLoading">
      <el-main>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item ref="Name" label="岗位名称:" prop="Name">
            <el-input v-model="ruleForm.Name" maxlength="10" placeholder="请输入岗位名称（最多10汉字字符）" />
          </el-form-item>
		   <el-form-item label="岗位编码：">
            <el-input
              v-model="ruleForm.code"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="岗位描述：">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              resize="none"
              :rows="4"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
		  <el-form-item ref="Sort" label="排序:" prop="Sort">
            <el-input-number
              v-model="ruleForm.Sort"
              :min="1"
              :max="maxNum"
              placeholder="请输入排序号"
              :controls="false"
              style="width:100%;text-algin:left"
            />
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button :loading="drawerLoading" type="primary" @click="submit">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-footer>
    </el-container>
  </el-drawer>
</template>

<script>
import { ref } from 'vue'
import { Plus, Search, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { sysPosPage,sysPosAdd,sysPosDelete } from '@/api/setting/structure/position.js'
import { position_rules } from '@/utils/rules/setting/position/index.js'

export default {
  components: { Plus, Search, ArrowDown },
  setup() {
    const rules = position_rules
    const drawerLoading = ref(false)
    const loading = ref(false)
    const ruleFormRef = ref()
    const authorizedMenu = ref()
    const authorizationData = ref()
    const apiObj = ref(sysPosPage)
    const table = ref()
    const maxNum = ref(null)
    // 筛选和获取条件
    const search = ref({
      Name: ''
    })
    const ruleForm = ref({
      Id: '',
      Name: '',
      Sort: null,
      Remark: ''
    })
	const positionStatus=(status)=>{
		let str=''
		switch (status) {
			case 0:
				str='正常'
				break;
			case 1:
				str='停用'
				break;
			case 2:
				str='删除'
				break;
			default:
				break;
		}
		return str
	}
    // 抽屉的title
    const title = ref('')
    const multipleTableRef = ref() // 获取表格的dom节点
    const multipleSelection = ref([]) // 选中的数据
    const drawer = ref(false)
    const handleCurrentChange = (val) => {
      search.value.PageNo = val
    }
    // 全选/取消
    const toggleSelection = (rows) => {
      if (rows) {
        rows.forEach((row) => {
          multipleTableRef.value.toggleRowSelection(row, undefined)
        })
      } else {
        multipleTableRef.value.clearSelection()
      }
    }
    // 单个选中
    const handleSelectionChange = (val) => {
      multipleSelection.value = val
    }
    const handleCommand = (command, row) => {
      console.log(command, row)
      if (command === 'a') {
        authorizedMenu.value.open(row.id)
      } else if (command === 'b') {
        authorizationData.value.open(row)
      } else if (command === 'c') {
        handleDelete(row)
      }
    }
    // 查询默认排序
    const defaultSort = async() => {
      const res = await defSort()
      return res.data
    }
    // 新增
    const Add = async() => {
      drawer.value = true
      title.value = '新增'
      ruleForm.value.Id = ''
    }
    // 编辑
    const handleEdit = async(row) => {
      const res = await defaultSort()
      maxNum.value = res - 1
      drawer.value = true
      title.value = '编辑'
      ruleForm.value.Id = row.id
      ruleForm.value.Name = row.name
      ruleForm.value.Sort = row.sort
      ruleForm.value.Remark = row.remark
    }
    // 删除
    const handleDelete = (row) => {
      ElMessageBox.confirm('确定删除吗？删除不会影响已引用该角色的历史数据，但您将无法继续引用该角色？')
        .then(async() => {
          const res = await deleterRole({ Id: row.id })
          if (res.code !== 200) {
            ElMessage.error(res.message || '删除失败，请重试！')
            return
          }
          ElMessage({
            message: '删除成功！',
            type: 'success'
          })
          table.value.refresh()
        }).catch(() => {
      })
    }
    // 保存
    const submit = () => {
      ruleFormRef.value.validate(async(valid) => {
        if (valid) {
          drawerLoading.value = true
          if (ruleForm.value.Id) {
            const res = await editPro(ruleForm.value)
            drawerLoading.value = false
            if (res.code !== 200) {
              ElMessage.error(res.message || '保存失败，请重试！')
              return
            }
          } else {
            const res = await addPro(ruleForm.value)
            drawerLoading.value = false
            if (res.code !== 200) {
              ElMessage.error(res.message || '保存失败，请重试！')
              return
            }
          }
          ElMessage({
            message: '保存成功！',
            type: 'success'
          })
          ruleForm.value.Id = ''
          ruleForm.value.Name = ''
          ruleForm.value.Sort = null
          ruleForm.value.Remark = ''
          drawer.value = false
          table.value.refresh()
        }
      })
    }
    // 关闭抽屉
    const handleClose = (done) => {
      ruleForm.value.Id = ''
      ruleForm.value.Name = ''
      ruleForm.value.Sort = null
      ruleForm.value.Remark = ''
      drawer.value = false
    }
    // 搜索事件
    const onSearch = async() => {
      // 传入参数，更新表格
      table.value.upData(search.value)
    }
    return {
      drawerLoading,
      loading,
      search,
      drawer,
      title,
      ruleForm,
      rules,
      ruleFormRef,
      authorizedMenu,
      authorizationData,
      apiObj,
      table,
      maxNum,
      Add,
      submit,
      onSearch,
      handleCommand,
      handleCurrentChange,
      handleEdit,
      handleDelete,
      handleClose,
      toggleSelection,
      handleSelectionChange,
	  positionStatus
    }
  }
}
</script>

<style>
.productDrawerButton {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
