import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Wishlist from '../views/Wishlist.vue'
import Detail from '../views/Detail.vue'
import Product from '../views/Product.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'products',
          component: Product
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: () => {
        if(localStorage.access_token){
          return false
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: () => {
          if(localStorage.access_token){
            return false
          }
        }
      
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist,
      beforeEnter: () => {
        if(!localStorage.access_token){
          return false
        }
      }
    },
    {
      path: '/products/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})

export default router
