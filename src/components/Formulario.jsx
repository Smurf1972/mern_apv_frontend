import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {
    const [nombre, setNombre] = useState('')  //Desde paciente.js
    const [propietario, setPropietario] = useState('')  //Desde paciente.js
    const [email, setEmail] = useState('')  //Desde paciente.js
    const [fecha, setFecha] = useState('')  //Desde paciente.js
    const [sintomas, setSintomas] = useState('')  //Desde paciente.js 
    const [id, setId] = useState(null) 

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()
    //console.log('useEffect', paciente)
    //console.log(paciente)
    useEffect(() => {
        //Otra forma
        //console.log('render o cambio paciente_1')
        //console.log('Nombre paciente', nombre)
        if(paciente.nombre){
            //console.log('render o cambio paciente_2')
            setNombre(paciente.nombre) //llena el input nombre del formulario
            //console.log('paciente.nombre : ', paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
        //console.log('render o cambio paciente')
    }, [paciente]) //Detecta cuando se llena paciente


    const handleSubmit = e => {
        //igual a: const handleSubmit = (e) => {
        e.preventDefault()
        //Validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'todos los campos son obligatorios',
                error: true
            })
            return;
        }
        
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: 'Guardado Correctamente'
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('') 
        setId('') 
    }
    const { msg } = alerta 
    return (
    <>
        <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
        <p className='text-xl mt-5 mb-10 text-center '>
            Añade tus Pacientes y {''} <span className='text-indigo-600 font-bold'>Administralos</span> 
        </p>

        {msg && <Alerta alerta={alerta} />}
        
        <form className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
            onSubmit={handleSubmit}
        >

            <div className='mb-5'>
                <label 
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold'    
                >Nombre Mascota</label>
                <input
                    id='nombre'
                    type='text'
                    placeholder='Nombre de la Mascota'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor='propietario'
                    className='text-gray-700 uppercase font-bold'    
                >Nombre Propietario</label>
                <input
                    id='propietario'
                    type='text'
                    placeholder='Nombre del Propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold'    
                >EMail</label>
                <input
                    id='email'
                    type='email'
                    placeholder='EMail'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor='fecha'
                    className='text-gray-700 uppercase font-bold'    
                >Fecha de Alta</label>
                <input
                    id='fecha'
                    type='date'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor='sintomas'
                    className='text-gray-700 uppercase font-bold'    
                >Sintomas</label>
                <textarea
                    id='sintomas'
                    placeholder='Describe los Sintomas'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
            </div>
            <input
             type='submit'
             className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 
             cursor-pointer transition-colors'
             value={id ? 'Guardar Cambios': 'Agregar Paciente'}
             />
        </form>
        {msg && <Alerta alerta={alerta} />}
        
    </>
  )
};

export default Formulario;