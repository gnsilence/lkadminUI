<template>
  <div class="login_bg">
    <div class="login_adv" style="background-image: url(img/auth_banner.jpg)">
      <div class="login_adv__title">
        <h2>云研企业线SCRM</h2>
        <h4>一套供内部员工使用的具有可扩展性的系统</h4>
        <p>根据公司战略规划需要对企业端的产品服务及销售工作进行系统管理</p>
        <!-- <div>
          <span>
            <el-icon><sc-icon-vue /></el-icon>
          </span>
          <span>
            <el-icon class="add"><el-icon-plus /></el-icon>
          </span>
          <span>
            <el-icon><el-icon-eleme-filled /></el-icon>
          </span>
        </div> -->
      </div>
      <div class="login_adv__bottom">
        © {{ $CONFIG.APP_NAME }} {{ $CONFIG.APP_VER }}
      </div>
    </div>
    <div class="login_main">
      <div class="login_config">
        <el-button
          :icon="config.theme == 'dark' ? 'el-icon-sunny' : 'el-icon-moon'"
          circle
          type="info"
          @click="configTheme"
        />
      </div>
      <div v-show="showwechat" id="wchatlogin" class="login-form" />
      <div v-show="!showwechat" class="login-form">
        <div class="login-header">
          <div class="logo">
            <img :alt="$CONFIG.APP_NAME" src="/img/logo.png">
            <label>{{ $CONFIG.APP_NAME }}</label>
          </div>
          <h2>{{ $t('login.signInTitle') }}</h2>
        </div>
        <el-form
          ref="loginForm"
          :model="ruleForm"
          :rules="rules"
          label-width="0"
          size="large"
        >
          <el-form-item prop="user">
            <el-input
              v-model="ruleForm.user"
              prefix-icon="el-icon-user"
              clearable
              :placeholder="$t('login.userPlaceholder')"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              prefix-icon="el-icon-lock"
              show-password
              :placeholder="$t('login.PWPlaceholder')"
            />
          </el-form-item>
          <el-form-item style="margin-bottom: 10px">
            <el-row>
              <el-col :span="12">
                <el-checkbox
                  v-model="ruleForm.autologin"
                  :label="$t('login.rememberMe')"
                />
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button
                  type="text"
                >{{ $t('login.forgetPassword') }}？
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              :loading="islogin"
              round
              @click="login"
            >{{ $t('login.signIn') }}
            </el-button>
          </el-form-item>
        </el-form>

        <el-divider>{{ $t('login.signInOther') }}</el-divider>

        <!-- <div class="login-oauth">
          <el-button size="small" type="success" icon="sc-icon-wechat" circle @click="showwechatlogin" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // userType: 'admin',
      showwechat: false,
      ruleForm: {
        user: '',
        password: '',
        autologin: false
      },
      rules: {
        user: [
          {
            required: true,
            message: this.$t('login.userError'),
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: this.$t('login.PWError'), trigger: 'blur' }
        ]
      },
      islogin: false,
      config: {
        lang: this.$TOOL.data.get('APP_LANG') || this.$CONFIG.LANG,
        theme: this.$TOOL.data.get('APP_THEME') || 'default'
      },
      homeMenuList: [
        // {
        //   name: 'customer_deteils',
        //   path: '/sales_management/customer_management/details',
        //   pid: 0,
        //   id: 10028,
        //   component: 'sales_management/customer_management/details.vue',
        //   meta: {
        //     title: '客户详情',
        //     icon: 'el-icon-home-filled',
        //     type: 'menu',
        //     hidden: true,
        //     hiddenBreadcrumb: false
        //   }
        // }
      ]
    }
  },
  watch: {
    'config.theme'(val) {
      document.body.setAttribute('data-theme', val)
      this.$TOOL.data.set('APP_THEME', val)
    },
    'config.lang'(val) {
      this.$i18n.locale = val
      this.$TOOL.data.set('APP_LANG', val)
    }
  },
  created: function() {
    this.$TOOL.data.remove('TOKEN')
    this.$TOOL.data.remove('USER_INFO')
    this.$TOOL.data.remove('MENU')
    this.$TOOL.data.remove('PERMISSIONS')
    this.$TOOL.data.remove('grid')
    this.$store.commit('clearViewTags')
    this.$store.commit('clearKeepLive')
    this.$store.commit('clearIframeList')
    console.log(
      '%c SCUI %c Gitee: https://gitee.com/lolicode/scui',
      'background:#666;color:#fff;border-radius:3px;',
      ''
    )
  },
  async mounted() {
    await this.wechatLogin()
    // eslint-disable-next-line no-undef
    // new WwLogin({
    //   'id': 'wchatlogin',
    //   'appid': 'wxc306d410997ba87d',
    //   'agentid': '1000051',
    //   'redirect_uri': encodeURIComponent('http://mid.rendd.cn'),
    //   'state': '',
    //   'href': '',
    //   'lang': 'zh'
    // })
  },
  methods: {
    showwechatlogin() {
      this.showwechat = true
    },
    async wechatLogin() {
      var param = this.getparam()

      if (param.code) {
        var api = this.$API.auth.wechatlogin
        this.islogin = true
        var token = await api.get({ code: param.code })
        if (token.code === 200) {
          // this.$TOOL.data.set('TOKEN', token.data)
        } else {
          this.islogin = false
          this.$message.warning(token.message)
          return false
        }
        // 获取用户信息
        var user = await this.$API.auth.getLoginUser.get()
        if (user.code === 200) {
          if (user.data.menus.length === 0) {
            this.islogin = false
            this.$alert(
              '当前用户无任何菜单权限，请联系系统管理员',
              '无权限访问',
              {
                type: 'error',
                center: true
              }
            )
            return false
          }
          this.$TOOL.data.set('USER_INFO', user.data)
          const childrenNav = []
          this.$TOOL.listToTree(this.homeMenuList, childrenNav, 0)
          this.$TOOL.listToTree(user.data.menus, childrenNav, 0)
          this.$TOOL.data.set('MENU', childrenNav)
          this.$TOOL.data.set('PERMISSIONS', user.data.permissions)
        } else {
          this.islogin = false
          this.$message.warning(user.message)
          return false
        }

        this.$router.replace({
          path: '/'
        })
        this.$message.success('登录成功')
        this.islogin = false
      }
    },
    async login() {
      var validate = await this.$refs.loginForm.validate().catch(() => {
      })
      if (!validate) {
        return false
      }

      this.islogin = true
      var data = {
        account: this.ruleForm.user,
        password: this.ruleForm.password
      }
      // 获取token
      var token = await this.$API.auth.token.post(data)
      if (token.code === 200) {
        // this.$TOOL.data.set('TOKEN', token.data)
      } else {
        this.islogin = false
        this.$message.warning(token.message)
        return false
      }
      // 获取用户信息
      var user = await this.$API.auth.getLoginUser.get()
      if (user.code === 200) {
        if (user.data.menus.length === 0) {
          this.islogin = false
          this.$alert(
            '当前用户无任何菜单权限，请联系系统管理员',
            '无权限访问',
            {
              type: 'error',
              center: true
            }
          )
          return false
        }
        this.$TOOL.data.set('USER_INFO', user.data)
        const childrenNav = []
        this.$TOOL.listToTree(this.homeMenuList, childrenNav, 0)
        this.$TOOL.listToTree(user.data.menus, childrenNav, 0)
        this.$TOOL.data.set('MENU', childrenNav)
        this.$TOOL.data.set('PERMISSIONS', user.data.permissions)
      } else {
        this.islogin = false
        this.$message.warning(user.message)
        return false
      }

      this.$router.replace({
        path: '/'
      })
      this.$message.success('登录成功')
      this.islogin = false
    },
    configTheme() {
      this.config.theme = this.config.theme === 'default' ? 'dark' : 'default'
    },
    configLang(command) {
      this.config.lang = command.value
    },
    // 获取地址中企业微信跳转的code及appid等字段
    getparam() {
      var url = window.location.search
      var urlObj = {}
      if (url.indexOf('?') > -1 && url.indexOf('&') < 0) {
        var vname = url.split('?')[1].split('=')[0]
        var val = url.split('=')[1]
        urlObj[vname] = val
      } else if (url.indexOf('?') > -1) {
        var vsearch = url.split('?')[1].split('&')
        vsearch.forEach((item) => {
          var vname = item.split('=')[0]
          urlObj[vname] = item.split('=')[1]
        })
      }
      return urlObj
    }
  }
}
</script>

