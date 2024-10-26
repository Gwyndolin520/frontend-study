
<template>
  <nav>
    <!-- <Counter/> -->
    <!-- <Todo/> -->
     <router-link to="/counter">计数器</router-link>
  
     <router-link to="/todo">待办清单</router-link>
     <router-link to="/book">记账应用</router-link>
     <router-link to="/login">个人中心</router-link>
  </nav>
  <router-view/>
</template>

<script setup lang="ts">
</script>

<style scoped>
 a{
  margin: 20px;
  text-decoration: none;
  color: #3baee0;

  padding: 5px 10px;

}
/* 自定义路由激活样式 */
.router-link-active{
  font-weight: bold;
    color: white;
  background-color: #3baee0;
}

</style>


