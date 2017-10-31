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
        </el-submenu>
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
      };
    },
    methods: {
      //点击菜单触发事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
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
    }
  }
</script>

<style >
  a:-webkit-any-link {
    text-decoration: none;
  }
</style>
