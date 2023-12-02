import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
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
        path: '/seller',
        redirect: '/seller/dashboard',
        name: 'seller',
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

export default router