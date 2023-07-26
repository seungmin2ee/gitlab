import { createRouter, createWebHistory } from 'vue-router'
import Todo from '../components/Todo.vue'
import Link from '../components/Link.vue'
import Tags from '../components/Tags.vue'

const routes = [
  {
    path: '/',
    name: 'todo',
    component: Todo,
  },
  {
    path: '/link',
    name: 'Link',
    component: Link,
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})

export default router
