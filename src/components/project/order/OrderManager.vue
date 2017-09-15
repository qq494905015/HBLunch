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
      <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" :style="'width: '+orderTableWidth+'px;margin-left: 10%;padding: 14px;height:'+orderTableHeight+'px'" >
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
            <thead>
            <tr>
              <th class="el-table_1_column_4 is-leaf">订单号</th>
              <th class="el-table_1_column_5 is-leaf">日期</th>
              <th class="el-table_1_column_6 is-leaf">类型</th>
              <th class="el-table_1_column_6 is-leaf">店名</th>
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
              <tr v-for="(order_name,index) in order_name" class="el-table__row el-table__row--striped">
                <td class="el-table_1_column_4">{{'VM000000'+(index+1)}}</td>
                <td class="el-table_1_column_5">{{order_time[index]}}</td>
                <td class="el-table_1_column_6">商圈合伙人</td>
                <td class="el-table_1_column_6">白云区</td>
                <td class="el-table_1_column_6">{{order_plation[index]}}</td>
                <td class="el-table_1_column_6">{{order_phone[index]}}</td>
                <td class="el-table_1_column_6">{{order_name}}</td>
                <td class="el-table_1_column_6">
                  <el-tooltip class="item" effect="dark" :content="order_address[index]" placement="top-start">
                    <el-button>{{order_address[index].length>10?String(order_address[index].substr(0,10))+'...':order_address[index]}}</el-button>
                  </el-tooltip>
                </td>
                <td class="el-table_1_column_6"><span style="margin-left: 15px">¥{{order_price[index]}}</span></td>
                <th class="el-table_1_column_6 is-leaf">
                  <el-popover
                    placement="right"
                    title="菜单详情"
                    width="350"
                    trigger="hover"
                    :content="'菜品：'+order_item[index][0]+order_item[index][3]+order_item[index][6]+order_item[index][9]+order_item[index][12]+order_item[index][15]">
                    <el-button slot="reference">查看菜单</el-button>
                  </el-popover>
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[15, 50, 100, 200]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
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
        orderTableHeight:screen.height/1.4,
      };
    },
    methods: {
      //点击菜单触发事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //加载分类
      init_data_order(){

      },
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
</style>
