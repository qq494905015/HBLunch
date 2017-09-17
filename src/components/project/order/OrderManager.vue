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

      <template>
            <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" :style="'width: '+orderTableWidth+'px;margin-left: 10%;padding: 14px'" >
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
                  <thead>
                  <tr>
                    <!--<th class="el-table_1_column_4 is-leaf">订单号</th>-->
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
                                <tr v-for="(data,index) in tableData_null" class="el-table__row el-table__row--striped" v-if="totalSize>0">
                                      <template v-if="tmp_currentTotal+tmp_currentSize<orderData.length">
                                       <!--<td class="el-table_1_column_4">{{'VM000000'+(tmp_currentTotal+index+1)}}</td>-->
                                        <td class="el-table_1_column_5">{{selectTime_tmp?selectTime_tmp[getRandom(0,selectTime_tmp.length-1)]:orderData[tmp_currentTotal+index]["日期"]}}</td>
                                        <td class="el-table_1_column_5">{{selectStore_tmp?selectStore_tmp:orderData[tmp_currentTotal+index]["店名"]}}</td>
                                        <td class="el-table_1_column_6">{{orderData[tmp_currentTotal+index]["点餐平台"]}}</td>
                                        <td class="el-table_1_column_6">{{orderData[tmp_currentTotal+index]["电话"]}}</td>
                                        <td class="el-table_1_column_6">{{orderData[tmp_currentTotal+index]["姓名"]}}</td>
                                        <td class="el-table_1_column_6">
                                          <el-tooltip class="item" effect="dark" :content="orderData[tmp_currentTotal+index]['送餐地址']" placement="top-start">
                                            <el-button>{{orderData[tmp_currentTotal+index]['送餐地址'].length>10?String(orderData[tmp_currentTotal+index]['送餐地址'].substr(0,10))+'...':orderData[tmp_currentTotal+index]['送餐地址']}}</el-button>
                                          </el-tooltip>
                                        </td>
                                        <td class="el-table_1_column_6"><span style="margin-left: 15px">¥{{orderData[tmp_currentTotal+index]['订单金额']}}</span></td>
                                        <th class="el-table_1_column_6 is-leaf">
                                          <el-popover
                                            placement="right"
                                            title="菜单详情"
                                            width="350"
                                            trigger="hover"
                                            :content="'菜品：'
                                            +orderData[tmp_currentTotal+index]['项目1']+(orderData[tmp_currentTotal+index]['项目2']?orderData[tmp_currentTotal+index]['项目2']:'')
                                            +(orderData[tmp_currentTotal+index]['项目3']?orderData[tmp_currentTotal+index]['项目3']:'')
                                            +(orderData[tmp_currentTotal+index]['项目4']?orderData[tmp_currentTotal+index]['项目4']:'')
                                            +(orderData[tmp_currentTotal+index]['项目5']?orderData[tmp_currentTotal+index]['项目5']:'')
                                            +(orderData[tmp_currentTotal+index]['项目6']?orderData[tmp_currentTotal+index]['项目6']:'')
                                            +(orderData[tmp_currentTotal+index]['项目7']?orderData[tmp_currentTotal+index]['项目7']:'')
                                            +(orderData[tmp_currentTotal+index]['项目8']?orderData[tmp_currentTotal+index]['项目8']:'')
                                            +(orderData[tmp_currentTotal+index]['项目9']?orderData[tmp_currentTotal+index]['项目9']:'')
                                            +(orderData[tmp_currentTotal+index]['项目10']?orderData[tmp_currentTotal+index]['项目10']:'')
                                            +(orderData[tmp_currentTotal+index]['项目11']?orderData[tmp_currentTotal+index]['项目11']:'')
                                            +(orderData[tmp_currentTotal+index]['项目12']?orderData[tmp_currentTotal+index]['项目12']:'')
                                            +(orderData[tmp_currentTotal+index]['项目13']?orderData[tmp_currentTotal+index]['项目13']:'')
                                            +(orderData[tmp_currentTotal+index]['项目14']?orderData[tmp_currentTotal+index]['项目14']:'')
                                            +(orderData[tmp_currentTotal+index]['项目15']?orderData[tmp_currentTotal+index]['项目15']:'')
                                            +(orderData[tmp_currentTotal+index]['项目16']?orderData[random]['项目16']:'')
                                           ">
                                            <el-button slot="reference">查看菜单</el-button>
                                          </el-popover>
                                        </th>
                                      </template>
                                      <template v-else>
                                        <!--<td class="el-table_1_column_4">{{'VM000000'+(tmp_currentTotal+index+1)}}</td>-->
                                        <td class="el-table_1_column_5">{{selectTime_tmp[getRandom(0,selectTime_tmp.length-1)]}}</td>
                                        <td class="el-table_1_column_5">{{selectStore_tmp?selectStore_tmp:store[getRandom(0,store.length-1)].value}}</td>
                                        <td class="el-table_1_column_6">{{playtionList[getRandom(0,playtionList.length-1)]}}</td>
                                        <td class="el-table_1_column_6">{{orderData[getRandom(0,orderData.length-1)]["电话"]}}</td>
                                        <td class="el-table_1_column_6">{{orderData[getRandom(0,orderData.length-1)]["姓名"]}}</td>
                                        <td class="el-table_1_column_6">
                                          <el-tooltip class="item" effect="dark" :content="orderData[getRandom(0,orderData.length-1)]['送餐地址']" placement="top-start">
                                            <el-button>{{orderData[getRandom(0,orderData.length-1)]['送餐地址'].length>10?String(orderData[getRandom(0,orderData.length-1)]['送餐地址'].substr(0,10))+'...':orderData[getRandom(0,orderData.length-1)]['送餐地址']}}</el-button>
                                          </el-tooltip>
                                        </td>
                                        <td class="el-table_1_column_6"><span style="margin-left: 15px">¥{{orderData[getRandom(0,orderData.length-1)]['订单金额']}}</span></td>
                                        <th class="el-table_1_column_6 is-leaf">
                                          <el-popover
                                            placement="right"
                                            title="菜单详情"
                                            width="350"
                                            trigger="hover"
                                            :content="'菜品：'
                                            +orderData[random]['项目1']+(orderData[random]['项目2']?orderData[random]['项目2']:'')
                                            +(orderData[random]['项目3']?orderData[random]['项目3']:'')
                                            +(orderData[random]['项目4']?orderData[random]['项目4']:'')
                                            +(orderData[random]['项目5']?orderData[random]['项目5']:'')
                                            +(orderData[random]['项目6']?orderData[random]['项目6']:'')
                                            +(orderData[random]['项目7']?orderData[random]['项目7']:'')
                                            +(orderData[random]['项目8']?orderData[random]['项目8']:'')
                                            +(orderData[random]['项目9']?orderData[random]['项目9']:'')
                                            +(orderData[random]['项目10']?orderData[random]['项目10']:'')
                                            +(orderData[random]['项目11']?orderData[random]['项目11']:'')
                                            +(orderData[random]['项目12']?orderData[random]['项目12']:'')
                                            +(orderData[random]['项目13']?orderData[random]['项目13']:'')
                                            +(orderData[random]['项目14']?orderData[random]['项目14']:'')
                                            +(orderData[random]['项目15']?orderData[random]['项目15']:'')
                                            +(orderData[random]['项目16']?orderData[random]['项目16']:'')
                                            ">
                                            <el-button slot="reference">查看菜单</el-button>
                                          </el-popover>
                                        </th>
                                      </template>
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
        :page-sizes="[15, 50]"
        :page-size="tmp_currentSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import orderCount from './order_count.json'//订单数量
