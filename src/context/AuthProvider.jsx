import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()
const AuthProvider = ({children}) => {
    
    //const AuthProvider = (props) => { //const {children} = props //es igual a : //const AuthProvider = (children) => {
    const [ auth, setAuth ] = useState({}) //Si este objeto useState({}) esta lleno, significa que esta autenticado desde la API
    //const suma = () =>{} y se podría incluir en: //<AuthContext.Provider value={{ auth, setAuth, suma }}>
    const [cargando, setCargando] = useState(true) //maneja el auth en la primera carga vacio(RutaProtegida.jsx)
    useEffect(() => { //Cuando este listo este AuthProvider se va a ejecutar este codigo, 
                        // tambien revisa si esta autenticado o no
                        // primero va y carga const [ auth, setAuth ] = useState({}) vacio y luego llena el auth
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            const config = { 
                //para cargar como postman, la autorizacion y el bearer
                headers: { //Esto crea el header de configuracion
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Es el mismo de authMiddleware.js  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
                }
            }
            //console.log('headers authProvider')
            //console.log(config)
            try {
                const { data } = await clienteAxios.get('/veterinarios/perfil',
                 config)
                //console.log('Funcionó authProvider')
                //console.log(data)
                setAuth(data) //Manda los valores del data al state
            } catch (error) {
                //console.log('Error authProvider')
                //console.log(error.response.data.msg)
                setAuth({}) //Manda los valores vacios al state
            }
            console.log('Si hay token')
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {
        //console.log(datos)
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }

        const config = { 
            //para cargar como postman, la autorizacion y el bearer
            headers: { //Esto crea el header de configuracion
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` // Es el mismo de authMiddleware.js  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
            }
        }
        try {
            const url = `/veterinarios/perfil/${datos._id}` //viene el id de veterinarioRoutes.js
            const { data } = await clienteAxios.put(url, datos, config)
            //console.log(data)
            return {
                msg: 'Guardado Correctamente'
            }
        } catch (error) {
            //console.log(error.response)
            return {
                msg: error.response.data.msg,
                error: true
            }

        }
    }

    const guardarPassword = async (datos) => {
        //console.log(datos)
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }

        const config = { 
            //para cargar como postman, la autorizacion y el bearer
            headers: { //Esto crea el header de configuracion
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` // Es el mismo de authMiddleware.js  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
            }
        }
        try {
            const url = '/veterinarios/actualizar-password' //viene el id de veterinarioRoutes.js
            const { data } = await clienteAxios.put(url, datos, config)
            console.log(data)
            return {
                msg: data.msg
            }
        } catch (error) {
            //console.log(error.response)
            return {
                msg: error.response.data.msg,
                error: true
            }

        }
    }

    return(
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext
// children es todo lo que está en apps.jsx
//<Routes>
//<Route path="/" element={<AuthLayout />}>
//  <Route index element={<Login />} />
//  <Route path="registrar" element={<Registrar />} />
//  <Route path="olvide-password" element={<OlvidePassword />} />
//  <Route path="olvide-password/:token" element={<NuevoPassword />} />
//  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
//</Route>
//</Routes>