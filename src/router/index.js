import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Results from '../views/Results.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gf',
    name: 'Results',
    component: Results,
    props: route => ({
      location: route.query.l,
      categories: route.query.c,
      price: route.query.p,
      range: route.query.r
    })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
