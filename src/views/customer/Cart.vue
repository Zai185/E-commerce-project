<template>
    <div>
        <div v-if="loading">Loading...</div>
        <table v-else class="w-5/6 mx-auto mt-8">
            <tr class="text-left border ">
                <th class="w-12 py-2 text-center border border-black">No</th>
                <th class="w-1/2 px-2 py-2 border border-black ">Name </th>
                <th class="px-2 py-2 border border-black ">Quantity</th>
                <th class="px-2 py-2 border border-black ">Price</th>
                <th class="px-2 py-2 border border-black ">Total</th>
            </tr>
            <tr v-for="(item, index) in cartItems" :key="item.id" class="border">
                <td class="px-2 py-2 border border-black">{{ index + 1 }}</td>
                <td class="px-2 py-2 border border-black">{{ item.name }}</td>
                <td class="px-2 py-2 border border-black">
                    <select @change="editAmount(item.id, item.amount)" v-model="item.amount"
                        class="w-full py-0 bg-blue-100">
                        <option value="0">0 (delete)</option>
                        <option v-for="i in 9" :value="i">{{ i }}</option>
                    </select>
                </td>
                <td class="px-2 py-2 border border-black">{{ item.price }}</td>
                <td class="px-2 py-2 border border-black">{{ item.amount * item.price }}</td>
            </tr>
            <tr class="text-left">
                <td class="px-2 py-2 font-bold text-right border border-black" colspan="4">Total</td>
                <td class="px-2 py-2 border border-black"></td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@store/useCartStore'

const cartStore = useCartStore()
// const { items } = storeToRefs(itemStore)
const { loading, cartItems } = storeToRefs(cartStore)
const { editAmount, getCartItems, deleteCartItem } = cartStore
console.log(cartItems.value)

//^ functions
// function itemName(id) {
//     const index = items.value.findIndex(item => item.id === id)
//     return items.value[index]
// }

// function totalForEach({ id, amount }) {
//     return itemName(id).price * amount
// }

// function totalAmount() {
//     let total = 0
//     cartItems.value.forEach(item => {
//         total += totalForEach(item)
//     })
//     return total
// }

// async function reduceAmount(id) {
//     const item = await getCartItem(id)
//     item.amount === 1
//         ? deleteCartItem(id)
//         : editAmount('-', id)
// }

getCartItems()
</script>

<style lang="scss" scoped></style>