<template>
  <div>
    <BreadCrumb level1="权限管理" level2="角色列表"></BreadCrumb>
    <el-card style="margin-top:20px;">
      <div class="table">
        <el-table :data="tableData" border>
          <el-table-column label="#" type="index" width="100"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
              <template slot-scope="scope">
                 <el-tag :type="tagType[scope.row.level]">{{ scope.row.level |levelRank  }}</el-tag>
              </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getRightsList} from '@/http/api'
export default {
  name: "rightslist",
  data() {
    return {
      tagType:['default','success','danger'],
      tableData: []
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    //获取所有权限列表
    async getRightsList() {
        //调取权限列表接口
      const res=await getRightsList()
      console.log('权限列表结果：',res)
      this.tableData=res.result;
    }
  }
};
</script>

<style lang="scss" scoped></style>
