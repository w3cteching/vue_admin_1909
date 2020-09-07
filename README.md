# vue_admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
# 后台管理

> 技术栈：vue,Element ui,axios,sass(css),Echarts(图表),vuex.....

## 一、练手项目：

      1. 初级练手项目：https://github.com/bailicangdu/vue2-manage

      2. 中级练手项目：https://github.com/PanJiaChen/vue-element-admin

  ```
中级练手项目中文文档：https://panjiachen.github.io/vue-element-admin-site/zh/guide/
  ```

3. 取中：介于1，2之间复杂度的项目

  

## 二、Mock数据：模拟数据

> mockjs官网：http://mockjs.com/

> mockjs官方文档：https://github.com/nuysoft/Mock/wiki/Getting-Started

- 具体使用方法

    第一步 安装mockjs

    ```
    npm install mockjs
    ```

    第二步 创建一个mock目录生成mock数据

```
例如：course.js
import Mock from "mockjs";

//mock课程数据
var result=Mock.mock({
  code: 200,
  msg: "操作成功",
  data: {
    current_page: 1,
    last_page: 18,
    total: 178,
    "list|10": [
      {
        id: "@id",  //模拟id
        "price|100-200.1-2": 100, //模拟小数，在计算机中也称浮点数
        "has_buy|1": [0, 1], //模拟状态值,0,1,2,
        title: "@ctitle",  //模拟中文标题
        address: "@county(true)",  //模拟省市县
        "teachers_list|1": [
          {
            course_basis_id: "@id",
            id: "@id",
            teacher_avatar: "@image('150x120', '#ff0000', '1909A')",  //模拟图片
            teacher_name: "@cname"  //模拟中文姓名
          }
        ]
      }
    ]
  }
});


export default result;

//创建mock的入口文件，并配置请求的接口地址，提交方式，返回的假数据
import Mock from 'mockjs'
//导入的模拟数据
import courseData from "./course";

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */

Mock.mock("http://www.1909A.com/coureslist", "get", courseData);
```



​	第三步：将模拟的数据注入到main.js

```
//注入mock
import './mock'
```

  第四步：在要请求的组件中请求数据

```
 axios.get('http://www.1909A.com/coureslist').then(res=>{
        console.log(res)
 })
```

- easy-mock：基于mockjs生成在线假数据



# 三、vue后台管理接口

- 接口基地址：https://www.liulongbin.top:8888/api/private/v1

```
token:  { Authorization：token值 }

登录成功后返回的token值：
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1OTk0NjAxNTMsImV4cCI6MTU5OTU0NjU1M30.m55IuuED8lbvjyfS9h-xaHEWj9EUfr99LvyZzMwt0dk
```



-  Element ui 表单

    - el-form
    - el-form-item
    - el-input
    - el-button

    > 给表单添加验证规则：

    ```
    第一步：给表单添加rules属性
     <el-form :rules="loginRules"></el-form>
     
    第二步：在data中配置rules验证规则
    例如：
    
    export default {
      name: "login",
      data() {
        return {
        ....
          loginRules: {
            username: [
              { required: true, message: "请输入用户名", trigger: "blur" },
              { min: 6, max: 20, message: "长度在 6 到 20个字符", trigger: "blur" }
            ],
            password: [
              { required: true, message: "请输入密码", trigger: "blur" },
              { min: 6, max: 60, message: "长度在 6 到 20 个字符", trigger: "blur" }
            ]
          }
        };
      },
    第三步：通过el-form-item添加prop属性，来验证当前表单字段
     <el-form-item label="用户名" prop="username">
          <el-input v-model="userinfo.username"></el-input>
     </el-form-item>
    ```



- 调用登录接口

```
 const res = await login(this.userinfo);
```



- 登录成功
    - 保存token
    - 跳转到home页
    - 给出成功提示

```
if (status === 200) {
    const { token } = res.data.data;
    localStorage.setItem("token", token);
    this.$router.push({ name: "Home" });
    this.$message({
    message: msg,
    type: "success"
    });
 }
```



- 登录失败
    - 给出失败提示，重新登录

```
完整登录代码：
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
        this.$router.push({ name: "Home" });
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
```



- 除登录外的其他页面验证

> 思路：主要判断token是否存在，如果存在就继续，否则跳转到登录页，重新登录！
>
> 技术点：使用路由守卫
>
> 在man.js中添加路由守卫实现拦截

代码如下：

```
//全局路由拦截
router.beforeEach((to, from, next) => {
  console.log("from:", from);
  console.log("to:", to);
  if (to.meta.auth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({
        name: 'login',
        query: { redirect:to.fullPath  }
        })
    } else {
      next()
     }
  } else {
    next();
  }
  
});

```

- 首页布局
    - el-container：布局容器
    - el-header：布局头部
    - el-aside：布局侧边栏
    - el-main：布局主体
- 导航菜单
    - el-menu:导航菜单容器
    - el-submenu：导航子菜单
    - el-menu-item：导航子菜单项


