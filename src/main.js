import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from 'moment'

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

//处理时间戳过滤器
Vue.filter('dateTime', (v) => {
   return moment(v*1000).format("YYYY-MM-DD")
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
