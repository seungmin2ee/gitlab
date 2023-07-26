import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useTagStore = defineStore('tag', () => {
  const tags = ref([])

  function setTag(data) {
    tags.value = [...data]
  }

  async function addTag(payload) {
    try {
      await axios.post('tag/save', payload)

      tags.value = [...tags.value, payload]
    } catch (error) {
      console.log(error)
    }
  }

  async function removeTag(id) {
    try {
      await axios.delete(`tag/delete/${id}`)

      tags.value = tags.value.filter((el) => el.tag_id !== id)
    } catch (error) {
      alert('Todo와 연결된 태그는 삭제할 수 없습니다.')
      console.log(error)
    }
  }

  return { tags, setTag, addTag, removeTag }
})

export const useListStore = defineStore('list', () => {
  const lists = ref([])

  function setList(data) {
    lists.value = [...data]
  }

  async function addList(payload) {
    try {
      await axios.post('todo/save', payload)

      lists.value = [...lists.value, payload]
    } catch (error) {
      console.log(error)
    }
  }

  async function removeList(id) {
    try {
      await axios.delete(`todo/delete/${id}`)

      lists.value = lists.value.filter((el) => el.todo_id !== id)
    } catch (error) {
      console.log(error)
    }
  }

  return { lists, setList, addList, removeList }
})

export const useModalStore = defineStore('params', () => {
  const modalState = ref(false)

  function showModal() {
    modalState.value = !modalState.value
  }

  return { modalState, showModal }
})
