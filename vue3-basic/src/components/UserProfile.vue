<template>
    <div class="user-profile">
        <h3>用户信息</h3>
        <p>姓名：</p>
        <p>年龄：</p>
        <p>邮箱：</p>
    </div>
</template>

<script setup lang="ts">

//定义 props，接受父组件传递的参数
const prop = defineProps<{
    user: {
        name: string;
        age: number;
        email: string;
    }
}>()
</script>

<style scoped>
.user-profile {
    min-width: 300px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #ccc;
}
</style>