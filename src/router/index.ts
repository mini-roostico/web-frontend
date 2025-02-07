import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

/**
 * Main router for the Subjekt website.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home',
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      alias: '/register',
      component: () => import('@/views/LoginRegister.vue'),
    },
    {
      path: '/sources',
      name: 'sources',
      component: () => import('@/views/SourcesView.vue'),
    },
    {
      path: '/suite/:suiteId',
      name: 'suite',
      component: () => import('@/views/SuiteView.vue'),
    },
  ],
})

export default router
