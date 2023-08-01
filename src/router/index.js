import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import { Todo, Link, Tag } from '../page'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Todo,
      },
      {
        path: 'link',
        component: Link,
      },
      {
        path: 'tag',
        component: Tag,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
})

export default router
