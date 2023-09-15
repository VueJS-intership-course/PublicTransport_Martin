import {createRouter, createWebHistory} from 'vue-router';
// import App from '../App.vue'
import JourneysComponent from '../components/pages/journey/JourneysComponent.vue'

const router =  createRouter({
    history: createWebHistory(),
    routes: [
        {
          name: 'Home',
          redirect: '/journey'
        },
        {
          name: 'journey',
          path: '/journey/:id?',
          component: JourneysComponent,
          props: true
        },
      ],
})

export default router;