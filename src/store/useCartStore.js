import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref(JSON.parse(localStorage.getItem('CART_ITEM')) || [])
    const cartIds = ref(JSON.parse(localStorage.getItem('CART_ITEMS_ID')) || [])

    function addCartItem(id) {
        if (checkIncluded(id)) return
        cartIds.value.push(id)
        cartItems.value.push({ id, amount: 1 })
        refreshCartItems()
    }

    function checkIncluded(id) {
        return cartIds.value.includes(id)
    }

    function getCartItem(id) {
        const index = cartItems.value.findIndex(item => item.id === id)
        return cartItems.value[index]
    }

    function editAmount(op, id) {
        const item = getCartItem(id)
        switch (op) {
            case '+':
                item.amount++
                break
            case '-':
                if (item.amount < 1) break
                item.amount--
                break
        }
        refreshCartItems()
    }
    function deleteCartItem(id) {
        if (!confirm("Are you sure you want to delete")) return
        cartItems.value = cartItems.value.filter(item => item.id !== id)
        cartIds.value = cartIds.value.filter(i => i !== id)
        refreshCartItems()
    }

    function refreshCartItems() {
        localStorage.setItem('CART_ITEM', JSON.stringify(cartItems.value))
        localStorage.setItem('CART_ITEMS_ID', JSON.stringify(cartIds.value))
    }


    return { cartItems, addCartItem, checkIncluded, editAmount, getCartItem, deleteCartItem }
})