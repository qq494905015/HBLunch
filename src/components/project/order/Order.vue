<template>
  <div>
    <h1>vue-xlsx-table</h1>
    <vue-xlsx-table @on-select-file="handleSelectedFile"></vue-xlsx-table>
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
    },
    methods: {
      handleSelectedFile (convertedData) {
        console.log(convertedData)
      }
    }
}
</script>

<style scoped>

</style>
