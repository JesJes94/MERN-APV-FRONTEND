import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [valido, setValido] = useState(false);
  const [modificado, setModificado] = useState(false);
  const {token} = useParams();

  useEffect( () => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/resetear-password/${token}`);
        setAlerta({msg:'Coloca tu nuevo password', error:false})
        setValido(true);

      } catch (error) {
        setAlerta({msg: 'Hubo un error con el enlace', error:true});
      }
    }

    comprobarToken();

  },[])

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6) {
      setAlerta({msg:'El Password debe ser minimo de 6 carácteres', error:true });
      return;
    }

    try {
      const url = `/veterinarios/resetear-password/${token}`
      const {data} = await clienteAxios.post(url, {password});
      setModificado(true);
      setAlerta({msg:data.msg, error:false});

      
    } catch (error) {
      setAlerta({msg:error.response.data.msg, error:true});
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Reestablece tu password y no pierdas el acceso a tus
            <span className="text-black"> pacientes</span>
          </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {
          msg && <Alerta
          alerta={alerta}
          />
        }

        {
          valido && 
          
            <form onSubmit={handleSubmit}>

              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nuevo Password
              </label>

              <input className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
              type="password" placeholder="Tu Nuevo Password" value={password} onChange={e => setPassword(e.target.value)}/>
          
              <input className=" bg-indigo-700 mt-5 text-white w-full md:w-auto py-3 px-10 rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800" type="submit" value="Guardar Nuevo Password"/>

            </form>
        }        

        {
          modificado && <Link className="mt-5 block text-center text-gray-500" to="/">Iniciar Sesión</Link>
        }

      </div>
    </>
      
  )
}

export default NuevoPassword