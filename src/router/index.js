import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/project/Main'
import Login from '@/components/project/login/Login'
import Menu_class from '@/components/project/menu/Menu_class'
import Menu_dishes from '@/components/project/menu/Menu_dishes'
import Analysis from '@/components/project/analysis/Analysis'
import Order_his from '@/components/project/order/OrderHis'
import Order_new from '@/components/project/order/OrderNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/Order_his',
      name: 'Order_his',
      component: Order_his
    },
    {
      path: '/Order_new',
      name: 'Order_new',
      component: Order_new
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
  ]
})
