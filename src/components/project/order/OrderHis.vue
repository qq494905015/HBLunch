<template>
  <div>
    <app-header :activeIndex="activeIndex" ref="header"></app-header>
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

        <template v-if="userInfo&&userInfo.type =='1'">
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
                <template v-if="tableData.length==0">
                  <tr>
                    <td colspan="9" style="text-align: center">查无数据</td>
                  </tr>
                </template>
                <tr v-for="(data,index) in tableData" class="el-table__row el-table__row--striped">
                    <td class="el-table_1_column_5">{{data.orderId}}</td>
                    <td class="el-table_1_column_5">{{data.orderDate}}</td>
                    <td class="el-table_1_column_5">{{data.storeName}}</td>
                    <td class="el-table_1_column_5">{{data.plation}}</td>
                    <td class="el-table_1_column_5">{{data.phone}}</td>
                    <td class="el-table_1_column_5">{{data.name}}</td>
                    <td class="el-table_1_column_5">{{data.address}}</td>
                    <td class="el-table_1_column_5">{{data.orderPrice}}</td>
                      <!--<template v-for="(name,index) in String(data.menuName).split(',')">
                          {{name+'*'+String(data.menuCount).split(',')[index]+' ￥'+String(data.menuPrice).split(',')[index]}}
                      </template>-->
                    <td class="el-table_1_column_6 is-leaf">
                      <span>
                        <div class="el-popover" :id="'menuTip'+index" style="width: 350px; display: none;    left: -376px;">
                          <template v-for="(name,menuIndex) in String(data.menuName).split(',')">
                            {{name=='null'?'暂无点菜':(name+'*'+String(data.menuCount).split(',')[menuIndex]+' ￥'+String(data.menuPrice).split(',')[menuIndex])}}</br>
                         </template>
                        </div>
                        <el-button @click="queryMenu('menuTip'+index)" >查看菜单</el-button>
                      </span>
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
  import main from '../Main.vue';
  export default {
    name: 'order_his',
    components:{
      appHeader:main
    },
      data() {
      return {
        activeIndex:'order_his',
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
        userInfo:undefined
      };
    },
    watch: {
      'tmp_currentPage': function () {
        this.tmp_currentTotal = (this.tmp_currentPage - 1) * this.tmp_currentSize;
      },
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
        this.queryData();
      },
      getDate(datestr) {
        var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1], temp[2]);
        return date;
      },
      //查询数据
      queryData() {
       var THAT = this;
        const loading = this.$loading({lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        var params = THAT.getParams();
       if(params){
         api.queryPageOrder(params).then((response) => {
           if(response.data){
             THAT.tableData = response.data.list;
             THAT.totalSize = response.data.total;
             loading.close();
           }else{
             loading.close();
             THAT.$message({message: '访问超时',type: 'error' });
           }
         }).catch((response) => {
           loading.close();
           THAT.$message({message: '访问超时',type: 'error' });
         });
       }else{
         this.$nextTick(function(){
           loading.close();
         })
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
/*        if(!selectStore){
          THAT.$message({message: '请选择门店再查询',type: 'warning' });
          return false;
        }*/

        selectStartTime = selectStartTime.getFullYear() + "-" + (((selectStartTime.getMonth() + 1).toString().length == 1 ? "0" + (selectStartTime.getMonth() + 1).toString() : (selectStartTime.getMonth() + 1).toString())) + "-" + ((selectStartTime.getDate()).toString().length == 1 ? "0" + (selectStartTime.getDate()).toString() : (selectStartTime.getDate()).toString());
        selectEndTime = selectEndTime.getFullYear() + "-" + (((selectEndTime.getMonth() + 1).toString().length == 1 ? "0" + (selectEndTime.getMonth() + 1).toString() : (selectEndTime.getMonth() + 1).toString())) + "-" + ((selectEndTime.getDate()).toString().length == 1 ? "0" + (selectEndTime.getDate()).toString() : (selectEndTime.getDate()).toString());
        params.page = THAT.tmp_currentPage;
        params.rows = THAT.tmp_currentSize;
        params.selectStartTime = selectStartTime+" 00:00:00";
        params.selectEndTime = selectEndTime+" 23:59:59";
        params.storeName = selectStore;
        return params;
      },
      queryMenu(data){
        if($('#'+data).is(':visible')){
          $('#'+data).hide();
        }else{
          $('#'+data).show();
        }
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
