<template>
    <div>
    <h2>{{ healthy }}/{{ maxhealthy }} ({{ hpPercentage }}%)</h2>
    <div class="progress" :style="progressBarStyle"></div>

  </div>
</template>

<script setup lang="ts">
import{ref,computed} from 'vue'
const healthy=ref<number>(80)
const maxhealthy=ref<number>(100)
const hpPercentage= computed(()=>{
    return healthy.value/maxhealthy.value*100
})
const progressBarStyle = computed(() => {
  let bgColor = 'green'

  if (hpPercentage.value <= 50) {
    bgColor = 'orange'
  }
  if (hpPercentage.value <= 20) {
    bgColor = 'red'
  }

  return {
    width: hpPercentage.value + '%',
    backgroundColor: bgColor,
  }
})
</script>

<style scoped>
h2{
    text-align: center;
}
.progress {
  border-radius: 15px;
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
  height: 25px;
}
</style>