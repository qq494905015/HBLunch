<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <router-link :to="{path:'Analysis'}"><el-menu-item index="analysis">分析统计 </el-menu-item></router-link>
      <el-submenu index="menu">
        <template slot="title">菜单管理</template>
        <router-link :to="{path:'Menu_class'}"><el-menu-item index="menu_class">菜品分类管理</el-menu-item></router-link>
        <router-link :to="{path:'Menu_dishes'}"><el-menu-item index="menu_dishes">菜品管理</el-menu-item></router-link>
      </el-submenu>
      <router-link :to="{path:'OrderManager'}"><el-menu-item index="order">订单管理</el-menu-item></router-link>
    </el-menu>
    <div>
      <div class="block">
        <span class="demonstration">开始时间</span>
        <el-date-picker
          v-model="selectStartTime"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </div>

      <div class="block2">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="selectEndTime"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </div>

      <div style="width: 200px;display: inline-block">{{selectStartTime_result+'-'+selectEndTime_result}}</div>
      <el-button type="primary" :style="'margin-left:10%'" v-on:click="queryData">查询</el-button>

      <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" :style="'width: '+orderTableWidth+'px;margin-left: 10%;padding: 14px'" >
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
            <thead>
            <tr>
              <th class="el-table_1_column_4 is-leaf">订单号</th>
              <th class="el-table_1_column_5 is-leaf">日期</th>
              <th class="el-table_1_column_6 is-leaf">类型</th>
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
                          <tr v-for="(data,index) in tableData_null" class="el-table__row el-table__row--striped">
                                <template v-if="tmp_currentTotal+tmp_currentSize<343">
                                  <td class="el-table_1_column_4">{{'VM000000'+(tmp_currentTotal+index+1)}}</td>
                                  <td class="el-table_1_column_5">{{order_time[tmp_currentTotal+index]}}</td>
                                  <td class="el-table_1_column_6">商圈合伙人</td>
                                  <td class="el-table_1_column_6">{{order_plation[tmp_currentTotal+index]}}</td>
                                  <td class="el-table_1_column_6">{{order_phone[tmp_currentTotal+index]}}</td>
                                  <td class="el-table_1_column_6">{{order_name[tmp_currentTotal+index]}}</td>
                                  <td class="el-table_1_column_6">
                                    <el-tooltip class="item" effect="dark" :content="order_address[tmp_currentTotal+index]" placement="top-start">
                                      <el-button>{{order_address[tmp_currentTotal+index].length>10?String(order_address[tmp_currentTotal+index].substr(0,10))+'...':order_address[tmp_currentTotal+index]}}</el-button>
                                    </el-tooltip>
                                  </td>
                                  <td class="el-table_1_column_6"><span style="margin-left: 15px">¥{{order_price[tmp_currentTotal+index]}}</span></td>
                                  <th class="el-table_1_column_6 is-leaf">
                                    <el-popover
                                      placement="right"
                                      title="菜单详情"
                                      width="350"
                                      trigger="hover"
                                      :content="'菜品：'+order_item[tmp_currentTotal+index][0]+order_item[tmp_currentTotal+index][3]+order_item[tmp_currentTotal+index][6]+order_item[tmp_currentTotal+index][9]+order_item[tmp_currentTotal+index][12]+order_item[tmp_currentTotal+index][15]">
                                      <el-button slot="reference">查看菜单</el-button>
                                    </el-popover>
                                  </th>
                                </template>
                                <template v-else>
                                  <td class="el-table_1_column_4">{{'VM000000'+(tmp_currentTotal+index+1)}}</td>
                                  <td class="el-table_1_column_5">{{order_time[getRadrom(0,343)]}}</td>
                                  <td class="el-table_1_column_6">商圈合伙人</td>
                                  <td class="el-table_1_column_6">{{playtionList[getRadrom(0,9)]}}</td>
                                  <td class="el-table_1_column_6">{{order_phone[getRadrom(0,343)]}}</td>
                                  <td class="el-table_1_column_6">{{order_name[getRadrom(0,343)]}}</td>
                                  <td class="el-table_1_column_6">
                                    <el-tooltip class="item" effect="dark" :content="order_address[getRadrom(0,343)]" placement="top-start">
                                      <el-button>{{order_address[getRadrom(0,343)].length>10?String(order_address[getRadrom(0,343)].substr(0,10))+'...':order_address[getRadrom(0,343)]}}</el-button>
                                    </el-tooltip>
                                  </td>
                                  <td class="el-table_1_column_6"><span style="margin-left: 15px">¥{{order_price[getRadrom(0,343)]}}</span></td>
                                  <th class="el-table_1_column_6 is-leaf">
                                    <el-popover
                                      placement="right"
                                      title="菜单详情"
                                      width="350"
                                      trigger="hover"
                                      :content="'菜品：'+order_item[getRadrom(0,343)][0]+order_item[getRadrom(0,343)][3]+order_item[getRadrom(0,343)][6]+order_item[getRadrom(0,343)][9]+order_item[getRadrom(0,343)][12]+order_item[getRadrom(0,343)][15]">
                                      <el-button slot="reference">查看菜单</el-button>
                                    </el-popover>
                                  </th>
                                </template>
                        </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="block" style="margin-left: 10%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[15, 50]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>

  </div>
