<template>
  <div id="login">
    <h1>和本饭店后台订单管理 系统</h1>
    <div class="container w3">
      <h2>现在登录</h2>
      <div  class="loginForm"  >
        <div class="username">
          <span class="username" style="height:19px">用户:</span>
          <input type="text" name="name"  v-model="formParams.loginName" class="name" placeholder="请输入账号" required="">
          <div class="clear"></div>
        </div>
        <div class="password-agileits">
          <span class="username"style="height:19px">密码:</span>
          <input type="password" name="password"  v-model="formParams.password" class="password" placeholder="请输入密码" required="">
          <div class="clear"></div>
        </div>
       <!-- <div class="rem-for-agile">
          <input type="checkbox" name="remember" class="remember">记得我
          　　
          <br>
          <a href="#">忘记了密码</a><br>
        </div>-->
        <div class="login-w3">
          <input type="submit" class="login" value="Login"  v-on:click="handleSubmit">
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/';
  export default {
    name: 'login',
    data() {
      return {
        activeIndexTmp: '',
        formParams:{
          loginName:'',
          password:'',
        }
      };
    },
    methods: {
      // 重置表单
      handleReset () {
        this.$refs.ruleForm.resetFields()
      },
      handleSubmit () {
        // 验证表单
        var THAT = this;
        const loading = this.$loading({lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        if(this.formParams.loginName&&this.formParams.password){
          api.queryLoginInfo(this.formParams).then((response) => {
            if(response.data){
              THAT.$message({message: '登录成功 正在跳转...',type: 'success' });
              THAT.$router.push('/Analysis')
              loading.close();
            }else{
              loading.close();
              THAT.$message({message: '帐号或者密码错误',type: 'error' });
            }
          }).catch((response) => {
            loading.close();
            THAT.$message({message: '访问超时',type: 'error' });
          });
        }
      },
    },
    watch:{
    },
    created() {

    },
    mounted: function () {
    }
  }
</script>

<style scoped>
  @import "../../../assets/login/css/style.css";
</style>
