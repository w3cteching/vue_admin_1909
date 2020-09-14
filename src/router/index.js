import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/login";
import userList from "@/views/userlist";
//import rolelist from '@/views/rolelist'
//路由懒加载
//const Foo = () => import('./Foo.vue')
const rolelist = () => import("@/views/rolelist");
const rightslist = () => import("@/views/rightslist");
const goodslist = () => import("@/views/goodslist");
const goodsadd = () => import("@/views/goodsadd");
const report = () => import("@/views/report");

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "Home",
    meta: {
      auth: true
    },
    component: Home,
    children: [
      { path: "", redirect: "/userlist" },
      { path: "/userlist", component: userList },
      { path: "/rolelist", component: rolelist },
      { path: "/rightslist", component: rightslist },
      { path: "/goodslist", component: goodslist },
      { path: "/goodsadd", component: goodsadd },
      { path: "/report", component: report }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
