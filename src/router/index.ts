import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../components/layout/index.vue'),
      children:[
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/product/product/index.vue')
        },
        {
          path: 'productCategory',
          name: 'category',
          component: () => import('../views/product/category/index.vue')
        }

      ]

    }
  ]
})

export default router
