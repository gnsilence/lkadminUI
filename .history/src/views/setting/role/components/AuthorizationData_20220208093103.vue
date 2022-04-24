<template>
  <div>
    <ScDialog title="授权范围" :show-fullscreen="false" :model-value="modelValue" width="30%" @close="close">
      <div>
        <el-form
          ref="ruleFormRef"
          class="demo-ruleForm"
        >
          <el-form-item label="授权范围:">
            <el-select v-model="scopeAuthority" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >确定</el-button>
        </span>
      </template>
    </ScDialog>
  </div>
</template>

<script>
import { grantData } from '@/api/setting/role/idnex.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'AuthorizationData',
  components: {},
  setup(prop, context) {
    const modelValue = ref(false)
    const scopeAuthority = ref(1)
    const options = ref([{
      label: '全部数据',
      value: 1
    }, {
      label: '本部门及以下数据',
      value: 2
    },
    // {
    //   label: '本部门数据',
    //   value: 3
    // },
    {
      label: '仅本人数据',
      value: 4
    }])
    const row = ref({})
    const open = (data) => {
      row.value = data
      if (data.dataScopeType) {
        scopeAuthority.value = data.dataScopeType
      }
      modelValue.value = true
    }
    const close = () => {
      modelValue.value = false
    }
    const submit = async() => {
      const res = await grantData({
        Id: row.value.id,
        DataScopeType: scopeAuthority.value,
        grantOrgIdList: []
      })
      if (res.code !== 200) {
        ElMessage.error(res.message || '保存失败，请重试！')
        return
      }
      ElMessage({
        message: '操作成功！',
        type: 'success'
      })
      modelValue.value = false
      context.emit('onSearch')
    }

    return {
      modelValue, scopeAuthority, options, open, close, submit
    }
  }
}
</script>

<style scoped>

</style>
