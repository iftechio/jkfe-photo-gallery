import Vue from 'vue'
import { JK } from '@ruguoapp/jike-js-sdk'
import { JKA } from '@ruguoapp/jk-analytics'
import { JikeNavigation } from '@ruguoapp/vue-jike-navigation'
import { wrapAuth, refreshAuthToken } from '@ruguoapp/jike-auth-axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'

JKA.setCurrentPage('picture-log')
Vue.use(JikeNavigation, { router, scroll: true })
JKA.prototype.$event = params => JKA.event(params)
Vue.config.productionTip = false

function init () {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
  })
}

wrapAuth(axios)
if (JK.isInJikeApp() && JK.compareVersion('4.2.1') >= 0) {
  JK.ready(() => {
    JK.configUI(
      {
        displayHeader: 'false',
        displayFooter: 'false',
        enableBounce: 'false',
        disablePanBack: 'true',
      },
      true,
    )
    refreshAuthToken().then(() => init())
  })
} else {
  init()
}
