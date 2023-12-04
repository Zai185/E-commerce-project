<template>
    <div class="w-full bg-white border border-black">
        <h3 class="px-4 py-2 text-lg font-bold">
            {{ item.name }}
        </h3>
        <img :src="item.image" :alt="item.image_url" class="object-cover w-full h-48 border-gray-600 border-y">
        <div class="flex flex-col justify-between px-4 py-2 h-28">
            <div>
                <p class="text-xs font-medium">{{ useSubString(item.description, 58) }}</p>
                <p class="font-bold">
                    <span :class="[item.discount ? 'line-through text-gray-500 text-sm inline' : '']"> ${{ item.price
                    }}</span>
                    <span class="font-bold" v-if="item.discount"> ${{ item.price * (100 - item.discount) / 100 }} </span>
                </p>
            </div>
            <div class="flex gap-2">
                <Button class="flex-1" @click="$router.push({ name: 'seller.item.edit', params: { id: item.id } })">Edit
                    Item
                </Button>
                <Button class="bg-red-800 hover:bg-red-950" @click="deleteItem(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '@components/primary/Button.vue';
import { useSubString } from '@composables/useSubString.js';
import { useItemStore } from '@store/useItemStore'
defineProps({
    item: Object
})

const emits = defineEmits(['change'])

const itemStore = useItemStore()
async function deleteItem(id) {
    if (confirm("Are you sure you want to delete")) {
        const response = await itemStore.deleteItem(id)
        emits('change')
    }


}

</script>

<style lang="scss" scoped></style>