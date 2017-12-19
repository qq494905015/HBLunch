<template>
  <div>
    <app-header :activeIndex="activeIndex"></app-header>
    <div :style="'width:'+(orderTableWidth)+'px;'" class="demo-block2">订单录入</div>
    <div :style="'width:'+(orderTableWidth)+'px;'" class="demo-block">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name" :style="'width:40%;display:inline-block'">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :style="'width:59.3%;display:inline-block'">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="门店选择" prop="storeName" style=" display: inline-block;width: 40%;">
          <el-select v-model="ruleForm.storeName" clearable placeholder="请选择门店" style=" width: 100%;">
            <el-option
              v-for="item in store"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单时间" prop="orderDate" style=" display: inline-block;width: 59.3%;">
            <el-date-picker style="width: 100%;"
              v-model="ruleForm.orderDate"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="菜品名" prop="menuName" placeholder="如果有多个菜品用英文逗号隔开" :style="'width:40%;display:inline-block'">
          <el-input v-model="ruleForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="份数" prop="menuCount" placeholder="如果有多个菜品用英文逗号隔开" :style="'width:29%;display:inline-block'">
          <el-input v-model="ruleForm.menuCount"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="menuPrice" placeholder="如果有多个菜品用英文逗号隔开" :style="'width:30%;display:inline-block'">
          <el-input v-model="ruleForm.menuPrice"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="是否生效" prop="type">
          <el-switch v-model="ruleForm.type"></el-switch>
        </el-form-item>
        <el-form-item label="平台" prop="plation">
          <el-radio-group v-model="ruleForm.plation" >
            <el-radio :label="plaionObj" v-for="(plaionObj,index) in plationList" :key="index"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/';
  import main from '../Main.vue';
  export default {
    name: 'order_insert',
    components:{
      appHeader:main
    },
    data() {
      return {
        activeIndex:'order_insert',
        orderTableWidth: screen.width /1.3,
        selectStore: '',
        store: [{value: '白云区', label: '白云区'}, {value: '佛山区', label: '佛山区'}, {
          value: '海珠区',
          label: '海珠区'
        }, {value: '湖南壹区', label: '湖南壹区'}, {value: '萝岗区', label: '萝岗区'}, {value: '深圳区', label: '深圳区'}, {
          value: '天河贰区',
          label: '天河贰区'
        }, {value: '天河壹区', label: '天河壹区'}, {value: '越秀区', label: '越秀区'}],
        userInfo:undefined,
//        plationList: [ "1号外卖","百度", "饿了么", "口碑外卖", "美团", "派乐送", "派乐趣","堂食",  "堂点点","外卖超人", "我是外卖" ],
        plationList: [ "电话下单","小团餐"],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        ruleForm: {
          name: '',
          address: '',
          phone: '',
          storeName: '',
          orderDate: '',
          type: true,
          plation: '',
          menuName: '',
          menuCount: '',
          menuPrice: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'change' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请选择地址', trigger: 'change' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机或固话', trigger: 'change' },
            { min: 1, max: 100, message: '长度在 5 到 11 个字符', trigger: 'change' }
          ],
          storeName: [
            { required: true, message: '请选择门店', trigger: 'change' },
          ],
          orderDate: [
            { type: 'date', required: true, message: '请选择年月日时分秒', trigger: 'change' }
          ],
          plation: [
            { required: true, message: '请选择平台', trigger: 'change' }
          ],
          menuName: [
            { required: true, message: '请输入菜品名字', trigger: 'blur' }
          ],
          menuCount: [
            { required: true, message: '请输入份数', trigger: 'change' }
          ],
          menuPrice: [
            { required: true, message: '请输入总价', trigger: 'change' }
          ],
        }
      };
    },
    watch: {
    },
    methods: {
      submitForm(formName) {
        var THAT = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = THAT.getParams();
           /* var params =
              {
                address: "234567890",
                menuCount: "1",
                menuName: "椰菜花",
                menuPrice: "12",
                name: "老王2",
                orderDate: "2017-11-01 18:23:16",
                phone: "137909384",
                plation: "1号外卖",
                storeName: "海珠区",
                type: '1'
              }*/
            const loading = this.$loading({lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
            if(params){
              api.insertOrder(params).then((response) => {
                debugger
                if(response.data){
                  if(Number(response.data)>0){
                    THAT.$message({message: '创建成功',type: 'success' });
                  }
                  loading.close();
                }else{
                  loading.close();
                  THAT.$message({message: '新增出错',type: 'error' });
                }
              }).catch((response) => {
                loading.close();
                THAT.$message({message: '访问超时',type: 'error' });
              });

            }else{
              this.$nextTick(function(){
                loading.close();
              })
              return false;
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getParams(){
        var THAT = this;
        debugger
        var params = $.extend({},THAT.ruleForm);
        params.orderDate =params.orderDate.Format("yyyy-MM-dd hh:mm:ss");
        if(params.menuName){
         var menuLength =  params.menuName.split(",").length;
         if(params.menuCount.split(",").length!=menuLength||params.menuPrice.split(",").length!=menuLength){
           THAT.$message({message: '菜品数、分数、总价格式不对！',type: 'warning' });
           return false;
         }
         if(params.type){
           params.type='1';
         }else{
           params.type = '0';
         }
        }
        console.info(params);
        return params;
      },
      initDateFormate(){
        Date.prototype.Format = function (fmt) { //author: meizz
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
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
      //日期格式化初始化
      this.initDateFormate();
    },
    destroyed: function () {
    }
  }
</script>

<style scoped>
  .block {
    display: inline-block;
    margin-left: 9%;
    padding: 30px;
  }
  .demo-block {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    margin-left: 7%;margin-bottom:1%;padding: 20px;
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
  }
  .demo-block2 {
    border: 1px solid #ebebeb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transition: .2s;
    margin-left: 7%;padding: 20px;
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    background-color: #1d90e6;
    color: #4db3ff;
    text-align: center;
  }
</style>
