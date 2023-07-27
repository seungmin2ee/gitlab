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

      tags.value = [payload, ...tags.value]
    } catch (error) {
      console.log(error)
    }
  }

  async function removeTag(id) {
    try {
      await axios.delete(`tag/delete/${id}`)

      tags.value = tags.value.filter((el) => el.tag_id !== id)
    } catch (error) {
      if (error.response.data.message === `ERROR: tag id ${id} has todo`) {
        alert('Todo와 연결된 태그는 삭제할 수 없습니다.')
      }
    }
  }

  return { tags, setTag, addTag, removeTag }
})

export const useListStore = defineStore('list', () => {
  const lists = ref([])

  function setList(data) {
    lists.value = [...lists.value, ...data]
  }

  async function addList(payload) {
    try {
      await axios.post('todo/save', payload)

      // lists.value = [payload, ...lists.value]
    } catch (error) {
      console.log(error)
    }
  }

  async function removeList(id) {
    try {
      await axios.delete(`todo/delete/${id}`)

      lists.value = lists.value.filter((el) => el.id !== id)
    } catch (error) {
      console.log(error)
    }
  }

  async function editDoneStatus(payload) {
    try {
      await axios.post('todo/save', payload)

      lists.value.forEach((el) => {
        if (el.id === payload.id) {
          el.done = !el.done
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return { lists, setList, addList, removeList, editDoneStatus }
})

export const useModalStore = defineStore('params', () => {
  const modalState = ref(false)

  function showModal() {
    modalState.value = !modalState.value
  }

  return { modalState, showModal }
})
