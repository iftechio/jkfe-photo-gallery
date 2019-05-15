import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { JK } from '@ruguoapp/jike-js-sdk'
import { JKA } from '@ruguoapp/jk-analytics'
import { JikeNavigation } from '@ruguoapp/vue-jike-navigation'
import { wrapAuth, refreshAuthToken } from '@ruguoapp/jike-auth-axios'
// import * as Sentry from '@sentry/browser'
import axios from 'axios'
import App from './App.vue'
import router from './router'

// Sentry.init({
//   dsn: '__DSN__',
//   // ...
// })
Vue.use(VueVirtualScroller)
JKA.setCurrentPage('jkfe-photo-gallery')
Vue.use(JikeNavigation, { router, scroll: false })
Vue.prototype.$event = params => JKA.event(params)
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
        // enableBounce: 'false',
      },
      true,
    )
    refreshAuthToken().then(() => init())
  })
} else {
  init()
}
