<template>
  <div class="login_wrap">
    <el-form
      class="login_form"
      label-position="right"
      label-width="80px"
      :model="userinfo"
      :rules="loginRules"
    >
      <h1>用户登录</h1>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userinfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userinfo.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login_btn" @click.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
//引入登录接口
import { login } from "@/http/api";
export default {
  name: "login",
  data() {
    return {
      userinfo: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 60, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async handleLogin() {
      /**
       * 调用登录接口
       * 成功：
       *     保存token
       *     跳转到首页，并给出成功的提示
       * 失败：给出错误提示，让用户重新登录
       */
      const res = await login(this.userinfo);
      const {
        meta: { msg, status }
      } = res.data;

      if (status === 200) {
        const { token } = res.data.data;
        localStorage.setItem("token", token);
        //记住上次没有token要访问的页面地址，如果登录成功，再返回到上次要访问到页面
        const { redirect } = this.$route.query;

        //如果直接登录，没有redirect,成功后直接跳转到home
        if (!redirect) {
          this.$router.push({ name: "Home" });
        } else {
          this.$router.push({ path: redirect });
        }

        this.$message({
          message: msg,
          type: "success"
        });
      } else {
        this.$message({
          message: msg,
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login_wrap {
  width: 100%;
  height: 100%;
  background: #072765;
}

.login_form {
  width: 60%;
  height: 260px;
  padding: 30px;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;

  h1 {
    text-align: center;
    margin: 10px 0;
  }
}

.login_btn {
  width: 100%;
}
</style>
