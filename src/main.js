import Vue from 'vue';
import App from './App.vue';
import { JK } from '@ruguoapp/jike-js-sdk'
import { JKA } from "@ruguoapp/jk-analytics";
import { JikeNavigation } from "@ruguoapp/vue-jike-navigation";
import { wrapAuth, refreshAuthToken } from "@ruguoapp/jike-auth-axios";
import axios from 'axios'
import router from './router';
JKA.setCurrentPage("picture-log");
Vue.use(JikeNavigation, { router, scroll: true });

Vue.config.productionTip = false;
function init() {
  new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
  });
}


wrapAuth(axios);
if (JK.isInJikeApp() && JK.compareVersion("4.2.1") >= 0) {
  JK.ready(() => {
    JK.configUI(
      {
        displayHeader: "false",
        displayFooter: "false",
        enableBounce: "false",
        disablePanBack: "true"
      },
      true
    );
    refreshAuthToken().then(() => init());
  });
} else {
  // 站外的直接去下载
  location.href =
    "https://a.app.qq.com/o/simple.jsp?pkgname=com.ruguoapp.jike&ckey=CK1361797178193";
}
