import {createRouter, createWebHistory} from 'vue-router';
import App from '../App.vue'

const router =  createRouter({
    history: createWebHistory(),
    routes: [
        {
          name: 'Home',
          path: '/',
          component: App,
        },
        {
          name: 'Journey',
          path: '/public-transport/journey/:id',
          component: App
        },
      ],
})

export default router;