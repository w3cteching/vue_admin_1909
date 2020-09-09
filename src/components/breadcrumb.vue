<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ level1 }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ level2 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    level1: {
      type: String,
      default: "二级导航"
    },
    level2: {
      type: String,
      default: "三级导航"
    }
  }
};
</script>

<style lang="scss" scoped></style>
