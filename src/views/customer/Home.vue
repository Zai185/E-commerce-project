<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else class="grid grid-cols-4 gap-8 px-24 my-8 ">
            <div v-for="item in allItems" :key="item.id">
                <ItemCard :item="item" />
            </div>
        </div>
        <!-- <div v-for="categorizedItem in categorizedItems" :key="categorizedItem.id">
            <CategorizedRow :categorizedItem="categorizedItem" />
        </div> -->
    </div>
</template>

<script setup>
import CategorizedRow from '@components/HomeCategorizedRow.vue';
import ItemCard from '@components/HomeItemCard.vue';
import { storeToRefs } from 'pinia'
import { useItemStore } from '@store/useItemStore'

const itemStore = useItemStore()
const { allItems, loading } = storeToRefs(itemStore)
const { getAllItems } = itemStore

getAllItems()
</script>

<style lang="scss" scoped></style>