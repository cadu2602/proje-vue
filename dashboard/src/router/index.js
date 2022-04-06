import {  createRouter, createWebHistory } from 'vue-router'


const Credencials = import('../views/credencials/index.vue')
const Feedbacks = import('../views/Feedbacks/index.vue')
const Home = import('../views/Home/index.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Feedbacks',
    name: 'Feedbacks',
    component: Feedbacks,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/credencials',
    name: 'Credencials',
    component: Credencials,
    meta: { 
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home'}
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
