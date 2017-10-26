import Qs from 'qs'
//  baseURL 请求后台网关地址  wxUrl 微信url   trackUrl 埋点js地址
export default{
  url: '/route',
  baseURL:'http://localhost:8080',
  appId: '000101',
  method: 'POST',
  /* transformRequest: [function (data) {
   // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
   data = JSON.stringify(data);
   // 由于使用的form-data传数据所以要格式化
   data = Qs.stringify(data);
   return data;
   }],
   */
//  ...mapActions([USER_SIGNIN]),
  transformResponse: [function (data) {
    return data
  }],
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  params: {
  },
  paramsSerializer: function (params) {
    return Qs.stringify(params)
  },
  data: {
  },
  timeout: 20000,
  withCredentials: false, // default
  responseType: 'json', // default
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  maxContentLength: 2000,
  validateStatus: function (status) {
    return status >= 200 && status < 300// default
  },
  maxRedirects: 5// default
}
