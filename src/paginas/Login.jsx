import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const {setAuth} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit =  async e => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({msg: 'Los campos son obligatorios', error:true});
      return;
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/login', {email, password});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin')

    } catch (error) {
      setAlerta({msg:error.response.data.msg, error:true})
    }

  }

  const {msg} = alerta;

  return (
    <>
        <div>
         <h1 className="text-indigo-600 font-black text-6xl">
            Inicia Sesión y Administra tus <span className="text-black">pacientes</span> 
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          {
            msg && <Alerta 
              alerta={alerta}
            />
          }

          <form onSubmit={handleSubmit}> 
            <div>
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
              type="email" placeholder="Email de Registro" 
              value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                  Password
              </label>
              <input className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
              type="password" placeholder="Tu Password"
              value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <input className=" bg-indigo-700 text-white w-full md:w-auto py-3 px-10 rounded-xl uppercase font-bold hover:cursor-pointer
            hover:bg-indigo-800" type="submit" value="Iniciar Sesión"/>

            <nav className="lg:flex lg:justify-between mt-10">
              <Link className="block text-center text-gray-500"
                to="/registrar">¿No tienes una cuenta? Registrate aquí</Link>
              <Link className="block text-center mt-5 md:mt-0 text-gray-500"
                to="/olvide-password">Olvide mi Password</Link>
            </nav>
          </form>
        </div>
      
    </>
  )
}

export default Login