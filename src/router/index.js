import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/login";

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
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;
