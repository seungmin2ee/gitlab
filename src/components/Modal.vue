<template>
  <div class="dim" @click="handleCloseModal">
    <div class="modal">
      <div>Archive</div>
      <div>
        <div class="lists">
          <List v-for="list in archiveList" :key="list.todo_id" :list="list.desc" :id="list.todo_id" :tagId="parseInt(list.tag_id)" :btnState="false"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useModalStore } from '../store'
import List from './List.vue'

const archiveList = ref()
const modalStore = useModalStore()
const { showModal } = modalStore

const getArchiveData = async () => {
  try{
    const { data } = await axios.post('todo/archive')

    archiveList.value = data.contents
    console.log(archiveList.value)
  } catch(error) {
    console.log(error)
  }
}

getArchiveData()

const handleCloseModal = () => {
  showModal()
}
</script>

<style scoped>
.dim {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
}
.modal {
  width: 600px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, .3);
  color: #333;
  overflow: hidden;
}
.modal > div:first-child {
  border-bottom: 1px solid #ddd;
  padding: var(--space-md);
  font-weight: bold;
  font-size: 20px;
}

.modal > div:last-child {
  height: 500px;
  padding: var(--space-md);
  overflow-y: auto;
}
</style>
