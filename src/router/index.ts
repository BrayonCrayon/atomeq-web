import { createRouter, createWebHistory } from 'vue-router'
import AtomeqTable from '@/views/AtomeqTable.vue'
import AtomeqFormulator from '@/views/AtomeqFormulator.vue'
import AtomeqHome from '@/views/AtomeqHome.vue'
import AtomeqAbout from '@/views/AtomeqAbout.vue'
import AtomeqRegister from '@/views/AtomeqRegister.vue'
import UserProfile from '@/views/UserProfile.vue'
import AtomeqLogin from '@/views/AtomeqLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AtomeqHome,
    },
    {
      path: '/about',
      name: 'about',
      component: AtomeqAbout,
    },
    {
      path: '/table',
      name: 'table',
      component: AtomeqTable
    },
    {
      path: '/formulator',
      name: 'formulator',
      component: AtomeqFormulator
    },
    {
      path: '/register',
      name: 'register',
      component: AtomeqRegister
    },
    {
      path: '/login',
      name: 'login',
      component: AtomeqLogin
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: UserProfile
    },
  ],
})

export default router
