import Vue from 'vue'
import { JK } from '@ruguoapp/jike-js-sdk'
import { JKA } from '@ruguoapp/jk-analytics'
import { JikeNavigation } from '@ruguoapp/vue-jike-navigation'
import { wrapAuth, refreshAuthToken } from '@ruguoapp/jike-auth-axios'
// import * as Sentry from '@sentry/browser'
import axios from 'axios'
import qs from 'qs'
import App from './App.vue'
import router from './router'

// Sentry.init({
//   dsn: '__DSN__',
//   // ...
// })
const params = qs.parse(location.search, { ignoreQueryPrefix: true })
JKA.setCurrentPage('photo_wall')
JKA.registerProperty('topic_id', params.topic)
Vue.use(JikeNavigation, { router, scroll: false })
Vue.prototype.$event = params => JKA.event(params)
Vue.config.productionTip = false

function init () {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    router,
    components: { App },
    render: (h) => <App/>,
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
