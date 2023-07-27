<template>
  <button class="archive-btn" @click="showModal">Archive</button>    
  <div class="todo">
    <div>
      <input type="text" placeholder="Todo 입력 후 엔터" v-model="inputValue" @keyup.enter="handleAddList" >
      <div class="tag-box">
        <div v-for="tag in selectTags" :key="tag.tag_id" class="tag"># {{ tag.desc }}</div>
      </div>
      <div ref="root" class="lists">
        <List v-for="list in lists" :key="list.id" :list="list.desc" :id="parseInt(list.id)" :tagId="parseInt(list.tag.id)" :done="list.done" :btnState="true"/>
        <InfiniteLoading @infinite="loadTodoData" :target="root" />
      </div>
    </div>
    <div>
      <div>할일에 추가할 태그를 아래에서 선택해주세요.</div>
      <div class="tags">
        <div class="tag" v-for="tag in tags" :key="tag.tag_id" @click="handleSelectTag(tag)">
          <div># {{ tag.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'
import { useListStore, useTagStore, useModalStore } from '../store'
import List from './List.vue'
import Observer from './Observer.vue'

const store = useListStore()
const tagStore = useTagStore()
const modalStore = useModalStore()
const { setList, addList } = store
const { setTag } = tagStore
const { showModal } = modalStore
const { lists } = storeToRefs(store)
const { tags } = storeToRefs(tagStore)

console.log(lists)

const root = ref(null)
const target = ref(null)
const observer = ref(null)
const inputValue = ref('')
const selectTags = ref([])

let page = 1
const loadTodoData = async ($state) => {
  try{
    const { data } = await axios.post('todo/list', {limit: 10, page: page})

    setList(data.contents)
    
    if(data.total < 10) {
      $state.complete()
    } else {
      $state.loaded()
    }
    
    page++
  } catch(error) {
    $state.error()
  }
}

// const getTodoData = async () => {
//   try{
//     const { data } = await axios.post('todo/list', {limit: 10, page})

//     setList(data.contents)

//     page++
//   } catch(error) {
//     console.log(error)
//   }
// }

const getTagData = async () => {
  try{
    const { data } = await axios.post('tag/list')

    setTag(data.contents)
  } catch(error) {
    console.log(error)
  }
}

getTagData()

const handleAddList = async () => {
  if(!inputValue.value) return

  await addList({
    desc: inputValue.value,
    tag: parseInt(selectTags.value[0]?.tag_id),
    done: false
  })

  // await getTodoData()
  
  inputValue.value = ''
  selectTags.value = []
}

const handleSelectTag = (tag) => {
  if (selectTags.value.length === 1 ) {
    alert('태그는 1개만 선택할 수 있습니다.')
    return
  }

  selectTags.value.push(tag)
}
</script>

<style scoped>
.todo {
  flex: 1;
  display: flex;
  gap: var(--space-xl);
}

input {
  width: 400px;
  padding: var(--space-md);
  border: 1px solid #aaa;
  outline: none;
}

.tag-box {
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.lists {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  margin-top: 30px;
  gap: var(--space-sm);
  overflow-y: auto;
}

.tags {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.tag {
  cursor: pointer;
}

.archive-btn {
  margin-bottom: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background-color: #fff;
  border: 1px solid #525252;
  border-radius: 10px;
  color: #525252;
  box-shadow: 0 1px 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  transition: .1s ease-in-out;
}
.archive-btn:hover {
  background-color: rgba(82, 82, 82, .3);
  color: #fff;
  border-color: #fff;
}

.target {
  width: 100%;
  height: 200px;
}
</style>
