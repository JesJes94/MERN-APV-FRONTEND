import { useState } from "react";
import Alerta from "../components/Alerta";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const {actualizarPassword} = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')) {
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    if(password.pwd_nuevo.length < 6) {
      setAlerta({msg: 'El password debe ser minimo de 6 carácteres', error: true});
      return;
    }

    const respuesta = await actualizarPassword(password);
    setAlerta(respuesta);
  }

  const {msg} = alerta;

  return (
    <> 
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Cambia tu {''} <span className="text-indigo-600 font-bold">password</span> aquí</p>
    
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
            {
                msg && <Alerta 
                alerta={alerta}
                />
            }
   
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Password Actual</label>
                    <input 
                       type="password" 
                       className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                       name="pwd_actual"
                       placeholder="Escribe tu password actual"
                       onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                    />
                </div>
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Nuevo Password</label>
                    <input 
                       type="password" 
                       className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                       name="pwd_nuevo"
                       placeholder="Escribe tu nuevo password"
                       onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                    />
                </div>

                <input type="submit" value="Cambiar Password" className="w-full mt-5 px-10 py-3 bg-indigo-600 font-bold uppercase text-white rounded-lg hover:bg-indigo-700"/>
            </form>
        </div>
       </div>
    </>
  )
}

export default CambiarPassword