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
                    <select @change="cartItemChange(item.id, item.amount)" v-model="item.amount"
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
                <td class="px-2 py-2 border border-black">{{ getTotal }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@store/useCartStore'

const cartStore = useCartStore()
const { loading, cartItems } = storeToRefs(cartStore)
const { getTotal, editAmount, getCartItems, deleteCartItem } = cartStore

function cartItemChange(cart_id, amount) {
    if (amount == 0) {
        deleteCartItem(cart_id)
        return
    }
    editAmount(cart_id, amount)
}
getCartItems()
</script>

<style lang="scss" scoped></style>