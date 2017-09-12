import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Order from '@/components/project/order/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    }
  ]
})
