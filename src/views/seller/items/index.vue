<template>
    <div>
        <div v-if="loading">Loading...</div>
        <form v-else class="w-1/2 min-w-[512px] mx-auto bg-white shadow-lg shadow-gray-800 rounded-lg p-8 mt-8">
            <div class="w-full">
                <ImageContainer @updateImage="updateImage" />
                <div class="flex flex-wrap mt-4">
                    <div class="w-1/2 pr-8 mb-4">
                        <label for="item_name" class="px-2 py-1 text-sm font-medium">Name</label>
                        <input type="text" placeholder="Name" v-model="item.name"
                            class="w-full border-purple-800 rounded-lg focus:border-purple-800 focus:ring-purple-600 ring-offset-2">
                    </div>
                    <div class="w-1/2 pr-8 mb-4">
                        <label for="item_name" class="px-2 py-1 text-sm font-medium">Price</label>
                        <input type="number" placeholder="Price" v-model="item.price"
                            class="w-full border-purple-800 rounded-lg focus:border-purple-800 focus:ring-purple-600 ring-offset-2">

                    </div>
                    <div class="w-full h-32 pr-8 mb-4">
                        <textarea placeholder="Enter Your Item's Description" v-model="item.description"
                            class="w-full h-full border border-purple-800 rounded-lg resize-none focus:border-purple-800 focus:ring-purple-800"></textarea>
                    </div>
                    <div class="flex gap-4">
                        <select v-model="item.hasDiscount"
                            class="border-purple-800 rounded-lg focus:border-purple-800 focus:ring-purple-800">
                            <option :value="false" selected>No</option>
                            <option :value="true">Yes</option>
                        </select>
                        <div v-if="item.hasDiscount" class="flex gap-2">
                            <input type="number" placeholder="Discount " v-model="item.discount"
                                class="w-full border-purple-800 rounded-lg focus:border-purple-800 ring-purple-600 focus:ring-purple-600 ring-offset-2">
                            <select class="border-purple-800 rounded-lg focus:border-purple-800 focus:ring-purple-800">
                                <option value="%">%</option>
                                <option value="mmk">mmk</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-4 mt-4">
                    <Button type="button" @click="saveItem">Save</Button>
                    <Button type="button">Cancel</Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ImageContainer from '@components/ItemImageContainer.vue'
import Button from '@components/primary/Button.vue'
import { useItemStore } from '@store/useItemStore'

//^ if this file exists, there is a new file
const image_url = ref(null) // this is image url for show

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()
const { loading } = storeToRefs(itemStore)
const { createItem, getItem, editItem } = itemStore

const item = ref({
    name: '',
    price: '',
    description: '',
    hasDiscount: false,
    image: null,
    discount: null,
})

function updateImage(imageData) {
    image_url.value = imageData
}

async function saveItem() {
    if (!item.value.hasDiscount) {
        delete item.value.discount
        delete item.value.discountCurrency
    }

    if (image_url.value) {
        item.value.image = image_url.value
    } else {
        delete item.value.image

    }


    if (!route.params.id) {
        await createItem(item.value)
    } else {
        await editItem(route.params.id, item.value)
    }
    // router.push({ name: 'seller.item.edit', params: { id: item_id } })
    router.push({ name: 'seller' })
}

onMounted(async () => {
    if (route.params.id) {
        await getItem(route.params.id)
            .then(data => {
                console.log(data)
                item.value = data
            })
            .catch((error) => {
                router.push({ name: 'NotFound' })
            })

    }
})

</script>