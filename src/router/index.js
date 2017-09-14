import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Order from '@/components/project/order/Order'
import Main from '@/components/project/Main'
import Menu_class from '@/components/project/menu/Menu_class'
import Menu_dishes from '@/components/project/menu/Menu_dishes'
import Analysis from '@/components/project/analysis/Analysis'
import OrderManager from '@/components/project/order/OrderManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Menu_class',
      name: 'Menu_class',
      component: Menu_class
    },
    {
      path: '/Menu_dishes',
      name: 'Menu_dishes',
      component: Menu_dishes
    },
    {
      path: '/Analysis',
      name: 'Analysis',
      component: Analysis
    },
    {
      path: '/OrderManager',
      name: 'OrderManager',
      component: OrderManager
    },

  ]
})
