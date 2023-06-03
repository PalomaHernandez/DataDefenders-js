import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Account/Register.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/offers',
        name: 'offers',
        component: Home
    },
    {
        path: '/search',
        name: 'search',
        component: Home
    },
    {
        path: '/account',
        name: 'account',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active'
})

export default router
