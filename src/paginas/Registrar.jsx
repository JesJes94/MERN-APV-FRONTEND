import {Link} from "react-router-dom";
import {useState} from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg: 'Hay campos vacíos', error: true});
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({msg: 'Los passwords no son iguales', error: true});
      return;
    }

    if(password.length < 6 ) {
      setAlerta({msg: 'El password debe ser mínimo de 6 carácteres', error: true});
      return;
    }

    setAlerta({});

    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password});
      setAlerta({msg:'Cuenta creada correctamente, revisa tu email', error:false});
    }
    catch(error) {
      setAlerta({msg: error.response.data.msg, error:true});
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Crea tu Cuenta y Administra tus 
            <span className="text-black"> pacientes</span>
          </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {
          msg && <Alerta 
            alerta={alerta}
          />
        }        

        <form method="POST"
          onSubmit={handleSubmit}>
          <div>
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
              type="text" placeholder="Tu Nombre"
              value={nombre} onChange={e => setNombre(e.target.value)}/>
          </div>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
              type="email" placeholder="Email de Registro" id="email"
              value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
              type="password" placeholder="Tu Password" id="password"
              value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Repetir
              </label>
              <input className="border w-full p-2 mt-3 bg-gray-50 rounded-xl" 
              type="password" placeholder="Repite tu password" id="repetir-password"
              value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}/>
          </div>

          <input className=" bg-indigo-700 text-white w-full md:w-auto py-3 px-10 rounded-xl uppercase font-bold hover:cursor-pointer hover:bg-indigo-800" type="submit" value="Crea tu cuenta"/>

          <nav className="lg:flex lg:justify-between mt-10">
              <Link className="block text-center text-gray-500"
                to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
              <Link className="block text-center mt-5 md:mt-0 text-gray-500"
                to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </form>
      </div>
    </>
  )
}

export default Registrar