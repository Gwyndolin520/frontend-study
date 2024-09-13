<template>
    <div>
<!-- 绑定 isDisabled 属性 -->
 <!-- <button v-bind="isDisabled">点击</button> -->
 <button :disabled="isDisabled">点击</button>
    <img :src="url"/>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const isDisabled = ref<boolean>(false)
const url = ref<string>()
</script>

<style scoped>

</style>