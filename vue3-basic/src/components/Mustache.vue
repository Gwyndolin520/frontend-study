<template>
    <div>
        <h2>
        当前用户:{{ userName }}
        </h2>
        <p>2+3的结果是{{ 2+3 }}</p>
        <p>全名:{{ firstName+LastName }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const userName = ref<string>('张三')
console.log(userName.value)
const firstName = ref<string>('张')
    const LastName = ref<string>('三')
</script>
