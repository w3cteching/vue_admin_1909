<template>
  <div class="goodsadd-box">
    <BreadCrumb level1="商品管理" level2="添加商品"></BreadCrumb>
    <el-card class="mt20">
      <el-alert title="消息提示的文案" type="info" center show-icon></el-alert>
      <div class="goods mt20">
        <el-steps :active="tabType * 1" align-center finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
        </el-steps>

        <el-form :model="goodsForm" style="height: 400px;overflow:auto;">
          <el-tabs
            class="mt20"
            v-model="tabType"
            :before-leave="handleClick"
            tab-position="left"
          >
            <el-tab-pane label="基本信息" name="1">
              <el-form-item label="商品名称">
                <el-input v-model="goodsForm.goods_name"></el-input>
              </el-form-item>

              <el-form-item label="商品价格">
                <el-input
                  type="number"
                  v-model="goodsForm.goods_price"
                ></el-input>
              </el-form-item>

              <el-form-item label="商品重量">
                <el-input
                  type="number"
                  v-model="goodsForm.goods_weight"
                ></el-input>
              </el-form-item>

              <el-form-item label="商品数量">
                <el-input
                  type="number"
                  v-model="goodsForm.goods_number"
                ></el-input>
              </el-form-item>

              <el-form-item label="商品分类">
                <p>{{ selectOtions }}</p>
                <el-cascader
                  clearable
                  v-model="selectOtions"
                  :options="options"
                  :props="defaultProps"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="2">
              <el-form-item
                :label="item.attr_name"
                v-for="(item, index) in dynimicParams"
                :key="index"
              >
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    :label="item2"
                    border
                    v-for="(item2, index2) in item.attr_vals"
                    :key="index2"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="3">
              <el-form-item
                :label="item.attr_name"
                v-for="(item, index) in staticParams"
                :key="index"
              >
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="4">
              <el-upload
                class="upload-demo"
                action="https://www.liulongbin.top:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="fileList"
                list-type="picture"
                :headers="headers"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="5">
              <quill-editor v-model="goodsForm.goods_introduce"></quill-editor>
              <el-button type="primary" class="mt20" @click="addGoods"
                >添加商品</el-button
              >
            </el-tab-pane>
          </el-tabs>
        </el-form>

        <!--   <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
        </el-form-item>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodsCate, getGoodsParams, addGoods } from "@/http/api";

export default {
  name: "goodsadd",
  data() {
    return {
      //上传图片的请求头
      headers: {
        Authorization: localStorage.getItem("token")
      },
      fileList: [],
      checkList: [],
      //动态参数
      dynimicParams: [],
      //静态参数
      staticParams: [],
      selectOtions: [],
      defaultProps: {
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id"
      },
      options: [],
      tabType: "1",
      currentCateID: "",
      /**
       * goods_name:商品名称
       * goods_cat:以为','分割的分类列表
       * goods_price:价格
       * goods_number:数量
       * goods_weight:重量
       * goods_introduce介绍
       * pics上传的图片临时路径（对象）
       * attrs商品的参数（数组），包含 `动态参数` 和 `静态属性`
       */
      goodsForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 1,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: []
      }
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    //添加商品到后台
    async addGoods() {
      this.goodsForm.goods_cat = this.selectOtions.join(',');

      //动态参数处理
      this.dynimicParams = this.dynimicParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join()
        };
      });

      //console.log('this.staticParams:',this.staticParams)
      //静态参数处理
       this.staticParams = this.staticParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        };
      });


      this.goodsForm.attrs=[...this.dynimicParams,...this.staticParams]

      //调接口
        const res=await addGoods(this.goodsForm)
        this.$router.push('/goodslist')
    },
    //上传图片预览
    handleRemove(file, fileList) {
      console.log("handleRemove:", file, fileList);
    },
    handlePreview(file) {
      console.log("handlePreview:", file);
    },
    handleSuccess(file) {
      console.log("handleSuccess:", file);
      this.goodsForm.pics.push({ pic: file.data.tmp_path });
    },
    async handleClick(activeName, oldActiveName) {
      console.log(activeName);
      console.log(oldActiveName);
      if (activeName === "2") {
        if (this.selectOtions.length !== 3) {
          this.$message({
            message: "您还没有选择三级分类",
            type: "error"
          });

          return false;
        } else {
          this.currentCateID = this.selectOtions[2];
          //调接口
          const res = await getGoodsParams(this.currentCateID);
          console.log("获取商品参数：", res);
          this.dynimicParams = res.result;

          //将attr_vals添加到临时数组中，为了默认全部选中
          let tempArr = [];
          this.dynimicParams.forEach(item => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(/\s+/g);
            tempArr.push(...item.attr_vals);
          });

          this.checkList = tempArr;
        }
      }

      if (activeName === "3") {
        if (this.selectOtions.length !== 3) {
          this.$message({
            message: "您还没有选择三级分类",
            type: "error"
          });

          return false;
        } else {
          this.currentCateID = this.selectOtions[2];
          //接接口
          //调接口
          const res = await getGoodsParams(this.currentCateID, "only");
          console.log("获取商品静态参数：", res);
          this.staticParams = res.result;
        }
      }
    },
    //级联三级分类选择
    handleChange() {},
    //获取商品分类列表
    async getGoodsCate() {
      //调接口
      const res = await getGoodsCate();
      console.log("分类列表:", res);
      this.options = res.result;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.goodsadd-box /deep/ .ql-editor {
  height: 35vh;
}
</style>
