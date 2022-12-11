import usePacientes from "../hooks/usePacientes" // para poder usar el context usePacientes.jsx

const Paciente = ({paciente}) => {
    const { setEdicion, eliminarPaciente } = usePacientes() //del PacientesProvider
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente
    //console.log('paciente.jsx: ',paciente)
    //console.log(fecha)
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }
    //console.log(fecha)
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-800">Nombre:{''}
            <span className="font-normal normal-case text-black my-2">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800">Propietario:{''}
            <span className="font-normal normal-case text-black my-2">{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800">Email de Contacto:{''}
            <span className="font-normal normal-case text-black my-2">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800">Fecha de Alta:{''}
            <span className="font-normal normal-case text-black my-2">{formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800">Sintomas:{''}
            <span className="font-normal normal-case text-black my-2">{sintomas}</span>
        </p>
        <div className="flex justify-between my-5">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase 
                font-bold rounded-lg"
                onClick={() => setEdicion(paciente)}
            >Editar</button>
                <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase 
                font-bold rounded-lg"
                onClick={() => eliminarPaciente(_id)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente