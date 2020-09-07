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
              default-active="2" 
              class="el-menu-vertical-demo"
              :unique-opened="true"
            >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项2
              </el-menu-item>
            </el-submenu>

             <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项2
              </el-menu-item>
            </el-submenu>

             <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项2
              </el-menu-item>
            </el-submenu>

             <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项1
              </el-menu-item>
              <el-menu-item index="1-1">
                  <i class="el-icon-location"></i>
                选项2
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="home_main">主体</el-main>
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
}

.home_main {
  height: 100%;
  background: #fff;
}

.loginout {
  position: absolute;
  right: 20px;
}
</style>
