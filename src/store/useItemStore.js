import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosClient from '../axios'


export const useItemStore = defineStore('item', () => {
    const items = ref([])

    async function addItem(item) {
        const response = await axiosClient.post('/data', item)
        return response.data
    }

    async function getItem(id) {
        const response = await axiosClient.get(`/data/${id}`)
        return response.data
    }

    async function getAllItems() {
        const response = await axiosClient.get('/data')
        items.value = response.data
    }

    async function editItem(id, item) {
        const response = await axiosClient.put(`/data/${id}`, item)
        return response.data
    }

    async function deleteItem(id) {
        const response = await axiosClient.delete(`/data/${id}`)
    }


    return { items, addItem, getItem, getAllItems, editItem, deleteItem }
})