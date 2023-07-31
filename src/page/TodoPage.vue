<template>
  <div>
    <div>
      <button class="archive-btn" @click="showModal">Archive</button>    
      <div class="todo">
        <div>
          <input type="text" placeholder="Todo 입력 후 엔터" v-model="inputValue" @keyup.enter="handleAddList" >
          <div class="tag-box">
            <div v-for="tag in selectTags" :key="tag.tag_id" class="tag"># {{ tag.desc }}</div>
          </div>
          <div ref="root" class="lists">
            <List v-for="list in lists" :key="list.id" :listDt="list.regDt" :list="list.desc" :id="list.id" :tagId="list.tag.id" :done="list.done" :btnState="true"/>
            <InfiniteLoading @infinite="loadTodoData" :target="root" />
          </div>
        </div>
        <div>
          <div>할일에 추가할 태그를 아래에서 선택해주세요. (1개 선택)</div>
          <div class="tags">
            <div class="tag" :class="{active: selectTags[0]?.tag_id === tag.tag_id}" v-for="tag in tags" :key="tag.tag_id" @click="handleSelectTag(tag)">
              <div># {{ tag.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="modalState"/>
  </div>
</template>

<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useListStore, useTagStore, useModalStore } from '../store'
import List from '../components/List.vue'
import Modal from '../components/Modal.vue'

const store = useListStore()
const tagStore = useTagStore()
const modalStore = useModalStore()
const { setList, addList } = store
const { setTag } = tagStore
const { showModal } = modalStore
const { lists } = storeToRefs(store)
const { tags } = storeToRefs(tagStore)
const { modalState } = storeToRefs(modalStore)

console.log(lists)

const root = ref(null)
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
    tag: selectTags.value[0]?.tag_id,
    done: false
  })

  inputValue.value = ''
  selectTags.value.pop()
  lists.value = []
  page = 1
}

const handleSelectTag = (tag) => {
  if (selectTags.value[0]?.tag_id === tag.tag_id) {
    selectTags.value.pop()
  } else {
    selectTags.value.pop()
    selectTags.value.push(tag)
  }
}
</script>

<style scoped>
.todo {
  flex: 1;
  display: flex;
  gap: var(--space-xl);
}

input {
  width: 500px;
  padding: var(--space-md);
  background-color: #fafafa;
  border: 1px solid #ccc;
  outline: none;
}

input:focus {
  box-shadow: 0px 0px 5px 3px rgba(43, 69, 217, 0.3);
  border-color: #A7B2F2;
  transition: .2s ease-in-out;
}

.tag-box {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}
.tag-box > div {
  background-color: #2B45D9;
  color: #fafafa;
}

.lists {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 600px;
  margin-top: 30px;
  padding: 10px;
  gap: var(--space-sm);
  overflow-y: auto;
}

.tags {
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.tag {
  cursor: pointer;
}

.tag.active {
  background-color: #2B45D9;
  color: #fafafa;
}

.archive-btn {
  margin-bottom: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background-color: #fafafa;
  border: 1px solid #2B45D9;
  border-radius: 10px;
  color: #2B45D9;
  cursor: pointer;
  transition: .2s ease-in-out;
}
.archive-btn:hover {
  box-shadow: 0 1px 10px rgba(0, 0, 0, .3);
  background-color: #4158D9;
  color: #fff;
  /* border-color: #fff; */
}

.target {
  width: 100%;
  height: 200px;
}
</style>
