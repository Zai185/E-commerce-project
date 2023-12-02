<template>
    <div class="my-2">
        <h1 class="px-4 py-2 mb-2 text-2xl font-bold text-white bg-purple-800">{{ categorizedItem.category }}</h1>
        <div class="w-full overflow-x-auto">
            <div class="flex gap-1">
                <div v-for="item in categorizedItem.items" :key="item.id" class="flex-shrink-0 w-64 border border-black">
                    <CategorizedItemCard :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    categorizedItem: Object
})

import CategorizedItemCard from '@components/HomeCategorizedItemCard.vue';

</script>

<style lang="scss" scoped></style>