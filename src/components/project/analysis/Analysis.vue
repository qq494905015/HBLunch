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

      <template v-if="userInfo&&userInfo.type == '1'">
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
      <div :style="'height: 100px;margin-left:10%;background-color: #d9d9d9;width:'+orderTableWidth+'px'">
        <el-card class="box-card" :style="'padding: 18px;display:inline-block;margin-left:20px'">
          <div>
            <span >营业额</span>
            <span style="float: right;"><h3 >¥{{orderPrice?orderPrice.toFixed(2):orderPrice}}</h3></span>
          </div>
        </el-card>
        <el-card class="box-card" :style="'padding: 18px;display: inline-block;'">
          <div>
            <span>订单数</span>
            <span style="float: right"><h3>{{orderCount}}</h3></span>
          </div>
        </el-card>
        <el-card class="box-card" :style="'padding: 18px;display: inline-block;'">
          <div>
            <span>客单价</span>
            <span style="float: right"><h3>¥{{orderCustomerPrice?orderCustomerPrice.toFixed(2):orderCustomerPrice}}</h3></span>
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
  import Schart from 'vue-schart' //图表制作
  import api from '../../../api/';

  export default {
    name: 'analysis',
    components:{
      Schart,appHeader
    },
    data() {
      return {
        activeIndex: 'analysis',
        orderTableWidth:screen.width/1.3,
        selectStore: '',
        selectTime: '',
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
        orderCount:0,//订单数
        orderPrice:0,//营业额
        orderCustomerPrice:0,//客单价
        //图表制作
        chart:{
          canvasId: 'myCanvas',
          type: 'bar',
          width: screen.width/1.3,
          height: 400,
          data: [],
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
        },
        userInfo:undefined,
        loading:undefined
      };
    },
    methods: {
      getParams(){
        var THAT = this;
        var params = {};
        var selectStartTime = this.selectTime[0];
        var selectEndTime = this.selectTime[1];
        var selectStore = THAT.selectStore;
        if(!selectStartTime||!selectEndTime){
          THAT.$message({message: '请选择日期再查询',type: 'warning' });
          return false;
        }

        selectStartTime = selectStartTime.getFullYear() + "-" + (((selectStartTime.getMonth() + 1).toString().length == 1 ? "0" + (selectStartTime.getMonth() + 1).toString() : (selectStartTime.getMonth() + 1).toString())) + "-" + ((selectStartTime.getDate()).toString().length == 1 ? "0" + (selectStartTime.getDate()).toString() : (selectStartTime.getDate()).toString());
        selectEndTime = selectEndTime.getFullYear() + "-" + (((selectEndTime.getMonth() + 1).toString().length == 1 ? "0" + (selectEndTime.getMonth() + 1).toString() : (selectEndTime.getMonth() + 1).toString())) + "-" + ((selectEndTime.getDate()).toString().length == 1 ? "0" + (selectEndTime.getDate()).toString() : (selectEndTime.getDate()).toString());
        params.selectStartTime = selectStartTime+" 00:00:00";
        params.selectEndTime = selectEndTime+" 23:59:59";
        params.storeName = selectStore;
        return params;
      },
      queryData() {
        var THAT = this;
        var params = THAT.getParams();
        THAT.loading = this.$loading({lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        if(params){
          //如果是管理员 就可以查看总营业额
          if(THAT.userInfo&&THAT.userInfo.type == '1'){
            THAT.countOrderPriceForChart(params);
          }
          //如果是地区人员 就可以查看该地区的营业额 以及菜品统计
          if(THAT.userInfo&&THAT.userInfo.type == '2'){
            THAT.countOrderMenuForChart(params);
          }
        }else{
          this.$nextTick(function(){
            THAT.loading.close();
          })
        }
      },
      countOrderPriceForChart(params){
        var THAT = this;
        api.countOrderPriceForChart(params).then((response) => {
          if(response.data){
            var dataList = response.data;
            THAT.chart.data = [];
            THAT.chart.options.title = '门店-营业额图表';
            THAT.orderPrice = 0;
            THAT.orderCount = 0;
            THAT.orderCustomerPrice = 0;
            if(dataList.length>0){
              for(var i in dataList){
                var countOrderPriceObj = dataList[i];
                THAT.orderPrice += Number(countOrderPriceObj.totalOrderPrice?countOrderPriceObj.totalOrderPrice:0);
                THAT.orderCount += Number(countOrderPriceObj.totalOrderCount?countOrderPriceObj.totalOrderCount:0);
                THAT.orderCustomerPrice += Number(countOrderPriceObj.avgOrderPrice?countOrderPriceObj.avgOrderPrice:0);
                var chartObj = {
                  "name":countOrderPriceObj.storeName,
                  "value":Number(countOrderPriceObj.totalOrderPrice?countOrderPriceObj.totalOrderPrice:0).toFixed(2)
                }
                THAT.chart.data.push(chartObj);
              }
            }else{
              var chartObj = {
                "name":'该地区暂无数据',
                "value":0
              }
              THAT.chart.data.push(chartObj);
            }
            THAT.loading.close();
          }else{
            THAT.loading.close();
            THAT.$message({message: '数据响应错误',type: 'error' });
          }
        }).catch((response) => {
          THAT.loading.close();
          THAT.$message({message: '访问超时',type: 'error' });
        });
      },
      countOrderMenuForChart(params){
        var THAT = this;
        api.countOrderMenuForChart(params).then((response) => {
          if(response.data){
            var dataList = response.data;
            THAT.chart.data = [];
            THAT.chart.options.title = '门店-菜品统计';
            THAT.orderPrice = 0;
            THAT.orderCount = 0;
            THAT.orderCustomerPrice = 0;
            if(dataList.length>0){
              for(var i in dataList){
                var countOrderPriceObj = dataList[i];
                if(countOrderPriceObj.menuName){
                  THAT.orderPrice += Number(countOrderPriceObj.totalOrderPrice?countOrderPriceObj.totalOrderPrice:0);
                  THAT.orderCount += Number(countOrderPriceObj.totalOrderCount?countOrderPriceObj.totalOrderCount:0);
                  THAT.orderCustomerPrice += Number(countOrderPriceObj.avgOrderPrice?countOrderPriceObj.avgOrderPrice:0);
                  var chartObj = {
                    "name":countOrderPriceObj.menuName,
                    "value":countOrderPriceObj.totalOrderCount
                  }
                  THAT.chart.data.push(chartObj);
                }
              }
            }else{
              var chartObj = {
                "name":'没菜品',
                "value":0
              }
              THAT.chart.data.push(chartObj);
            }
            THAT.loading.close();
          }else{
            THAT.loading.close();
            THAT.$message({message: '数据响应错误',type: 'error' });
          }
        }).catch((response) => {
          THAT.loading.close();
          THAT.$message({message: '访问超时',type: 'error' });
        });
      }
    },
    created() {
    },
    mounted: function () {
      $("body").css(
        "background","none"
      )
      this.userInfo = eval('('+sessionStorage.getItem("userInfo")+')');
      if(this.userInfo&&this.userInfo.type=='2'){
        this.selectStore = this.userInfo.role;
      }
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
