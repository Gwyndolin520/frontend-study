<template>
  <div :class="['theme-toggle', { dark: isDark }]">
    <div 
      class="toggle-switch"
       :class="{ dark: isDark }" 
      @click="toggleTheme"
    >
      <div class="toggle-thumb"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 使用 ref 来控制是否处于暗黑模式
const isDark = ref(false);

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<style scoped>
/* 基础样式 */
.theme-toggle {
  display: flex;
  height: 100vh;
  background-color: #fff;
  transition: background-color 0.5s ease;
    justify-content: center;
  align-items: center;
}

/* 暗黑模式背景色 */
.theme-toggle.dark {
  background-color: #222;
}

/* 开关样式 */
.toggle-switch {
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-switch .toggle-thumb {
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: 2.5px;
  transition: left 0.3s ease;
}

/* 暗黑模式下的开关颜色和滑块位置 */
.toggle-switch.dark {
  background-color: #333;
}

.toggle-switch.dark .toggle-thumb {
  left: calc(100% - 27.5px);
}
</style>
