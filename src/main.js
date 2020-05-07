import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/css/all.less";
import "@/assets/theme/index.css";
import "./util/filter.js";

// import '@/assets/icon/iconfont.js'
import "@/assets/icon/iconfont.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
