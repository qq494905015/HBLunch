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

    <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%">
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
          <thead>
          <tr>
            <th class="el-table_1_column_4 is-leaf">菜品名称</th>
            <th class="el-table_1_column_5 is-leaf">所属菜单</th>
            <th class="el-table_1_column_6 is-leaf">价格</th>
            <th class="el-table_1_column_6 is-leaf">库存</th>
            <th class="el-table_1_column_6 is-leaf">月销量</th>
          </tr>
          </thead>
        </table>
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tr v-for="(data,index) in tableData" class="el-table__row el-table__row--striped">
              <td class="el-table_1_column_4">{{data.name}}</td>
              <td class="el-table_1_column_5">{{data.menuItem.description}}</td>
              <td class="el-table_1_column_6">{{data.price}}</td>
              <td class="el-table_1_column_6">{{data.stock}}</td>
              <td class="el-table_1_column_6">{{data.monthSales}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import data from './dishes.json'

  export default {
    name: 'menu_dishes',
    data() {
      return {
        activeIndex: 'menu_dishes',
        tableData:data
      };
    },
    methods: {
      //点击菜单触发事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //加载菜品
      init_data_dishes(){

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
