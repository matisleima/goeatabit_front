import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import LandingView from "@/views/LandingView.vue";

const routes = [
  {
    path: '/landing',
    name: 'landingRoute',
    component: LandingView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
