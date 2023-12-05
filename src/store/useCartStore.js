import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosClient from '../axios'

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])
    const loading = ref(false)
    const tempLoading = ref(false)

    async function addCartItem(item_id) {
        loading.value = true
        const response = await axiosClient.post('/carts', { item_id: item_id })
        cartItems.value = [...cartItems.value, response.data]
        loading.value = false
        return response.data
    }

    async function getCartItems(id) {
        loading.value = true
        const response = await axiosClient.get(`/carts`);
        cartItems.value = response.data
        loading.value = false
        return response.data
    }

    async function editAmount(id, amount) {
        const response = await axiosClient.put(`/carts/${id}`, { amount })
        cartItems.value = cartItems.value.map(item => {
            if (item.id === response.data.id) {
                return response.data
            }
            return item
        })
        return response.data
    }

    function deleteCartItem(id) {
        if (!confirm("Are you sure you want to delete")) return
        cartItems.value = cartItems.value.filter(item => item.id !== id)
    }



    return { loading, tempLoading, cartItems, addCartItem, editAmount, getCartItems, deleteCartItem }
})