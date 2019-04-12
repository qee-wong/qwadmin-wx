import Vue from 'vue'
import Router from 'vue-router'
import ToGo from '@/components/ToGo'
import Identity from '@/components/Identity'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'ToGo',
      component: ToGo
    },
    {
      path: '/setrole/:userId',
      name: 'Indentity',
      component: Identity
    }
  ]
})
