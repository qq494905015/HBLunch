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

    <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
          <thead>
            <tr>
              <th class="el-table_1_column_4 is-leaf">菜单名称</th>
              <th class="el-table_1_column_5 is-leaf">描述</th>
              <th class="el-table_1_column_6 is-leaf">图标</th>
            </tr>
          </thead>
        </table>
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tr v-for="(data,index) in tableData" class="el-table__row el-table__row--striped">
              <td class="el-table_1_column_4">{{data.name}}</td>
              <td class="el-table_1_column_5">{{data.description}}</td>
              <td class="el-table_1_column_6">{{data.iconURL}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import data from './class.json'
  export default {
    name: 'menu_class',
    data() {
      return {
        activeIndex: 'menu_class',
        tableData:data
      }
    },
    methods: {
      //点击菜单触发事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //分析统计
      init_data_analysis(){

      },
    },
    created() {
    },
    mounted: function () {


    }
  }
</script>

<style scoped>

</style>
