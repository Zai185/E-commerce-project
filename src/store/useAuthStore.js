import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosClient from '../axios'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(
        JSON.parse(localStorage.getItem('USER_DATA')) || {
            date: {},
            token: null
        })



    async function authRegister(user_data) {
        const response = await axiosClient.post(`/register`, user_data)
        user.value = response.data // user data & token 
        localStorage.setItem('USER_DATA', JSON.stringify(user))
        return response.data

    }

    return { user, authRegister }
})