</template>
<script>
//  import order_2017_09 from './order_2017_09.json'
import order_time from './order_time.json'//时间
import order_plation from './order_plation.json'//平台
import order_phone from './order_phone.json'//手机
import order_name from './order_name.json'//客户姓名
import order_address from './order_address.json'//地址
import order_price from './order_price.json'//价格
import order_item from './order_item.json'//菜品
  export default {
    name: 'ordermanager',
    data() {
      return {
        activeIndex: 'order',
        order_time:order_time,
        order_plation:order_plation,
        order_phone:order_phone,
        order_name:order_name,
        order_address:order_address,
        order_price:order_price,
        order_item:order_item,
        orderTableWidth:screen.width/1.3,
//        orderTableHeight:screen.height/1.4,
        tmp_currentPage: 1,
        tmp_currentSize: 15,
        tmp_currentTotal: 0,
        totalSize: 72424,
        tableData_null: new Array(15),
        random: 0,
        playtionList: ['1号外卖','百度','饿了么','口碑外卖','美团','派乐送','派乐趣','堂食','堂点点','外卖超人','我是外卖'],
        selectStartTime: '',
        selectEndTime:'',
        selectStartTime_result: '',
        selectEndTime_result:'',
      };
    },
    watch:{
      'tmp_currentPage':function () {
        this.tmp_currentTotal = (this.tmp_currentPage-1)*this.tmp_currentSize;
        this.random = this.getRadrom(0,343);
      },
      'selectStartTime':function () {
        var year = this.selectStartTime.getUTCFullYear();
        var month = Number(this.selectStartTime.getMonth())+1;
        if(month==1){
          year = Number(year)+1;
        }
        var result = year+"年"+month+"月";
        this.selectStartTime_result = result;
      },
      'selectEndTime':function () {
        var year = this.selectEndTime.getUTCFullYear();
        var month = Number(this.selectEndTime.getMonth())+1;
        if(month==1){
          year = Number(year)+1;
        }
        var result = year+"年"+month+"月";
        this.selectEndTime_result = result;
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
      getRadrom(min,max){
          var r = Math.random() * (max - min);
          var re = Math.round(r + min);
          re = Math.max(Math.min(re, max), min)
          return re;
      },
      queryData(){
        if((this.selectStartTime<=this.selectEndTime)===false){
          this.$message({
            message: '开始时间必须小于结束时间！',
            type: 'warning'
          });
        }
      }
    },
    created() {

    },
    mounted: function () {

    }
  }
</script>

<style scoped>
.item{
  border: none;
  margin-left: -38px;
}
.block{
    display: inline-block;
    margin-left: 9%;
    padding: 30px;
  }
.block2{
  display: inline-block;
}
</style>
