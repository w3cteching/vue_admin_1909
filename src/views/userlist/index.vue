/* eslint-disable no-useless-escape */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="user-list">
      <!-- 搜索框 -->
      <div class="userSearch">
        <el-input
          placeholder="请输入内容"
          clearable
          v-model="pageInfo.query"
          class="inputSearch"
          @input="searchUsers"
        >
          <el-button
            @click="searchUsers"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="primary" class="addUserBtn" @click="addUserDialog"
          >添加用户</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table :data="userlist" border style="width: 100%;margin-top:20px">
        <el-table-column
          type="index"
          align="center"
          label="#"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="姓名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template>
            <el-row>
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                size="mini"
                plain
                type="success"
                icon="el-icon-check"
                circle
              ></el-button>
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <!-- 
          常用分页属性和事件说明：
          1.@size-change：当每页显示条数发生改变时就触发  即每页显示的条数
          2.current-change:当前页码改变时触发   即当前第几页
          3.current-page：表示当前页码
          4.page-sizes：
          5.layout="total（总条数）, sizes（每页条数数组）, prev（前一页）, pager（页码集合）, next（下一页）, jumper（跳转页码）"
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[2, 4, 6]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 添加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="isUserDialog">
        <el-form ref="addUserForm" :model="userinfo" :rules="rules">
          <el-form-item label="用户名" label-width="100px" prop="username">
            <el-input v-model="userinfo.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" label-width="100px" prop="password">
            <el-input v-model="userinfo.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" label-width="100px" prop="email">
            <el-input v-model="userinfo.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机" label-width="100px" prop="mobile">
            <el-input v-model="userinfo.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isUserDialog = false">取 消</el-button>
          <el-button type="primary" @click.prevent="addUserConfirm"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { userList, addUser } from "@/http/api";
import _ from "lodash";
export default {
  name: "userlist",
  data() {
    //验证邮箱的函数
    const isEmail = (rule, value, callback) => {
      //邮箱正则
      // eslint-disable-next-line no-useless-escape
      let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      let isTrue = reg.test(value);
      if (isTrue) {
        return callback();
      }

      callback(new Error("不符合邮箱的规则，请重新输入"));
    };

    const isMobile = (rule, value, callback) => {
      let reg = /^[1][3,4,5,7,6,9,8][0-9]{9}$/;
      let isTrue = reg.test(value);
      if (isTrue) {
        return callback();
      }

      callback(new Error("不符合手机的规则，请重新输入"));
    };

    //验证手机号的函数

    return {
      //添加用户表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: isEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: isMobile, trigger: "blur" }
        ]
      },
      isUserDialog: false,
      userinfo: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      /*
    query:查询参数
    pagenum:当前页码
    pagesize:每页显示条数
    */
      pageInfo: {
        query: "",
        pagenum: 1,
        pagesize: 3
      },
      total: 10,
      userlist: []
    };
  },
  created() {
    //初始加载用户列表
    this.getUserList();
  },
  methods: {
    //显示用户对话框
    addUserDialog() {
      this.isUserDialog = true;
    },
    //确认添加用户
    addUserConfirm() {
      //调用封装的接口将数据添加到后台
      this.$refs.addUserForm.validate(async valid => {
        if (valid) {
          const res = await addUser(this.userinfo);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 201) {
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
          this.userinfo = {
            username: "",
            password: "",
            email: "",
            mobile: ""
          };
           this.isUserDialog = false;
        } else {
          return false;
        }
      });

     
    },
    //搜索用户
    searchUsers: _.debounce(function() {
      this.getUserList();
    }, 300),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pagenum = val;
      this.getUserList();
    },
    //获取用户列表
    async getUserList() {
      const res = await userList(this.pageInfo);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        const {
          data: { pagenum, total, users }
        } = res.data;

        this.pageInfo.pagenum = pagenum;
        this.userlist = users;
        this.total = total;
        this.$message({
          message: msg,
          type: "success"
        });
      } else {
        this.$message({
          message: msg,
          type: "error"
        });
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list {
  margin-top: 20px;
}

.inputSearch {
  width: 300px;
}

.addUserBtn {
  margin-left: 10px;
}
</style>
