import axios from 'axios';

// Create a custom Axios instance with predefined configuration
const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
