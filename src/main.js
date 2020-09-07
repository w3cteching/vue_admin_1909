import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

//引入reset.css
import "@/assets/css/reset.css";

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
