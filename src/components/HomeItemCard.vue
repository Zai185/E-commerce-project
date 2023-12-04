<template>
    <div class="w-full bg-white border border-black">
        <h3 class="px-4 py-2 text-lg font-bold whitespace-nowrap">
            {{ item.name }}
        </h3>
        <img :src="item.image_url" :alt="item.image_url" class="object-cover w-full h-48 border-gray-600 border-y">
        <div class="flex flex-col justify-between px-4 py-2 h-28">
            <p class="text-xs font-medium">{{ useSubString(item.description, 58) }}</p>
            <div>
                <p class="font-bold">
                    <span :class="[item.discount ? 'line-through text-gray-500 text-sm inline' : '']"> ${{ item.price
                    }}</span>
                    <span class="font-bold" v-if="item.discount"> ${{ item.price * (100 - item.discount) / 100 }} </span>
                </p>
                <Button v-if="!checkIncluded(item.id)" class="w-full" @click="addToCart(item)">Add to Cart</Button>
                <div v-else class="flex items-center justify-center gap-2">
                    <Button @click="editAmount('+', item.id)">+</Button>
                    <span>{{ getCartItem(item.id).amount }}</span>
                    <Button @click="editAmount('-', item.id)">-</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '@components/primary/Button.vue';
import { storeToRefs } from 'pinia'
import { useSubString } from '@composables/useSubString';
import { useCartStore } from '@store/useCartStore';

defineProps({
    item: Object
})

const cartStore = useCartStore()
const { addCartItem, checkIncluded, editAmount, getCartItem } = cartStore

function addToCart(item) {
    addCartItem(item.id)
}
</script>

<style lang="scss" scoped></style>