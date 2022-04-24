<template>
  <div>
    <ScDialog title="授权菜单" :model-value="modelValue" :destroy-on-close="true" :loading="loading" @close="close">
      <div>
        <el-tree
          ref="treeRef"
          :data="data"
          :props="props"
          node-key="id"
          show-checkbox
          :default-checked-keys="defaultCheckedKeys"
          :default-expanded-keys="defaultExpandedKeys"
          :height="500"
        />
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
import { grantMenuAdd, menuList, ownMenu } from '@/api/setting/role/idnex.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'AuthorizedMenu',
  components: {},
  setup(prop, context) {
    const treeRef = ref()
    const modelValue = ref(false)
    const Id = ref('')
    const defaultCheckedKeys = ref([])
    const data = ref([])
    const grantMenuIdList = ref([])
    const defaultExpandedKeys = ref([])
    const loading = ref(false)
    const props = {
      value: 'id',
      label: 'name',
      children: 'children'
    }
    const open = (id) => {
      Id.value = id
      modelValue.value = true
      getSelsectList()
    }
    const close = () => {
      data.value = []
      defaultCheckedKeys.value = []
      defaultExpandedKeys.value = []
      modelValue.value = false
    }
    const submit = async() => {
      loading.value = true
      grantMenuIdList.value = treeRef.value.getCheckedKeys()
      const res = await grantMenuAdd({
        Id: Id.value,
        GrantMenuIdList: grantMenuIdList.value
      })
      loading.value = false
      if (res.code !== 200) {
        ElMessage.error(res.message || '保存失败，请重试！')
        return
      }
      ElMessage({
        message: '保存成功！',
        type: 'success'
      })
      context.emit('onSearch')
      modelValue.value = false
    }
    // 获取选中的节点数组key
    const selectKeys = ref([])
    const getSelsectList = async() => {
      const res = await ownMenu({ id: Id.value })
      if (res.code !== 200) {
        ElMessage.error(res.message || '获取已授权菜单失败，请重试！')
        return
      }
      if (res.data) {
        selectKeys.value = res.data
      }
      await getMenuList()
    }
    const getMenuList = async() => {
      loading.value = true
      const res = await menuList()
      loading.value = false
      if (res.code !== 200) {
        ElMessage.error(res.message || '获取已授权菜单失败，请重试！')
        return
      }
      data.value = res.data
      getChildenKeys(res.data)
      getArrEqual(selectKeys.value, childArr.value)
    }
    // 获取所有子节点的id
    const childArr = ref([])
    const getChildenKeys = (data) => {
      data.forEach((item) => {
        if (item.children.length > 0) {
          getChildenKeys(item.children)
        } else {
          childArr.value.push(item.id)
        }
      })
    }
    // 去除两个数组相同的元素
    const getArrEqual = (arr1, arr2) => {
      const newArr = []
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
          if (arr1[j] === arr2[i]) {
            newArr.push(arr1[j])
          }
        }
      }
      defaultCheckedKeys.value = newArr
      defaultExpandedKeys.value = newArr
    }
    return {
      treeRef,
      modelValue,
      props,
      data,
      loading,
      defaultCheckedKeys,
      defaultExpandedKeys,
      grantMenuIdList,
      open,
      close,
      submit,
      getMenuList
    }
  }
}
</script>

<style scoped>

</style>
