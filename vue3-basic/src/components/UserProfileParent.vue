<template>
    <div>
        <!-- 传递user 对象给子组件 -->
        <UserProfile :user="user" />
    </div>
</template>

<script setup lang="ts">
import UserProfile from './UserProfile.vue';
import{ref} from "vue"

const user = ref({
    name:'张三',
    age:20,
    email:"zhangsan@qq.com",
})

</script>

<style scoped>

</style>