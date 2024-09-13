<template>
    <div>
        <h2>当前形态：{{ currentForm }}<button @click="toggleForm">切换形态</button></h2>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentForm = ref<string>('齐天大圣')

const toggleForm = () =>{
    currentForm.value=currentForm.value === '齐天大圣' ? '斗战胜佛' :'齐天大圣'
}
</script>


<style scoped>
h2 {
    background-color: aqua;
    margin: 100px;
    text-align: center;
    padding: 100px;
}
</style>