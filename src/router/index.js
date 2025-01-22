import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SourcesView from "@/views/SourcesView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: "/home"
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      alias: '/register',
      component: () => import('../views/LoginRegister.vue')
    },
    {
      path: '/sources',
      name: 'sources',
      component: () => SourcesView
    },
    {
      path: '/suite',
      name: 'suite',
      component: () => import('../views/SuiteView.vue')
    }
  ],
})

export default router
