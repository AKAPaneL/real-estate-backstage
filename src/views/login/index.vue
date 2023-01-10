<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">房地产后台管理系统</h3>
      </div>

      <el-form-item v-if="isRegister" prop="email">
        <span class="svg-container email">
          <i class="el-icon-message" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="E-mail"
          name="email"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ isRegister?'注 册':'登 录' }}</el-button>

      <div class="tips">
        <span class="move-button">{{ isRegister?"已有":'没有' }}账号？<span @click="move">点我{{ isRegister?'登录':'注册' }}</span> </span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      isRegister: false,
      loginForm: {
        username: '',
        email: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 3, message: '用户名最少3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 5, max: 12, message: '密码必须在 6-12 位之间', trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      await this.$refs.loginForm.validate()
      this.loading = true
      // 校验通过之后判断现在是什么表单
      if (this.isRegister) {
        // 调用注册接口
        register(this.loginForm).then(() => {
          // 注册成功之后 弹出提示
          this.$message.success('注册成功')
          this.loading = false
          // 跳转到登录页
          this.move()
        }).catch(() => {
          this.loading = false
        })
      } else {
        // 如果是登录表单
        const { username: identifier, password } = this.loginForm
        this.$store.dispatch('user/login', { identifier, password }).then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.$refs.loginForm.resetFields()
          this.$message.success(`欢迎！${this.$store.state.user.userInfo.username}`)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
      // if (valid) {
      //   this.loading = true
      //   this.$store.dispatch('user/login', this.loginForm).then(() => {
      //     this.$router.push({ path: this.redirect || '/' })
      //     this.loading = false
      //   }).catch(() => {
      //     this.loading = false
      //   })
      // } else {
      //   console.log('error submit!!')
      //   return false
      // }
    },
    move() {
      // 先重置表单
      this.$refs.loginForm.resetFields()
      this.isRegister = !this.isRegister
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .el-button::v-deep span{
    font-size: 18px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    .move-button{
      span {
        cursor:pointer;
        color: #66b1ff;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &.email i{
      font-weight: 700;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
