import Vue from 'vue'
import Router from 'vue-router'
import { JKA } from '@ruguoapp/jk-analytics'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        pageName: 'home',
      },
    },
  ],
})

router.afterEach((to, from) => {
  JKA.event({
    action: 'page_view',
    label: to.meta.pageName,
  })
})

export default router