import orderData from './order_data.json'//订单数据
  export default {
    name: 'ordermanager',
    data() {
      return {
        activeIndex: 'order',
        orderTableWidth:screen.width/1.3,
//        orderTableHeight:screen.height/1.4,
        tmp_currentPage: 1,
        tmp_currentSize: 15,
        tmp_currentTotal: 0,
        totalSize: 0,
        tableData_null: new Array(15),
        random: 0,
        playtionList: ['1号外卖','百度','饿了么','口碑外卖','美团','派乐送','派乐趣','堂食','堂点点','外卖超人','我是外卖'],
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
        selectStore: '',selectStore_tmp: [],
        selectTime: '', selectTime_tmp: [],
        //test
        orderCount:orderCount,
        orderData:orderData,
      };
    },
    watch:{
      'tmp_currentPage':function () {
        this.tmp_currentTotal = (this.tmp_currentPage-1)*this.tmp_currentSize;
        this.random = this.getRandom(0,this.orderData.length);
      },
      'selectTime':function () {
        //this.orderCount = 0;
      },
      'selectStore':function () {
        //this.orderCount = 0;
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
        this.tableData_null= new Array(val);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.tmp_currentPage = val;
      },
      //随机数生产
      getRandom(min,max){
          var r = Math.random() * (max - min);
          var re = Math.round(r + min);
          re = Math.max(Math.min(re, max), min)
          return re;
      },
      setRandom(min,max){
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min)
        this.random = re;

      },
      getDate(datestr) {
        var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1], temp[2]);
        return date;
      },
      //查询数据
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
        this.selectTime_tmp = [];
        this.selectStore_tmp = this.selectStore;
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
          var year = startTime.getFullYear();
          var month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth().toString();
          var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate().toString();
          this.selectTime_tmp.push(startTime.getFullYear()+"年"+startTime.getMonth().toString()+"月"+startTime.getDate().toString()+"日");
          for (var i in this.orderCount) {
            var data = this.orderCount[i];
            var time = data["日期"];
            var store = data["店名"];
            var price = Number(data["订单金额"]);
            var orderCount = Number(data["订单数"]);
            if(time == (year + "-" + (month.indexOf("0") == 0 ? month.substr(1, 1) : month) + "-" + (day.indexOf("0") == 0 ? day.substr(1, 1) : day))
              &&  (this.selectStore? this.selectStore == store:true)
            ){
              totalOrderCount+= orderCount;
            }
          }
          startTime.setDate(startTime.getDate() + 1);
        }
        this.totalSize = totalOrderCount;
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
