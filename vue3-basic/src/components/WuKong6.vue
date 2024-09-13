<template>
  <div>
    <h1>装备管理系统</h1>

    <div class="container">
      <input
        v-model="newEquipment"
        placeholder="请输入装备名称"
      />

      <button @click="addEquipment">添加装备</button>
    </div>

    <ul>
      <li v-for="(item, index) in equipmentList" :key="index">
        {{ item }}
        <button class="delete-btn" @click="removeEquipment(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newEquipment = ref(''); 
const equipmentList = ref<string[]>([]); 

const addEquipment = () => {
  if (newEquipment.value) {
    equipmentList.value.push(newEquipment.value); 
    newEquipment.value = ''; 
  }
};

const removeEquipment = (index: number) => {
  equipmentList.value.splice(index, 1); 
};
</script>

<style scoped>
/* 样式 */
h1 {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  padding: 5px;
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}



ul {
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
  max-width: 300px;
  margin: 0 auto;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
