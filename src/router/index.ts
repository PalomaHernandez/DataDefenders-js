import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Account from '@/views/Account/Show.vue'
import EditAccount from '@/views/Account/Edit.vue'
import Register from '@/views/Account/Register.vue'
import Application from '@/views/Applications/Show.vue'
import Applications from '@/views/Applications/Index.vue'
import Comments from '@/views/Applications/Comments/Index.vue'
import DocumentationFile from '@/views/Applications/DocumentationFiles/Show.vue'
import UploadDocumentation from '@/views/Applications/DocumentationFiles/Upload.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/applications',
        name: 'applications',
        component: Applications
    },
    {
        path: '/applications/:id',
        name: 'applications.show',
        component: Application,
        props: true
    },
    {
        path: '/applications/files/:id',
        name: 'applications.files.show',
        component: DocumentationFile,
        props: true
    },
    {
        path: '/applications/:id/files/upload',
        name: 'applications.files.upload',
        component: UploadDocumentation,
        props: true
    },
    {
        path: '/applications/:id/comments',
        name: 'applications.comments',
        component: Comments,
        props: true
    },
    {
        path: '/search',
        name: 'search',
        component: Home
    },
    {
        path: '/account',
        name: 'account',
        component: Account
    },
    {
        path: '/account/edit',
        name: 'account.edit',
        component: EditAccount
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
