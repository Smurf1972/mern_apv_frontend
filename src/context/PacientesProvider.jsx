import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {
    
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState([])
    const { auth } = useAuth(); //Así consumo lo que está en el otro context AuthProvider.jsx

    useEffect(() => {
        const obtenerPacientes = async () =>{
            try {
                const token = localStorage.getItem('token')
                //console.log('token de PacientesProvider-obtenerPacientes')
                //console.log(token)
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get('/pacientes', config) //Extraemos la respuesta mediante 
                //Mandar un request
                //console.log('data de PacientesProvider-obtenerPacientes')
                //console.log(data)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    },[auth]) // //Así lo que consumió arriba que está en el otro context se pasa como dependencia,
    // de esa forma cuando el usuario haya iniciado sesión , o haya cerrado sesión e iniciado otro usuario,
    //se volverá a ejecutar obtenerPacientes() y se trae los pacientes del usuario autenticado

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        //console.log('token de PacientesProvider')
        //console.log(token)
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        console.log(paciente)
        if(paciente.id){ // si estamos editando(formulario.jsx) useEffect(() => { setNombre(paciente.nombre) 
                    //llena el input nombre del formulario
            
            try {
                //console.log('Editando...')
                console.log('pacientesProvider.jsx: ',paciente)
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                //console.log(data)
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id 
                    ? data : pacienteState)
                setPacientes(pacientesActualizado)    //Actualiza la pantalla
            } catch (error) {
                console.log(error)
            }
        } else {
            //console.log('Nuevo')
            try {
                //console.log('data de PacientesProvider')
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                //console.log(data)
    
                const {createdAt, updateAt, __v, ...pacienteAlmacenado  } = data //almacena todo (...pacienteAlmacenado) menos (createdAt, updateAt, __v)
                //console.log(pacienteAlmacenado)
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }
    const setEdicion = (paciente) => {
        //console.log('setEdicion Paciente', paciente)
        setPaciente(paciente) //Llena el state
    }
    const eliminarPaciente = async (id) => {
        console.log(id)
        //setPaciente(paciente) //Llena el state
        const confirmar = confirm('Deseas Eliminar?')
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                //console.log('token de PacientesProvider')
                //console.log(token)
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                console.log(data)                
                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado) //Actualiza la pantalla
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{ // coloca disponibles en context estas variables, funciones o metodos
                pacientes,
                guardarPaciente,
                setEdicion, 
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>    
    )
}
export default PacientesContext;