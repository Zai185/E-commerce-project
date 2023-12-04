<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div>
                <Button>
                    <RouterLink :to="{ name: 'seller.item.create' }">Create Item</RouterLink>
                </Button>
            </div>
            <div class="grid grid-cols-4 gap-4 mx-4">
                <div v-for="item in allItems" :key="item.id">
                    <ItemCard @change="refreshItems" :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import Button from '@components/primary/Button.vue';
import { storeToRefs } from 'pinia'
import { useItemStore } from '@store/useItemStore'
import ItemCard from '@components/seller/ItemCard.vue';

const itemStore = useItemStore()
const { loading, allItems } = storeToRefs(itemStore)
const { getAllItems } = itemStore

function refreshItems() {
    getAllItems()
}

refreshItems()
</script>

<style lang="scss" scoped></style>