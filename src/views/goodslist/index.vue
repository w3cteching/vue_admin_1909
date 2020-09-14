<template>
  <div>
    <BreadCrumb level1="商品管理" level2="商品列表"></BreadCrumb>
    <el-card class="mt20">
      <!-- 搜索框 -->
      <div class="userSearch">
        <el-input placeholder="请输入内容" clearable class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" class="addUserBtn" @click="addGoods"
          >添加商品</el-button
        >
      </div>

      <!-- 表格 -->
      <el-table :data="goodsData" border style="width: 100%;margin-top:20px">
        <el-table-column
          type="index"
          align="center"
          label="#"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="goods_name"
          label="商品列表"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
          width="180"
        ></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | dateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
                @click="openEditDialog(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
                @click="openDeleteDialog(scope.row.id)"
              ></el-button>
              <el-button
                size="mini"
                plain
                type="success"
                icon="el-icon-check"
                circle
                @click="openUserRoleDialog(scope.row)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getGoodsList} from '@/http/api'
export default {
  name: "goodslist",
  data() {
    return {
      goodsData: [],
      goodsInfo:{
          query:'',
          pagenum:1,
          pagesize:10,

      }
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //添加商品按钮
    addGoods() {
        this.$router.push('/goodsadd')
    },
    //获取商品列表
    async getGoodsList() {

        //调商品列表接口
     const res=await getGoodsList(this.goodsInfo)

      console.log(res)
      this.goodsData=res.result.goods;
    }
  }
};
</script>

<style lang="scss" scoped>
.inputSearch {
  width: 300px;
}

.addUserBtn {
  margin-left: 10px;
}
</style>
