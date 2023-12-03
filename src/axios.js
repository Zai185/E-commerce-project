import axios from 'axios';
import { useAuthStore } from '@store/useAuthStore';
import { storeToRefs } from 'pinia';

// Create a custom Axios instance with predefined configuration
const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosClient.interceptors.request.use(config => {
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)
    config.headers.Authorization = `Bearer ${user.value.token}`
    return config
})

export default axiosClient;