<style scoped>
.login_bg {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
}

.login_adv {
  width: 33.33333%;
  background-color: #555;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
}

.login_adv__title {
  color: #fff;
  padding: 40px;
}

.login_adv__title h2 {
  font-size: 40px;
}

.login_adv__title h4 {
  font-size: 18px;
  margin-top: 10px;
  font-weight: normal;
}

.login_adv__title p {
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
}

.login_adv__title div {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.login_adv__title div span {
  margin-right: 15px;
}

.login_adv__title div i {
  font-size: 40px;
}

.login_adv__title div i.add {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
}

.login_adv__bottom {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  color: #fff;
  padding: 40px;
  background-image: linear-gradient(transparent, #000);
}

.login_main {
  flex: 1;
  overflow: auto;
  display: flex;
}

.login-form {
  width: 400px;
  margin: auto;
  padding: 20px 0;
}

.login-header {
  margin-bottom: 20px;
}

.login-header .logo {
  display: flex;
  align-items: center;
}

.login-header .logo img {
  width: 35px;
  height: 35px;
  vertical-align: bottom;
  margin-right: 10px;
}

.login-header .logo label {
  font-size: 24px;
}

.login-header h2 {
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
}

.login-oauth {
  display: flex;
  justify-content: space-around;
}

.login-form .el-divider {
  margin-top: 40px;
}

.login_config {
  position: absolute;
  top: 20px;
  right: 20px;
}

.el-dropdown-menu__item.selected {
  color: var(--el-color-primary);
}

@media (max-width: 1200px) {
  .login-form {
    width: 340px;
  }
}

@media (max-width: 1000px) {
  .login_main {
    display: block;
  }

  .login-form {
    width: 100%;
    padding: 20px 40px;
  }

  .login_adv {
    display: none;
  }
}
</style>
