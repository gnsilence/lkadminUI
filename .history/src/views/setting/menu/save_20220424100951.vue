<template>
  <el-row :gutter="40">
    <el-col v-if="!form.id">
      <el-empty description="请选择左侧菜单后操作" :image-size="100" />
    </el-col>
    <template v-else>
      <el-col :lg="24">
        <h2>{{ form.name || '新增菜单' }}</h2>
        <el-form ref="dialogForm" :model="form" :rules="rules" label-width="90px" label-position="left">
          <el-form-item label="显示名称" prop="meta.title">
            <el-input v-model="form.meta.title" clearable placeholder="菜单显示名字" />
          </el-form-item>
          <el-form-item label="上级菜单" prop="parentId">
            <el-cascader
              v-model="form.parentId"
              :options="menuOptions"
              :props="menuProps"
              :show-all-levels="false"
              placeholder="顶级菜单"
              clearable
              disabled
            />
          </el-form-item>
          <el-form-item label="类型" prop="meta.type">
            <el-radio-group v-model="form.meta.type" @change="typeChange">
              <el-radio-button label="menu">菜单</el-radio-button>
              <el-radio-button label="iframe">Iframe</el-radio-button>
              <el-radio-button label="link">外链</el-radio-button>
              <el-radio-button label="button">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="别名" prop="name">
            <el-input v-model="form.name" clearable placeholder="菜单别名" />
            <div class="el-form-item-msg">系统唯一且与内置组件名一致，否则导致缓存失效。如类型为Iframe的菜单，别名将代替源地址显示在地址栏</div>
          </el-form-item>
          <el-form-item v-if="permissionShow" label="权限标识" :prop="form.meta.type == 'button' ? 'permission' :''">
            <el-input v-model="form.permission" clearable placeholder="" />
          </el-form-item>
          <el-form-item v-if="!permissionShow" label="菜单图标" prop="meta.icon">
            <sc-icon-select v-model="form.meta.icon" clearable />
          </el-form-item>
          <el-form-item v-if="!permissionShow" label="路由地址" prop="path">
            <el-input v-model="form.path" clearable placeholder="" />
          </el-form-item>
          <el-form-item v-if="!permissionShow" label="重定向" prop="redirect">
            <el-input v-model="form.redirect" clearable placeholder="" />
          </el-form-item>
          <el-form-item v-if="!permissionShow" label="菜单高亮" prop="active">
            <el-input v-model="form.active" clearable placeholder="" />
            <div class="el-form-item-msg">子节点或详情页需要高亮的上级菜单路由地址</div>
          </el-form-item>
          <el-form-item v-if="!permissionShow" label="视图" prop="component">
            <el-input v-model="form.component" clearable placeholder="">
              <template #prepend>views/</template>
            </el-input>
            <div class="el-form-item-msg">如父节点、链接或Iframe等没有视图的菜单不需要填写</div>
          </el-form-item>
          <el-form-item v-if="!permissionShow" label="颜色" prop="color">
            <el-color-picker v-model="form.meta.color" :predefine="predefineColors" />

          </el-form-item>
          <el-form-item v-if="!permissionShow" label="是否可关闭" prop="meta.affix">
            <el-checkbox v-model="form.meta.affix">不可关闭</el-checkbox>
          </el-form-item>
          <el-form-item v-if="!permissionShow" label="是否隐藏" prop="meta.hidden">
            <el-checkbox v-model="form.meta.hidden">隐藏菜单</el-checkbox>
            <el-checkbox v-model="form.meta.hiddenBreadcrumb">隐藏面包屑</el-checkbox>
            <div class="el-form-item-msg">菜单不显示在导航中，但用户依然可以访问，例如详情页</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="save">保 存</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </template>
  </el-row>

</template>

<script>
import scIconSelect from '@/components/scIconSelect'
import { menu_rules } from '@/utils/rules/setting/menu/index'

export default {
  components: {
    scIconSelect
  },
  props: {
    menu: {
      type: Object, default: () => {
      }
    }
  },
  data() {
    return {
      permissionShow: false,
      form: {
        id: '',
        parentId: '',
        name: '',
        path: '',
        component: '',
        redirect: '',
        meta: {
          title: '',
          icon: '',
          active: '',
          color: '',
          type: 'menu'
        }
      },
      menuOptions: [],
      menuProps: {
        value: 'id',
        label: 'title',
        checkStrictly: true
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#67C23A',
        '#00ced1',
        '#409EFF',
        '#c71585'
      ],
      rules: menu_rules,
      loading: false
    }
  },
  watch: {
    menu: {
      handler() {
        this.menuOptions = this.treeToMap(this.menu)
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    // 简单化菜单
    treeToMap(tree) {
      const map = []
      tree.forEach(item => {
        var obj = {
          id: item.id,
          parentId: item.parentId,
          title: item.meta.title,
          children: item.children && item.children.length > 0 ? this.treeToMap(item.children) : null
        }
        map.push(obj)
      })
      return map
    },
    typeChange() {
      if (this.form.meta) {
        switch (this.form.meta.type) {
          case 'button':
            this.permissionShow = true
            break
          default:
            this.permissionShow = false
            break
        }
      }
    },
    // 保存
    save() {
      this.$refs.dialogForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          const data = {
            id: this.form.id,
            type: this.form.meta.type === 'button' ? 2 : 1,
            name: this.form.meta.title,
            code: this.form.name,
            pid: this.form.parentId,
            openType: this.form.meta.type === 'menu' ? 1 : (this.form.meta.type === 'iframe' ? 2 : this.form.meta.type === 'link' ? 3 : 0),
            permission: this.form.permission,
            icon: this.form.meta.icon,
            router: this.form.meta.type === 'menu' ? this.form.path : '',
            link: this.form.meta.type === 'iframe' || this.form.meta.type === 'link' ? this.form.path : '',
            redirect: this.form.redirect,
            activeRouter: this.form.active,
            component: this.form.component,
            metaColor: this.form.meta.color,
            affix: this.form.meta.affix,
            Visible: this.form.meta.hidden ? 'N' : 'Y',
            visibleBreadcrumb: this.form.meta.hiddenBreadcrumb ? 'N' : 'Y',
            application: 'system'
          }
          var res = await (data.id ? this.$API.system.menu.list.edit(data) : this.$API.system.menu.list.add(data))
          this.loading = false
          if (res.code === 200) {
            this.$message.success('保存成功')
          } else {
            this.$message.warning(res.message)
          }
        }
      })
    },
    // 表单注入数据
    setData(data, pid) {
      this.form = data
      this.form.parentId = pid
      if (data) {
        this.typeChange()
      }
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 17px;
  color: #3c4a54;
  padding: 0 0 30px 0;
}

[data-theme="dark"] h2 {
  color: #fff;
}
</style>
