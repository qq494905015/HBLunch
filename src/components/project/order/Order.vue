<template>
  <div >
    订单管理
  </div>
</template>

<script>
  import api from '../../../api/';
  export default {
  name: 'Order',
  data () {
    return {
      msg: '订单管理'
    }
  },
    created() {

    },
    mounted:function() {
      api.getExcelTest();

    },
    methods:{

    }
}
</script>

<style scoped>

</style>
