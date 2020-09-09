<template>
  <div>
    <BreadCrumb level1="权限管理" level2="角色列表"></BreadCrumb>
    <el-card style="margin-top:20px;">
      <div class="addRole">
        <el-button type="primary">添加角色</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" border>
          <el-table-column type="expand">
              <div>1111</div>
              <div>1111</div>
              <div>1111</div>
              <div>1111</div>
              <div>1111</div>
              <div>1111</div>
          </el-table-column>
          <el-table-column label="编号" type="index" width="100"></el-table-column>
          <el-table-column label="角色名" prop="name"></el-table-column>
          <el-table-column label="角色描述" prop="date"></el-table-column>
          <el-table-column label="操作" prop="address"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "rolelist",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
