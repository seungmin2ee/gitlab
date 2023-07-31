<template>
  <div class="list" :class="done && 'done'">
    <button class="done-btn" @click="handleClickDone(id)"></button>
    <div class="col column gap-xs">
      <div class="list-title">{{ list }}</div>
      <div class="col row items-center gap-sm">
        <div class="list-tag" v-if="tagId"># {{ tags.filter(el => el.tag_id === tagId)[0]?.desc }}</div>
        <div class="list-dt">{{ regDt }}</div>
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
import * as dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useListStore, useTagStore } from '../store'

const props = defineProps({
  list: String,
  id: Number,
  tagId: Number,
  done: Boolean,
  listDt: String,
  btnState: Boolean,
})

const store = useListStore()
const { removeList, editDoneStatus } = store
const { lists } = storeToRefs(store)
const tagStore = useTagStore()
const { tags } = storeToRefs(tagStore)

const regDt = computed(() => {
  const date1 = dayjs(props.listDt)
  const date2 = dayjs(new Date())
  
  const year = Math.abs(date1.diff(date2, 'year'))
  const month = Math.abs(date1.diff(date2, 'month'))
  const week = Math.abs(date1.diff(date2, 'week'))
  const day =  Math.abs(date1.diff(date2, 'day'))
  const hour =  Math.abs(date1.diff(date2, 'hour'))
  const minute =  Math.abs(date1.diff(date2, 'minute'))
  const second =  Math.abs(date1.diff(date2, 'second'))
  
  if(year) return `${year}년 전`
  if(month) return `${month + 1}개월 전`
  if(week) return `${week}주 전`
  if(day) return `${day}일 전`
  if(hour) return `${hour}시간 전`
  if(minute) return `${minute}분 전`
  if(second) return `${second}초 전`
})

const handleClickDone = (id) => {
  const doneList = lists.value.filter(el => el.id === id)[0]

  const payload = {
    id,
    desc: doneList.desc,
    done: !doneList.done,
    tag: doneList.tag.id
  }
  
  editDoneStatus(payload)
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
  padding: var(--space-md) var(--space-sm);
  gap: var(--space-sm);
  border-bottom: 1px solid #ddd;
}

.list .done-btn {
  width: 20px;
  height: 20px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
}

.list.done .done-btn {
  box-shadow:  0px 0px 10px rgba(157, 157, 157, .5);
  background-color: #2B45D9;
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
  width: 18px;
  height: 18px;
  background: #4158D9;
  border-radius: 50%;
  color: #fafafa;
  line-height: 1;
  cursor: pointer;
}

.list-tag {
  padding: 0 var(--space-sm);
  color: #2B45D9;
  font-size: 14px;
}
.list-dt {
  color: #333;
  font-size: 14px;
}
</style>
