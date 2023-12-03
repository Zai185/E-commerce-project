<template>
    <div class="flex items-center justify-between w-full px-4 py-4 text-white bg-purple-800 md:px-16">
        <p>Logo</p>
        <ul class="hidden gap-8 md:flex ">
            <li>
                <RouterLink :to="{ name: 'seller' }">Seller</RouterLink>
            </li>
            <li><a href="">Lorem</a></li>
            <li><a href="">Lorem</a></li>
            <li><a href="">Lorem</a></li>
            <li><a href="">Lorem</a></li>
        </ul>
        <div class="hidden gap-4 md:flex">
            <Button>
                <RouterLink :to="{ name: 'signup' }">Login</RouterLink>
            </Button>
            <Button>Sign Up</Button>
            <Button @click="$router.push({ name: 'cart' })" class="relative">
                <p
                    class="absolute w-6 h-6 translate-x-1/2 -translate-y-1/2 rounded-full top-1 right-1 bg-purple-950 z-index">
                    {{ cartItems.length }}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </Button>
        </div>
    </div>
</template>

<script setup>
import Button from '@components/primary/Button.vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@store/useCartStore';

const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
</script>

<style lang="scss" scoped></style>