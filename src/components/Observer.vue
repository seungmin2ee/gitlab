<template>
  <div ref="target"></div>
</template>

<script setup>
// import { onMounted, onUnmounted, ref } from 'vue';

// const target = ref(null)
// const observer = ref(null)

// onMounted(() => {
//   observer.value = new IntersectionObserver(([entry]) => {
//     if (entry && entry.istIntersecting) {
//       console.log('ralaldkarlarlarlarlal')
//       getTodoData()
//     }
//   },{threshold: 1.0, rootMargin: '0px'})

//   observer.value.observe(target.value)
// })
// onUnmounted(() => {
//   if(observer.value) observer.value.disconnect()
// })
</script>

<style scoped>
div {
  height: 100px;
}
</style>
