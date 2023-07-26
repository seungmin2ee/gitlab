<template>
  <div>
    <input type="text" placeholder="태그 입력 후 엔터" v-model="inputValue" @keyup.enter="handleAddTag" >
    <div class="tags">
      <Tag v-for="tag in tags" :key="tag.id" :id="tag.tag_id" :tag="tag.desc"/>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useTagStore } from '../store'
import { storeToRefs } from 'pinia'
import Tag from './Tag.vue'

const inputValue = ref('')
const store = useTagStore()
const { setTag, addTag } = store
const { tags } = storeToRefs(store)

const getTagData = async () => {
  try{
    const { data } = await axios.post('tag/list')

    setTag(data.contents)
  } catch(error) {
    console.log(error)
  }
}
getTagData()

const handleAddTag = () => {
  if(!inputValue.value) return

  addTag({desc: inputValue.value})
  
  inputValue.value = ''
}
</script>

<style scoped>
input {
  width: 400px;
  padding: var(--space-md);
  border: 1px solid #aaa;
  outline: none;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 100%;
  margin-top: 30px;
  gap: var(--space-sm);
}
</style>
