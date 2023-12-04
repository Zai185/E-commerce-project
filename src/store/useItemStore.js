import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosClient from '../axios'


export const useItemStore = defineStore('item', () => {
    const currentItem = ref()
    const allItems = ref([])
    const loading = ref(false)

    async function createItem(item) {
        loading.value = true
        const response = await axiosClient.post('/items', item)
        loading.value = false
        return response.data
    }

    async function getItem(id) {
        loading.value = true
        const response = await axiosClient.get(`/items/${id}`)
        loading.value = false
        if (response.statusCode == 404) throw new Error("Item not found")
        currentItem.value = response.data
        return response.data
    }

    async function getAllItems() {
        loading.value = true
        const response = await axiosClient.get('/items')
        loading.value = false
        allItems.value = response.data
        return response.data
    }

    async function editItem(id, item) {
        loading.value = true
        const response = await axiosClient.put(`/items/${id}`, item)
        loading.value = false
        return response.data
    }

    async function deleteItem(id) {
        loading.value = true
        await axiosClient.delete(`/items/${id}`)
        loading.value = false
    }


    return { loading, allItems, currentItem, createItem, getItem, getAllItems, editItem, deleteItem }
})