import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        "Access-Control-Allow-Origin": `${import.meta.env.FRONTEND_URL}/api`,
        'Content-Type': 'application/json'
    } 
});

export default clienteAxios;