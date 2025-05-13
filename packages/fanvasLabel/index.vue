<template>
  <!-- <button @click="switchTool('rect')">rect</button>
  <button @click="switchTool('select')">selection</button>
  <button @click="switchTool('circle')">circle</button>
  <button @click="switchTool('text')">text</button>
  <button @click="switchTool('image')">image</button>
  <button @click="switchTool('brush')">brush</button> -->
  <!-- <img src="@/fanvasLabel/logo.png" alt="" @click="addImage"> -->
  <div class="canvas-box" ref="canvasBox">
    <canvas class="canvas" ref="theCanvas" id="theCanvas"></canvas>
  </div>
</template>
<script lang="ts">
export default {
  name: 'canvasLabel'
}
</script>
<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import fanvas from '../fanvas/core/fanvas'
import type Fanvas from '../fanvas/core/fanvas';

let fanvasManager: Ref<Fanvas | null> = ref(null)
const theCanvas = ref('theCanvas')
const canvasBox = ref<HTMLElement>()

onMounted(() => {
  const {clientWidth, clientHeight} = (canvasBox.value as HTMLElement)
  fanvasManager.value = new fanvas('theCanvas', {
    canvasConfig: {
      width: clientWidth,
      height: clientHeight
    }
  })
  switchTool('select')
})
const switchTool = (toolName) => {
  fanvasManager.value?.useTool(toolName)
}
const addImg = (img) => {
  fanvasManager.value?.addImage(img)
}
const deleteSelected = () => {
  fanvasManager.value?.deleteSelected()
}
defineExpose({
  fanvasManager,
  switchTool,
  addImg,
  deleteSelected,
})
</script>
<style scoped>
.canvas-box {
  height: 100%;
}
</style>