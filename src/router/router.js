import {createRouter, createWebHistory} from 'vue-router';
import App from '../App.vue'

const router =  createRouter({
    history: createWebHistory(),
    routes: [
        {
          name: 'Home',
          path: '/',
          // component: App,
          redirect: '/journey'
        },
        {
          name: 'journey',
          path: '/journey/:id?',
          component: App
        },
      ],
})

export default router;