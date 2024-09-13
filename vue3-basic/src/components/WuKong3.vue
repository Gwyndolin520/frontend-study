<template>
    <div>
        <h2>孙悟空</h2>
        <h2>技能列表</h2>
        <ul>
        <li v-for="skill in skills" :key="skill.id">
        {{ skill.id }},{{ skill.name }}——
        <span v-if="skill.unlock" class="unlock">已解锁</span>
        <span v-else class="lock">未解锁</span>
        </li>
    </ul>
    </div>
</template>

<script setup lang="ts">
import{ref} from 'vue'
interface Skill {
    id:number
    name:string
    unlock:boolean
}

const skills = ref<Skill[]>([
    {id:1,name:'定身术',unlock:true},
    {id:2,name:'聚形散气',unlock:false},
    {id:3,name:'身外化身',unlock:true},
])
</script>

<style scoped>
/* 样式文件，可以保存为styles.css */

/* 根据需要调整以下样式 */
body {
    font-family: Arial, sans-serif; /* 设置字体 */
    margin: 20%; /* 移除边距 */
    padding: 150px; /* 移除内边距 */
}

/* 容器样式，确保内容居中 */
.container {
    width: 80%; /* 宽度设置为80% */
    margin: 0 auto; /* 水平居中 */
    padding: 20px; /* 添加一些内边距 */
}

/* 标题样式，使其居中 */
h2 {
    text-align: center; /* 文本居中 */
    margin-bottom: 20px; /* 标题下方添加一些间距 */
}

/* 列表样式 */
ul {
    list-style-type: none; /* 移除列表项前的点 */
    padding: 0; /* 移除内边距 */
    margin: 0; /* 移除外边距 */
}

/* 列表项样式 */
ul li {
    margin-bottom: 10px; /* 列表项之间的间距 */
    padding: 10px; /* 列表项的内边距 */
    background-color: #f9f9f9; /* 列表项的背景颜色 */
    border: 1px solid #ddd; /* 列表项的边框 */
    border-radius: 4px; /* 列表项的圆角 */
}

/* 已解锁和未解锁的文本样式 */
.unlock {
    color: #28a745; /* 已解锁颜色为绿色 */
    font-weight: bold; /* 加粗字体 */
}

.lock {
    color: #dc3545; /* 未解锁颜色为红色 */
    font-weight: bold; /* 加粗字体 */
}
</style>