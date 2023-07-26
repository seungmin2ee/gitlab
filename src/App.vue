<template>
  <div class="container">
    <Nav />
    <section class="col">
      <router-view />
    </section>
  </div>
  <Modal v-if="modalState"/>
</template>

<script setup>
import axios from 'axios'
import Nav from './components/Nav.vue'
import Modal from './components/Modal.vue'
import { useModalStore } from './store'
import { storeToRefs } from 'pinia'

const store = useModalStore()
const { modalState } = storeToRefs(store)
</script>

<style>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
}

section {
  padding: var(--space-lg);
}
</style>
