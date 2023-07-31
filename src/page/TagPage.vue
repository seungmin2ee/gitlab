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
import Tag from '../components/Tag.vue'

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
  border: 1px solid #ccc;
  background-color: #fafafa;
  outline: none;
}

input:focus {
  box-shadow: 0px 0px 5px 3px rgba(43, 69, 217, 0.3);
  border-color: #A7B2F2;
  transition: .2s ease-in-out;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  height: 100%;
  margin-top: 30px;
  gap: var(--space-sm);
}
</style>
