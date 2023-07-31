<template>
  <div class="tag">
    #<span>{{ tag }}</span>
    <button @click="handleRemoveTag(id)">x</button>
  </div>
</template>

<script setup>
import { useTagStore } from '../store'

const props = defineProps({
  id: Number,
  tag: String,
})

const store = useTagStore()
const { removeTag } = store

const handleRemoveTag = (id) => {
  removeTag(id)
}
</script>

<style>
.tag {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid #2B45D9;
  border-radius: 20px;
  color: #2B45D9;
  background-color: #fff;
}
.tag span {
  color: #333;
  margin: 0 var(--space-md) 0 var(--space-xs);
}
.tag button {
  width: 20px;
  height: 20px;
  background: #2B45D9;
  border-radius: 50%;
  color: #fff;
  line-height: 1;
  cursor: pointer;
}
</style>
