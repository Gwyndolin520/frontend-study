<template>
    <div>
        <h2>
        {{ name }}
        </h2>
        <h2>{{ currentForm }}</h2>
        <h2>{{ describution }}</h2>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref<string>('孙悟空')
const describution = ref<string>('孙悟空（又称美猴王、齐天大圣、孙行者、斗战胜佛），是中国古典神魔小说《西游记》中的人物。由开天辟地产生的仙石孕育而生，出生地位于东胜神洲的花果山上，因带领猴群进入水帘洞而被尊为“美猴王”。你这猴儿，真是令我欢喜')
const currentForm=ref<string>('齐天大圣')



</script>
<style scoped>
h2 {
    background-color: aqua;
    margin: auto;
    text-align: center;
}
</style>