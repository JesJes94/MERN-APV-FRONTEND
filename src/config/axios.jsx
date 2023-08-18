import axios from 'axios';

const clienteAxios = axios.create({
    url: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'origin':'x-requested-with',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json'
    } 
});

export default clienteAxios;