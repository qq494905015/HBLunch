//加载excel模块
// var xlsx = require('node-xlsx');
// var fs = require("fs");
export default {
  getExcelTest () {
    debugger
    var xlsx = require('node-xlsx');
    obj = xlsx.parse('./test.xlsx');
    console.log(JSON.stringify(obj));
  },
  getExcelTest2 () {
    debugger
    var xlsx2json = require('node-xlsx2json');
    xlsx2json('./test.xlsxx', function(error, result) {
      console.log(JSON.stringify(result));
    });

  },
}
