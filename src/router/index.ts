import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dinner',
    },
    {
      path: '/dinner',
      name: 'dinner',
      component: () => import('../views/DinnerView.vue'),
    },
    {
      path: '/getaway',
      name: 'getaway',
      component: () => import('../views/GetawayView.vue'),
    },
  ],
})

export default router
