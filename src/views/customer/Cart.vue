<template>
    <div>
        <div v-if="isLoading">Loading...</div>
        <table v-else class="w-5/6 mx-auto mt-8">
            <tr class="text-left border ">
                <th class="w-12 py-2 text-center border border-black">No</th>
                <th class="w-1/2 px-2 py-2 border border-black ">Name </th>
                <th class="px-2 py-2 border border-black ">Quantity</th>
                <th class="px-2 py-2 border border-black ">Price</th>
                <th class="px-2 py-2 border border-black ">Total</th>
            </tr>
            <tr v-for="(item, index) in   cartItems  " :key="item.id" class="border">
                <td class="px-2 py-2 border border-black">{{ index + 1 }}</td>
                <td class="px-2 py-2 border border-black">{{ itemName(item.id).name }} </td>
                <td class="px-2 py-2 border border-black">
                    <div class="flex items-center">
                        <p class="inline-block w-8 text-center">{{ item.amount }}</p>
                        <Button @click="editAmount('+', item.id)">+</Button>
                        <Button @click="reduceAmount(item.id)"
                            :class="{ 'bg-red-800 hover:bg-red-950': item.amount === 1 }">
                            <TrashIcon v-if="item.amount === 1" class="h-7" />
                            <p v-else>-</p>

                        </Button>
                    </div>
                </td>
                <td class="px-2 py-2 border border-black">{{ itemName(item.id).price }}</td>
                <td class="px-2 py-2 border border-black">{{ totalForEach(item) }}</td>
            </tr>
            <tr class="text-left">
                <td class="py-2 text-center border border-black"></td>
                <td class="px-2 py-2 border border-black"></td>
                <td class="px-2 py-2 border border-black"></td>
                <td class="px-2 py-2 font-bold border border-black">Total</td>
                <td class="px-2 py-2 font-bold border border-black">{{ totalAmount() }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemStore } from '@store/useItemStore'
import { useCartStore } from '@store/useCartStore'
import Button from '@components/primary/Button.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'

const itemStore = useItemStore()
const cartStore = useCartStore()

const { items } = storeToRefs(itemStore)
const { cartItems } = storeToRefs(cartStore)
const { editAmount, getCartItem, deleteCartItem } = cartStore

const isLoading = ref(true)

itemStore.getAllItems()
    .then(() => {
        isLoading.value = false
    })

//^ functions
function itemName(id) {
    const index = items.value.findIndex(item => item.id === id)
    return items.value[index]
}

function totalForEach({ id, amount }) {
    return itemName(id).price * amount
}

function totalAmount() {
    let total = 0
    cartItems.value.forEach(item => {
        total += totalForEach(item)
    })
    return total
}

async function reduceAmount(id) {
    const item = await getCartItem(id)
    item.amount === 1
        ? deleteCartItem(id)
        : editAmount('-', id)
}
</script>

<style lang="scss" scoped></style>