import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@store/useAuthStore'
import { storeToRefs } from 'pinia'

const routes = [
    {
        path: '/',
        redirect: '/home',
        meta: { isCustomer: true },
        component: () => import('@layouts/customer/GeneralLayout.vue'),
        children: [
            {
                path: 'home', component: () => import('@views/customer/Home.vue'), name: "home"
            },
            {
                path: 'cart', component: () => import('@views/customer/Cart.vue'), name: 'cart'
            }
        ]
    },
    {
        path: '/auth',
        redirect: '/signup',
        meta: { isGuest: true },
        component: () => import('@layouts/AuthLayout.vue'),
        children: [
            { path: '/signup', component: () => import('@views/auth/Signup.vue'), name: 'signup' }
        ]
    },

    {
        path: '/seller',
        redirect: '/seller/dashboard',
        name: 'seller',
        meta: { isSeller: true, isCustomer: true },
        component: () => import('@layouts/seller/Layout.vue'),
        children: [
            {
                path: 'dashboard',
                component: () => import('@views/seller/Dashboard.vue'),
                name: 'seller.dashboard'
            },
            {
                path: 'items',
                redirect: '/seller/items/create',
                component: () => import('@layouts/seller/ItemLayout.vue'),
                children: [
                    { path: 'create', component: () => import('@views/seller/items/index.vue'), name: 'seller.item.create' },
                    { path: ':id', component: () => import('@views/seller/items/index.vue'), name: 'seller.item.edit' },
                ]

            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@views/NotFound.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

/**
 * @user {data, token}
*/

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)

    if (to.meta.isCustomer && !user.value.token) {
        next({ name: 'signup' })
    } else[
        next()
    ]
})

export default router