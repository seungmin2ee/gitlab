<template>
  <div>
    <div class="container">
      <Nav />
      <section class="col">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup>
import Nav from '../components/Nav.vue'
</script>

<style>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
}

section {
  padding: var(--space-lg);
}
</style>