<template>
    <div class="w-full pb-4 bg-white border border-black">
        <img :src="item.image_url" :alt="item.image_url" class="object-cover w-full border-gray-600 border-y">
        <h3 class="px-4 py-2 text-lg font-bold">
            {{ item.name }}
        </h3>
        <div class="px-4 py-2">
            <p class="text-xs font-medium">{{ useSubString(item.description, 40) }}</p>
            <p class="font-bold">
                <span :class="[item.discount ? 'line-through text-gray-500 text-sm inline' : '']"> ${{ item.price }}</span>
                <span class="font-bold" v-if="item.discount"> ${{ item.price * (100 - item.discount) / 100 }} </span>
            </p>
            <Button>Add to Cart</Button>
        </div>
    </div>
</template>

<script setup>
import Button from '@components/primary/Button.vue';
import { useSubString } from '@composables/useSubString.js';

defineProps({
    item: Object
})
</script>

<style lang="scss" scoped></style>