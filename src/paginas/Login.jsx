import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //useNavigate redirecciona al usuario

import useAuth from '../hooks/useAuth' //importar para usar el contexto global
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})

    const navigate = useNavigate() //va a tomar una ruta donde quieras redireccionar al usuario

    const { setAuth } = useAuth(); //Antes del error que seguia derecho, no se usaba esta linea

    const handleSubmit = async (e) => {
      e.preventDefault();
      if([email, password].includes('')){
        setAlerta({
          msg: 'Todos los campos son Obligatorios', 
          error: true
        });
        return //Para que no se ejecuten las siguientes lineas
      }

      try {
        //const { data } = await clienteAxios.post(`/veterinarios/login`, {email, password})
        const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
        localStorage.setItem('token', data.token)
        console.log('Login-data')  
        console.log(data)

        setAuth(data); //Antes del error que seguia derecho, no se usaba esta linea
        navigate('/admin')
        setAlerta({
          msg: 'Ingreso Correcto', 
          error: true
        });
        return //Para que no se ejecuten las siguientes lineas
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
      }
    }

    //const {auth} = useAuth() // estos valores los traemos del context global de useAuth.jsx
    //console.log('Login-auth')
    //console.log(auth)
    const {msg} = alerta
    return (
      <> 
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus
              <span className="text-black">Pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && 
            <Alerta 
              alerta={alerta}
            />
          }

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
              type="email" 
              placeholder="Email de registro" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input
              type="password" 
              placeholder="Tu Password" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
              />
            </div>
            <input 
              type="submit" 
              value="Iniciar Sesión" 
              className="bg-indigo-700 w-full py-3 px-10 
              rounded-xl text-white uppercase font-bold mt-5 
              hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link 
              className='block text-center my-5 text-gray-500'
              to="/registrar">No tienes una cuenta? Registrate</Link>
            <Link 
              className='block text-center my-5 text-gray-500'
              to="/olvide-password">Olvidé mi Password</Link>
          </nav>
        </div>
      </>
    )
  };
  export default Login;