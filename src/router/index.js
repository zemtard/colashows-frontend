import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recent from '../views/Recent.vue'
import Watch from '../views/Watch.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shows',
    name: 'Shows',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Shows.vue')
  },
  {
    path: '/recent',
    name: 'Recent',
    component: Recent
  },
  
  {
    path: '/watch/:id',
    name: 'Watch',
    component: Watch,
  },

  {
    path: '/watch/:id/:ep',
    name: 'Watch',
    component: Watch,
  },
  
]

const router = new VueRouter({
  routes,
  mode:'history',
})

export default router
