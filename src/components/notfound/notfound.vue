<template>
  <div>
    <img src="/static/img/logo.png">
    <h1>{{$t('PAGE_NOTFOUND')}}</h1>
    <router-link to="/top">{{$t('RETURN_TO_HOME')}}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'notfound',
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
  div{
    position: absolute;
    display: block;
    height: 50%;
    width: 80%;
    left: 10%;
    top: 25%;
  }
  div h1{
    font-size: 35px;
    margin-top: 20px;
  }
  div a{
    display: inline-block;
    font-size: 25px;
    margin-top: 30px;
    cursor: pointer;
  }
  div a:hover{
    color: rgb(255, 60, 0);
  }
</style>
