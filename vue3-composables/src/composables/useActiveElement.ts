import { useActiveElement } from '@vueuse/core'
import { watch } from 'vue'

const activeElement = useActiveElement()
watch(activeElement, (el) => {
  console.log('focus changed to', el)
})