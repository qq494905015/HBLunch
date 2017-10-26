<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <router-link :to="{path:'Analysis'}">
        <el-menu-item index="analysis">分析统计 </el-menu-item>
      </router-link>
      <el-submenu index="menu">
        <template slot="title">菜单管理</template>
        <router-link :to="{path:'Menu_class'}">
          <el-menu-item index="menu_class">菜品分类管理</el-menu-item>
        </router-link>
        <router-link :to="{path:'Menu_dishes'}">
          <el-menu-item index="menu_dishes">菜品管理</el-menu-item>
        </router-link>
      </el-submenu>
      <router-link :to="{path:'OrderManager'}">
        <el-menu-item index="order">订单管理</el-menu-item>
      </router-link>
    </el-menu>
    <div>

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
        <el-button type="primary" :style="'margin-left:10%'">EXCEL导出</el-button>

      </template>

      <template>
        <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition"
             :style="'width: '+orderTableWidth+'px;margin-left: 10%;padding: 14px'">
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
              <thead>
              <tr>
                <th class="el-table_1_column_4 is-leaf">订单号</th>
                <th class="el-table_1_column_5 is-leaf">日期</th>
                <th class="el-table_1_column_5 is-leaf">店名</th>
                <th class="el-table_1_column_6 is-leaf">点餐平台</th>
                <th class="el-table_1_column_6 is-leaf">电话</th>
                <th class="el-table_1_column_6 is-leaf">姓名</th>
                <th class="el-table_1_column_6 is-leaf">送餐地址</th>
                <th class="el-table_1_column_6 is-leaf">订单金额</th>
                <th class="el-table_1_column_6 is-leaf">菜名</th>
              </tr>
              </thead>
            </table>
            <div class="el-table__body-wrapper">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                <tr v-for="(data,index) in tableData" class="el-table__row el-table__row--striped">
                    <td class="el-table_1_column_5">{{data.orderid}}</td>
                    <td class="el-table_1_column_5">{{data.orderdate}}</td>
                    <td class="el-table_1_column_5">{{data.storename}}</td>
                    <td class="el-table_1_column_5">{{data.plation}}</td>
                    <td class="el-table_1_column_5">{{data.phone}}</td>
                    <td class="el-table_1_column_5">{{data.name}}</td>
                    <td class="el-table_1_column_5">{{data.address}}</td>
                    <td class="el-table_1_column_5">{{data.orderprice}}</td>
                    <td class="el-table_1_column_6 is-leaf">
                      <el-popover
                        placement="right"
                        title="菜单详情"
                        width="350"
                        trigger="hover"
                        :content="'菜品：'+data.items">
                        <el-button slot="reference">查看菜单</el-button>
                      </el-popover>
                    </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="block" style="margin-left: 10%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10,20,50]"
        :page-size="tmp_currentSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import api from '../../../api/';
  export default {
    name: 'ordermanager',
    data() {
      return {
        activeIndex: 'order',
        orderTableWidth: screen.width / 1.3,
        tmp_currentPage: 1,
        tmp_currentSize: 10,
        tmp_currentTotal: 0,
        totalSize: 0,
        selectStore: '', selectStore_tmp: [],
        selectTime: '', selectTime_tmp: [],
        store: [{value: '白云区', label: '白云区'}, {value: '佛山区', label: '佛山区'}, {
          value: '海珠区',
          label: '海珠区'
        }, {value: '湖南壹区', label: '湖南壹区'}, {value: '萝岗区', label: '萝岗区'}, {value: '深圳区', label: '深圳区'}, {
          value: '天河贰区',
          label: '天河贰区'
        }, {value: '天河壹区', label: '天河壹区'}, {value: '越秀区', label: '越秀区'}],
        tableData:[],
      };
    },
    watch: {
      'tmp_currentPage': function () {
        this.tmp_currentTotal = (this.tmp_currentPage - 1) * this.tmp_currentSize;
      },
      'selectTime': function () {
      },
      'selectStore': function () {
      }
    },
    methods: {
      //点击菜单触发事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.tmp_currentSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.tmp_currentPage = val;
      },
      getDate(datestr) {
        var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1], temp[2]);
        return date;
      },
      //查询数据
      queryData() {
       /* this.tableData = [
          {orderid:'123','orderdate':'2017-10-24','type':'1','storename':'白云区','plation':'饿了么','phone':'13798003831','name':'老王','address':'皇后大道东','orderprice':'12'}
        ];*/
       var THAT = this;
       var params = THAT.getParams();
       if(params){
         api.queryPageOrder(params).then((response) => {
           if(response.data){
             THAT.tableData = response.data.list;
             THAT.totalSize = response.data.total;
           }
         }).catch((response) => {
           console.info(response);
           // Indicator.close();
           //Toast("访问超时");
         });
       }
      },
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
        if(!selectStore){
          THAT.$message({message: '请选择门店再查询',type: 'warning' });
          return false;
        }

        selectStartTime = selectStartTime.getFullYear() + "-" + (((selectStartTime.getMonth() + 1).toString().length == 1 ? "0" + (selectStartTime.getMonth() + 1).toString() : (selectStartTime.getMonth() + 1).toString())) + "-" + ((selectStartTime.getDate()).toString().length == 1 ? "0" + (selectStartTime.getDate()).toString() : (selectStartTime.getDate()).toString());
        selectEndTime = selectEndTime.getFullYear() + "-" + (((selectEndTime.getMonth() + 1).toString().length == 1 ? "0" + (selectEndTime.getMonth() + 1).toString() : (selectEndTime.getMonth() + 1).toString())) + "-" + ((selectEndTime.getDate()).toString().length == 1 ? "0" + (selectEndTime.getDate()).toString() : (selectEndTime.getDate()).toString());
        var startTime = this.getDate(selectStartTime);
        var endTime = this.getDate(selectEndTime);
        params.page = THAT.tmp_currentPage;
        params.rows = THAT.tmp_currentSize;
        params.selectStartTime = selectStartTime;
        params.selectEndTime = selectEndTime;
        params.storename = selectStore;
        return params;
      }
    },
    created() {

    },
    mounted: function () {

    }
  }
</script>

<style scoped>
  .item {
    border: none;
    margin-left: -38px;
  }

  .block {
    display: inline-block;
    margin-left: 9%;
    padding: 30px;
  }
</style>
