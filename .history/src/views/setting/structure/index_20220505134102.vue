<template>
  <el-container v-loading="pageLoading">
    <el-aside v-loading="showGrouploading" width="240px">
      <el-container>
        <el-header>
          <div class="header-title">公司组织结构</div>
        </el-header>
        <el-main class="nopadding">
          <el-tree
            ref="group"
            v-loading="treeLoading"
            class="menu"
            node-key="id"
            :data="groupTree"
            :highlight-current="true"
            :expand-on-click-node="false"
            :default-expanded-keys="[1]"
            :current-node-key="1"
            @node-click="groupClick"
          />
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left-panel">
          <el-input
            v-model="search.SearchValue"
            class="m-2 w-50"
            placeholder="请输入姓名关键字"
            @change="chgSearch"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <search />
              </el-icon>
            </template>
          </el-input>
        </div>
        <div class="right-panel">
          <!-- <el-link type="primary" :underline="false" @click="lnkAsyncWorkWeChat">同步企微</el-link> -->
		  <el-button @click="adduserAndEmp" ref="adduserRef" type="primary">新增用户</el-button>
        </div>
      </el-header>
      <el-main class="nopadding">
        <yyTable
          ref="table"
          :api-obj="apiObj"
          stripe
          remote-sort
          remote-filter
          @selection-change="selectionChange"
        >
          <el-table-column
            label="姓名"
            prop="name"
            width="150"
          />
          <!-- <el-table-column
            label="账号"
            prop="account"
            width="200"
          /> -->
          <el-table-column
            label="邮箱"
            prop="email"
            width="200"
          />
          <el-table-column
            label="职位"
            prop="position"
          />
          <el-table-column
            label="角色"
            prop="roleNames"
          />
          <el-table-column label="操作" fixed="right" align="center" width="150">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="clkSetRole(scope.row, scope.$index)"
              >设置角色</el-button>
            </template>
          </el-table-column>
        </yytable>
      </el-main>
    </el-container>
  </el-container>

  <!-- <save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess" @closed="dialog.save=false" /> -->
  <setRoleDialog v-if="setRole.isShow" ref="setRoleDialog" @success="hleSuccess" @close="setRole.isShow=false" />
  <add-user v-if="addUserDig.isShow" @close="addUserDig.isShow=false"></add-user>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import setRoleDialog from './components/setRole'
import { tree, userPage, asyncWeiChat } from '@/api/setting/structure'
import { ElMessage } from 'element-plus'
import AddUser from './components/addUser'
export default {
  components: { Search, setRoleDialog,AddUser },
  setup() {
    // const drawerLoading = ref(false)
	const adduserRef=ref(null)
    const treeLoading = ref(false)
    const pageLoading = ref(false)
    const setRole = ref({
      isShow: false
    })
	const addUserDig=ref({
		isShow:false
	})
    const form = ref()
    const table = ref()
    const setRoleDialog = ref()
    // 组织结构
    const groupTree = ref([])

    // 人员列表
    const apiObj = ref(userPage)
    // 筛选和获取条件
    const search = ref({
      SearchValue: '',
      'sysEmpParam.orgId': ''
    })

    onMounted(async() => {
      await getGroupTree()
    })

    // 获取组织结构列表
    const getGroupTree = async() => {
      treeLoading.value = true
      var res = await tree()
      treeLoading.value = false
      if (res.code !== 200) {
          ElMessage.error(res.message || '组织结构加载失败，请稍后重试！')
          return
      }
      groupTree.value = res.data
    }
    // 树点击事件
    const groupClick = (data) => {
      search.value['sysEmpParam.orgId'] = data.id
      table.value.upData(search.value)
    }
    // 设置角色
    const clkSetRole = (row, index) => {
      setRole.value.isShow = true
      nextTick(() => {
        setRoleDialog.value.open(row)
      })
    }
    // 设置角色确定
    const hleSuccess = () => {
      table.value.refresh()
    }
    // 搜索
    const chgSearch = () => {
      table.value.upData(search.value)
    }
	const adduserAndEmp=()=>{
		adduserRef.open()
		addUserDig.isShow=true
	}
    // 同步企业微信
    const lnkAsyncWorkWeChat = async() => {
      pageLoading.value = true
      const res = await asyncWeiChat()
      if (res.code !== 200) {
          ElMessage.error(res.message || '同步失败，请稍后重试')
          return
      }
      table.value.upData()
      pageLoading.value = false
    }
    return {
      search,
      form,
      table,
      apiObj,
      setRole,
      setRoleDialog,
      groupTree,
      treeLoading,
      pageLoading,
      groupClick,
      clkSetRole,
      chgSearch,
      hleSuccess,
      getGroupTree,
      lnkAsyncWorkWeChat,
	  addUserDig,
	  adduserRef
    }
  }
}
</script>

<style lang="scss" scoped>
.header-title{
  font-size:14px;
  font-weight: bold;
  color:#333;
}
</style>
