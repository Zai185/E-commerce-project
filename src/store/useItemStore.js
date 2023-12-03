import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosClient from '../axios'


export const useItemStore = defineStore('item', () => {
    const items = ref([])

    async function addItem(item) {
        const response = await axiosClient.post('/items', item)
        return response.data
    }

    async function getItem(id) {
        const response = await axiosClient.get(`/items/${id}`)
        return response.data
    }

    async function getAllItems() {
        const response = await axiosClient.get('/items')
        items.value = response.data
    }

    async function editItem(id, item) {
        const response = await axiosClient.put(`/items/${id}`, item)
        return response.data
    }

    async function deleteItem(id) {
        const response = await axiosClient.delete(`/items/${id}`)
    }


    return { items, addItem, getItem, getAllItems, editItem, deleteItem }
})