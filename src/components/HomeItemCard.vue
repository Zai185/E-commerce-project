<template>
    <div class="w-full bg-white border border-black">
        <h3 class="px-4 py-2 text-lg font-bold whitespace-nowrap">
            {{ item.name }}
        </h3>
        <img :src="item.image" :alt="item.image_url" class="object-cover w-full h-48 border-gray-600 border-y">
        <div class="flex flex-col justify-between px-4 py-2 h-28">
            <p class="text-xs font-medium">{{ useSubString(item.description, 58) }}</p>
            <div>
                <p class="font-bold">
                    <span :class="[item.discount ? 'line-through text-gray-500 text-sm inline text-xs' : '']"> ${{
                        item.price
                    }}</span>
                    <span class="font-bold" v-if="item.discount"> ${{ item.discount <= 80 ? (item.price * (100 -
                        item.discount)) / 100 : item.price - item.discount }} </span>
                </p>
                <div v-if="currentLoading">Loading...</div>
                <Button v-else-if="!isIncluded" class="w-full" @click="addToCart(item)">Add to Cart</Button>
                <div v-else class="flex items-center justify-center gap-2">
                    <select v-model="currentAmount" @change="changeAmount()" class="py-0 bg-blue-100">
                        <option value="0" @click="deleteCartItem(item.id)">0 (delete)</option>
                        <option v-for="i in 9" :value="i">{{ i }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@components/primary/Button.vue';
import { storeToRefs } from 'pinia'
import { useSubString } from '@composables/useSubString';
import { useCartStore } from '@store/useCartStore';
import { useAuthStore } from '@store/useAuthStore';

const { item } = defineProps({
    item: Object
})

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
const { user } = storeToRefs(authStore)
const { deleteCartItem, addCartItem, editAmount, getCartItems } = cartStore

const currentAmount = ref(0)
const currentLoading = ref(true)
const currentCartItem = ref(null)

const isIncluded = computed(() => { //^ check if included, return ture if exists
    const cItemIds = cartItems.value.map(cItem => cItem.item_id)
    return cItemIds.includes(item.id)
})

// function cartById() { //^ return the cart item by item_id
//     console.log(cartItems.value)
//     var dummy = cartItems.value.filter(cItem => cItem.item_id === item.id)
//     return dummy[0]
// }

async function addToCart(item) { //^ add to cart @para -> item
    if (!user.value.token) {
        router.push({ name: 'signup' })
    }
    currentLoading.value = true
    const data = await addCartItem(item.id)
    currentCartItem.value = data
    currentAmount.value = data.amount
    currentLoading.value = false
}

async function changeAmount() {
    currentLoading.value = true
    await editAmount(currentCartItem.value.id, currentAmount.value)
    currentLoading.value = false
}

getCartItems() //* get cart items on creating
    .then(() => {
        currentCartItem.value = cartItems.value.filter(i => i.item_id === item.id)[0]
        if (currentCartItem.value) {
            currentAmount.value = currentCartItem.value.amount
        }
        currentLoading.value = false
    })
    .catch(error => {
        if (error.response.status === 401) //^ unauthorized/ not login
        {
            currentLoading.value = false
        }
    })
</script>

<style lang="scss" scoped></style>