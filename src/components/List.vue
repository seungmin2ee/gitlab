<template>
  <div class="list" :class="done && 'done'">
    <button class="done-btn" @click="handleClickDone(id)"></button>
    <div class="col column gap-xs">
      <div class="list-title">{{ list }}</div>
      <div class="col row">
        <div class="list-tag" v-if="tagId"># {{ tags.filter(el => el.tag_id === tagId)[0]?.desc }}</div>
      </div>
    </div>
    <button class="remove-btn" v-if="btnState" @click="handleRemoveList(id)">x</button>
  </div>
  <div>
    <div class="row">
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useListStore, useTagStore } from '../store'

const props = defineProps({
  list: String,
  id: Number,
  tagId: Number,
  done: Boolean,
  btnState: Boolean,
})

const store = useListStore()
const { addList, removeList } = store
const { lists } = storeToRefs(store)
const tagStore = useTagStore()
const { tags } = storeToRefs(tagStore)

const handleClickDone = (id) => {
  lists.value.forEach(el => {
    if (el.todo_id === id) {
      el.done = !el.done
    }
  })
  // const doneList = lists.value.filter(el => el.todo_id === id)[0]

  // doneList.done = true

  // console.log(doneList)

  // addList(doneList)
}

const handleRemoveList = (id) => {
  removeList(id)
}
</script>

<style scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  gap: var(--space-sm);
  border-bottom: 1px solid #eee;
}

.list .done-btn {
  width: 16px;
  height: 16px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
}

.list.done .done-btn {
  background-color: #3f75e1;
}

.list .list-title {
  position: relative;
  padding-left: var(--space-sm);
  color: #525252;
}

.list.done .list-title {
  color: #a2a2a2;
  text-decoration: line-through;
}

.list .remove-btn {
  width: 20px;
  height: 20px;
  background: #23B0FF;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
}

.list-tag {
  padding: 0 var(--space-sm);
  color: #23B0FF;
  font-size: 14px;
}
</style>
