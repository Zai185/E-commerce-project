import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosClient from '../axios'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        date: JSON.parse(sessionStorage.getItem('USER_DATA')) || {},
        token: JSON.parse(sessionStorage.getItem('TOKEN')) || null
    })

    async function authRegister(user_data) {
        const response = await axiosClient.post(`/register`, user_data)
        setUser(response.data)
        return response.data
    }

    async function authLogin(user_data) {
        const response = await axiosClient.post(`/login`, user_data)
        setUser(response.data)
        return response.data
    }

    function setUser(data) {
        user.value.data = data.data // user data & token 
        user.value.token = data.token // user data & token 
        sessionStorage.setItem('USER_DATA', JSON.stringify(user.value.data))
        sessionStorage.setItem('TOKEN', JSON.stringify(user.value.token))
    }

    return { user, authRegister, authLogin }
})