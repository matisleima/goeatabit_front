import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import OfferView from "@/views/OfferView.vue";
import ReserveView from "@/views/ReserveView.vue";
import ReservationsView from "@/views/ReservationsView.vue";
import UserOffersView from "@/components/modal/UserOffersView.vue";

const routes = [
    {
        path: '/home',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/reserve',
        name: 'reserveRoute',
        component: ReserveView
    },
    {
        path: '/offer',
        name: 'offerRoute',
        component: OfferView
    },
    {
        path: '/reservations',
        name: 'reservationsView',
        component: ReservationsView
    },
    {
        path: '/user_offers',
        name: 'userOffersView',
        component: UserOffersView
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
