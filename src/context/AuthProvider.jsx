import clienteAxios from '../config/axios';
import {useState, useEffect, createContext} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

   const navigate = useNavigate(); 

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {

            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config); //El segundo parametro es para introducir la configuración de la autenticación.
                setAuth(data);
                navigate('/admin');
            
                
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
        }

        setCargando(false);

        autenticarUsuario();
    }

    , [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async perfil => {

        const token = localStorage.getItem('token');

        if(!token){
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${perfil._id}`;
            await clienteAxios.put(url, perfil, config);
            
            return {msg: 'Actualizado correctamente', error: false}

        } catch (error) {
            return {msg: error.response.data.msg, error:true};
        }
    }

    const actualizarPassword = async password => {
        
        const token = localStorage.getItem('token');

        if(!token){
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put('/veterinarios/cambiar-password', password, config);
            return {
                msg:data.msg, error:false
            }

        } catch (error) {
            return {
                msg: error.response.data.msg, error:true
            }
        } 
    }

    return (
        <AuthContext.Provider
            value={{
                auth, 
                setAuth, 
                cargando, 
                cerrarSesion, 
                actualizarPerfil, 
                actualizarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
};

export default AuthContext