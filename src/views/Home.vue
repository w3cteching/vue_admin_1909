<template>
  <div class="home">
    <el-container class="home_container">
      <el-header class="home_header">
        <el-row class="home_header_row">
          <el-col :span="8">
            <h2 class="logo">公司Logo</h2>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <h2>公司后台管理系统</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button class="loginout" @click="loginout">登出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="home_aside">
          <!-- 左侧栏 -->
          <el-menu
            default-active="1"
            text-color="#fff"
            background-color="#074a5f"
            class="el-menu-vertical-demo nav_menu"
            :unique-opened="true"
            :router="true"
            :default-openeds="['1']"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/userlist">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/rolelist">
                 <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="2-2">
                 <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">
                 <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                 <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                 <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">
                 <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="4-1">
                 <i class="el-icon-menu"></i>
                数据报表
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="home_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    loginout() {
      //清除token
      localStorage.removeItem("token");
      //返回到登录页
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  position: relative;
}
.home_container {
  height: 100%;
}
.home {
  height: 100%;
}
.home_header {
  background: #023b4e;
  color: #fff;
  height: 100px !important;
}

.home_aside {
  background: #07495f;
  position: relative;
  //top: 100px;
  bottom: 0;
  left: 0;
}

.home_main {
  height: 100%;
  background: #fff;
}

.loginout {
  position: absolute;
  right: 20px;
}

.nav_menu {
  height:100%;
  overflow-y: scroll;
}
</style>
