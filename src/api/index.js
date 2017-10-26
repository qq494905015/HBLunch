import config from './config'
import axios from 'axios'

export default {
  queryPageOrder (param) {
    var method = '/back/orderResource/queryOrderList'
    return axios.post(method, JSON.stringify(param), config)
  },

}

