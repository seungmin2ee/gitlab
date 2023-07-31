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
  border-right: 1px solid #eee;
  box-shadow: -5px 0 20px 0px rgba(0, 0, 0, .1);
}
nav > a {
  padding: var(--space-md);
  border-bottom: 1px solid #ddd;
  text-align: center;
}
.active {
  background-color: #2B45D9;
  color: #fafafa;
  font-weight: bold;
}
</style>
