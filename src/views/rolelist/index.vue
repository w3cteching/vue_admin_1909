<template>
  <div>
    <BreadCrumb level1="权限管理" level2="角色列表"></BreadCrumb>
    <el-card class="mt20">
      <div class="addRole">
        <el-button type="primary">添加角色</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div v-if="scope.row.children.length">
                <el-row
                  style="margin-top:10px;"
                  v-for="(item1, index) in scope.row.children"
                  :key="index"
                >
                  <el-col :span="8">
                    <el-tag
                      @close="deleteRights(scope.row, item1.id)"
                      closable
                      >{{ item1.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <el-col :span="16">
                    <el-row
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                    >
                      <el-col :span="8">
                        <el-tag
                          @close="deleteRights(scope.row, item2.id)"
                          closable
                          type="success"
                          >{{ item2.authName }}</el-tag
                        >
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="16">
                        <el-tag
                          @close="deleteRights(scope.row, item3.id)"
                          closable
                          class="mr10 mb10"
                          type="warning"
                          v-for="(item3, index3) in item2.children"
                          :key="index3"
                          >{{ item3.authName }}</el-tag
                        >
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>

              <el-row v-if="!scope.row.children.length">
                <el-col>
                  <el-tag>该角色暂无权限</el-tag>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            type="index"
            width="100"
          ></el-table-column>
          <el-table-column label="角色名" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="small" icon="el-icon-edit"
                  >编辑</el-button
                >
                <el-button type="warning" size="small" icon="el-icon-share"
                  >删除</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="showTreeDiaglog(scope.row)"
                  >分配权限</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分配权限对话框 -->
      <el-dialog
        class="treeDialog"
        title="提示"
        :visible.sync="dialogVisibleTree"
        width="50%"
      >
        <!-- 加载tree组件 -->
        <!-- 
          tree属性说明：
          1.data：treee组件的数据源
          2.show-checkbox：显示treee组件的复选框
          3. node-key：指定tree组件每个节点唯一的key
          4.default-expanded-keys:默认展开的id
          5.default-checked-keys:默认选中的id
          6.props:指定tree组件的配置项：{label:要显示的tree名称，children:指定下级的key}
          7.default-expand-all	是否默认展开所有节点


          :default-expanded-keys="[9,2]"
          :default-checked-keys="[5,6,10]"
         -->
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :default-checked-keys="checkArr"
        ></el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTree = false">取 消</el-button>
          <el-button type="primary" @click="treeConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getUserRoleList,
  deleteRightsList,
  getRightsList,
  setRightsToRole
} from "@/http/api";
import { getTreeIds } from "@/utils";
export default {
  name: "rolelist",
  data() {
    return {
      currentRoleId:'',
      tableData: [],
      dialogVisibleTree: false,
      treeData: [],
      //tree组件默认选中的数组，数组元素为id的集合
      checkArr: [], //分析：包括全部选中的id+部分选中的id
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //确认分配权限，向后台发请求
    async treeConfirm() {
      //获取全部选中的tree节点
      const arr1 = this.$refs.tree.getCheckedKeys();

      //获取部分选中的tree节点
      const arr2 = this.$refs.tree.getHalfCheckedKeys();

      //合并全部选中和部分选中
      this.checkArr = [...arr1, ...arr2];

      //this.getRoleList();
      const res=await setRightsToRole(this.currentRoleId,{
        rids:this.checkArr.join(',')
      })
       this.getRoleList();
      this.dialogVisibleTree = false;
    },
    //打开分配权限对话框
    async showTreeDiaglog(row) {
      //获取当前角色id
      this.currentRoleId=row.id
      //1.调取显示tree数据接口
      const res = await getRightsList("tree");
      console.log("树形：", res);
      this.treeData = res.result;

      //2.获取当前角色拥有权限列表，并提取当前用户权限的id，组成一个数组[104,888,433,22]

      console.log("当前角色拥有权限列表：", row);
      this.checkArr = getTreeIds(row);

      this.dialogVisibleTree = true;
    },
    //加载角色列表
    async getRoleList() {
      //调接口
      const res = await getUserRoleList();
      console.log("res:", res);
      this.tableData = res.result;
    },
    //删除用户指定权限
    async deleteRights(row, rightId) {
      //调接口
      const res = await deleteRightsList(row.id, rightId);

      row.children = res.result;
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  margin-top: 20px;
}

.mr10 {
  margin-right: 10px;
}

.mb10 {
  margin-bottom: 10px;
}
</style>
