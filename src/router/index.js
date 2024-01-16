import { createRouter, createWebHistory } from 'vue-router'
import Menu from "../views/Menu.vue";
import GamePage from "../views/GamePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Menu
    },
    {
      path: '/game',
      name: 'game',
      component : GamePage
    }
  ]
})

export default router
