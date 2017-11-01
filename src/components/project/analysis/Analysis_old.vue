<template>
  <div>
    <app-header :activeIndex="activeIndex"></app-header>
    <template>
      <div class="block">
        <span class="demonstration">日期筛选</span>
        <el-date-picker
          v-model="selectTime"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </div>

      <template>
        <span class="demonstration">门店筛选</span>
        <el-select v-model="selectStore" clearable placeholder="请选择门店">
          <el-option
            v-for="item in store"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>

      <el-button type="primary" :style="'margin-left:10%'" v-on:click="queryData">查询</el-button>
    </template>

    <template >
      <div :style="'height: 127px;margin-left:10%;background-color: #d9d9d9;width:'+orderTableWidth+'px'">
        <el-card class="box-card" :style="'padding: 18px;display:inline-block;margin-left:20px'">
          <div>
            <span >营业额</span>
            <span style="float: right;"><h2 >¥{{orderPrice}}</h2></span>
          </div>
        </el-card>
        <el-card class="box-card" :style="'padding: 18px;display: inline-block;'">
          <div>
            <span>订单数</span>
            <span style="float: right"><h2>{{orderCount}}</h2></span>
          </div>
        </el-card>
        <el-card class="box-card" :style="'padding: 18px;display: inline-block;'">
          <div>
            <span>客单价</span>
            <span style="float: right"><h2>¥{{orderCustomerPrice}}</h2></span>
          </div>
        </el-card>
      </div>
    </template>

    <template>
      <schart :canvasId="chart.canvasId" :type="chart.type" :width="chart.width" style="margin-left: 10%"
              :height="chart.height" :data="chart.data" :options="chart.options"></schart>
    </template>

  </div>
</template>
<script>
  import appHeader from '../Main.vue';
  import orderCountData from '../order/order_count.json'//订单数量
  import Schart from 'vue-schart' //图表制作
  export default {
    name: 'analysis',
    components:{
      Schart,appHeader
    },
    data() {
      return {
        activeIndex: 'analysis',
        orderTableWidth:screen.width/1.3,
        selectStore: '',selectStore_tmp: [],
        selectTime: '', selectTime_tmp: [],
        store: [{
          value: '白云区',
          label: '白云区'
        }, {
          value: '佛山区',
          label: '佛山区'
        }, {
          value: '海珠区',
          label: '海珠区'
        }, {
          value: '河北',
          label: '河北'
        }, {
          value: '湖南壹区',
          label: '湖南壹区'
        },
          {
            value: '萝岗区',
            label: '萝岗区'
          },
          {
            value: '深圳区',
            label: '深圳区'
          },
          {
            value: '天河贰区',
            label: '天河贰区'
          },
          {
            value: '天河壹区',
            label: '天河壹区'
          },
          {
            value: '西安',
            label: '西安'
          },
          {
            value: '越秀区',
            label: '越秀区'
          }
        ],
        orderCountData:orderCountData,
        orderCount:0,//订单数
        orderPrice:0,//营业额
        orderCustomerPrice:0,//客单价
        //图表制作
        chart:{
          canvasId: 'myCanvas',
          type: 'bar',
          width: screen.width/1.3,
          height: 400,
          data: [ ],
          options: {
            padding: 50,                   // canvas 内边距
            bgColor: '#FFFFFF',            // 默认背景颜色
            title: '门店-营业额图表',// 图表标题
            titleColor: '#000000',         // 图表标题颜色
            titlePosition: 'top',    // 图表标题位置: top / bottom
            yEqual: 5,                     // y轴分成5等分
            fillColor: '#1E9FFF',          // 默认填充颜色
            contentColor: '#eeeeee',       // 内容横线颜色
            axisColor: '#666666',          // 坐标轴颜色
          }
        }



      };
    },
    methods: {
      //点击菜单触发事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //加载分类
      init_data_analysis(){

      },
      getDate(datestr) {
        var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1], temp[2]);
        return date;
      },
      queryData(){
        if(!this.selectTime||!this.selectTime[0]){
          return ;
        }
        var selectStartTime = this.selectTime[0];
        var selectEndTime = this.selectTime[1];
        selectStartTime = selectStartTime.getFullYear()+"-"+(((selectStartTime.getMonth()+1).toString().length==1?"0"+(selectStartTime.getMonth()+1).toString():(selectStartTime.getMonth()+1).toString()))+"-"+((selectStartTime.getDate()).toString().length==1?"0"+(selectStartTime.getDate()).toString():(selectStartTime.getDate()).toString());
        selectEndTime = selectEndTime.getFullYear()+"-"+(((selectEndTime.getMonth()+1).toString().length==1?"0"+(selectEndTime.getMonth()+1).toString():(selectEndTime.getMonth()+1).toString()))+"-"+((selectEndTime.getDate()).toString().length==1?"0"+(selectEndTime.getDate()).toString():(selectEndTime.getDate()).toString());
        var startTime = this.getDate(selectStartTime);
        var endTime = this.getDate(selectEndTime);
        var totalOrderCount = 0;
        var totalOrderPrice = 0;
        var totalOrderCustomerPrice = 0;
        var totalOrderCustomerCount = 0;
        //门店-营业额图表数据数组
        this.chart.data = [];
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
          var year = startTime.getFullYear();
          var month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth().toString();
          var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate().toString();
          this.selectTime_tmp.push(startTime.getFullYear()+"年"+startTime.getMonth().toString()+"月"+startTime.getDate().toString()+"日");
          for (var i in this.orderCountData) {
            var data = this.orderCountData[i];
            var time = data["日期"];
            var store = data["店名"];
            var price = Number(data["订单金额"]);
            var orderCount = Number(data["订单数"]);
            var orderCustomerPrice = Number(data["客单价"]);
            if(time == (year + "-" + (month.indexOf("0") == 0 ? month.substr(1, 1) : month) + "-" + (day.indexOf("0") == 0 ? day.substr(1, 1) : day))
              &&  (this.selectStore? this.selectStore == store:true)
            ){
              totalOrderCustomerCount++;
              totalOrderCount+= orderCount;
              totalOrderPrice+= price;
              totalOrderCustomerPrice += orderCustomerPrice
              var flagBreak = true;
              for(var j in  this.chart.data){
                if(this.chart.data[j].name == store){
                  this.chart.data[j].value = (Number(this.chart.data[j].value) + price).toFixed(2);
                  flagBreak = false
                }
              }
              if(flagBreak){
                var chartStore = {
                  "name":store,
                  "value":price.toFixed(2)
                }
                this.chart.data.push(chartStore);
              }
            }
          }
          startTime.setDate(startTime.getDate() + 1);
        }
        this.orderCount = totalOrderCount;
        this.orderPrice = totalOrderPrice.toFixed(2);
        this.orderCustomerPrice = (totalOrderCustomerPrice/(totalOrderCustomerCount?totalOrderCustomerCount:1)).toFixed(2);



      }
    },
    created() {
    },
    mounted: function () {
      $("body").css(
        "background","none"
      )
    }
  }
</script>

<style scoped>
  .block{
    display: inline-block;
    margin-left: 9%;
    padding: 30px;
  }
  .box-card {
    width: 28%;
  }
</style>
