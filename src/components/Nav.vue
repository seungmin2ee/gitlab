<template>
  <nav class="column col-2">
    <router-link to="/">Todo</router-link>
    <router-link to="/link">Link</router-link>
    <router-link to="/Tags">Tags</router-link>
  </nav>
</template>

<script setup>

</script>

<style scoped>
nav {
  border-right: 1px solid #ddd;
}
nav > a {
  padding: var(--space-md);
  border-bottom: 1px solid #ddd;
  text-align: center;
}
.active {
  background-color: rgba(35, 176, 255, .7);
}
</style>
