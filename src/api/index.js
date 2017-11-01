import config from './config'
import axios from 'axios'

export default {
  //分页查询订单
  queryPageOrder (param) {
    var method = '/back/orderResource/queryOrderList'
    return axios.post(method, JSON.stringify(param), config)
  },
  //定时查询订单
  queryPageOrderByTimeJob (param) {
    var method = '/back/orderResource/queryOrderListByTimeJob'
    return axios.post(method, JSON.stringify(param), config)
  },
  //登录帐号查询
  queryLoginInfo (param) {
    var method = '/back/orderResource/queryLoginInfo'
    return axios.post(method, JSON.stringify(param), config)
  },
  //统计营业额
  countOrderPriceForChart (param) {
    var method = '/back/orderResource/countOrderPriceForChart'
    return axios.post(method, JSON.stringify(param), config)
  },
  //统计菜品分额
  countOrderMenuForChart (param) {
    var method = '/back/orderResource/countOrderMenuForChart'
    return axios.post(method, JSON.stringify(param), config)
  },



}

