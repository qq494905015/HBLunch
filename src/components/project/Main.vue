<template>
  <div id="main">
    <div>
      <el-menu theme="dark" :default-active="activeIndexTmp" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
        <el-submenu index="order">
          <template slot="title">订单管理</template>
          <router-link :to="{path:'Order_his'}">
            <el-menu-item index="order_his">历史订单</el-menu-item>
          </router-link>
          <router-link :to="{path:'Order_new'}">
            <el-menu-item index="order_new">动态订单</el-menu-item>
          </router-link>
          <router-link :to="{path:'Order_insert'}" v-if="userInfo&&userInfo.type == '1'">
            <el-menu-item index="order_insert">模拟订单(测试)</el-menu-item>
          </router-link>
        </el-submenu>
        <div style="float: right;display: inline-block;padding: 19px;color:white;cursor: pointer" v-on:click="loginOut">
          <template v-if="userInfo">当前门店：{{userInfo.role}} </template>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index';
  export default {
    name: 'main',
    props:['activeIndex'],
    data() {
      return {
        activeIndexTmp: '',
        userInfo:undefined,
      };
    },
    methods: {
      //点击菜单触发事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      loginOut(){
        var THAT = this ;
        this.$confirm('是否注销该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清除用户信息缓存
          sessionStorage.removeItem("userInfo");
          this.$message({
            type: 'success',
            message: '注销成功，正在跳转登录页面!'
          });
          THAT.$router.push({ name: 'Login'})
        }).catch(() => {

        });
      }
    },
    watch:{
      'activeIndexTmp':function (obj,obj2) {
        this.activeIndexTmp = this.activeIndex;
      },
    },
    created() {

    },
    mounted: function () {
      this.activeIndexTmp = this.activeIndex;
     // this.userInfo = this.$route.params.userInfo;
      this.userInfo = eval('('+sessionStorage.getItem("userInfo")+')');
    }
  }
</script>

<style >
  a:-webkit-any-link {
    text-decoration: none;
  }
</style>
