//加载excel模块
var xlsx = require('node-xlsx');
var path = require('path');
var fs = require('fs');
export default {
  getExcelTest () {
    debugger
    obj = xlsx.parse('./test.xlsx');
    console.log(JSON.stringify(obj));
  },
}
