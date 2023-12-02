<template>
    <div>
        <div class="grid grid-cols-4 gap-8 px-24 my-8 ">
            <div v-for="item in items" :key="item.id">
                <ItemCard :item="item" />
            </div>
        </div>
        <div v-for="categorizedItem in categorizedItems" :key="categorizedItem.id">
            <CategorizedRow :categorizedItem="categorizedItem" />
        </div>
    </div>
</template>

<script setup>
import categorizedItems from '@/data/categorizedItems.json'
import CategorizedRow from '@components/HomeCategorizedRow.vue';
import ItemCard from '@components/HomeItemCard.vue';
import { storeToRefs } from 'pinia'
import { useItemStore } from '@store/useItemStore'

const itemStore = useItemStore()
const { items } = storeToRefs(itemStore)
const { getAllItems } = itemStore

getAllItems()
</script>

<style lang="scss" scoped></style>