import { Outlet, Navigate } from "react-router-dom" //Navigate para redireccionar
import Footer from "../components/Header"
import Header from "../components/Footer"
import useAuth from "../hooks/useAuth"

export const RutaProtegida = () => {
    const { auth, cargando } = useAuth() // Traemos la información de autenticación (useAuth.jsx) // y el cargando desde (AuthProvider.jsx)
    //console.log(auth) // Traemos la información de autenticación del usuario
    //console.log('RutaProtegida')
    //console.log(cargando)
    if(cargando) return 'cargando...' 
    
    return (
        <>
            <Header />
            { auth?._id ? ( 
                <main className="container mx-auto mt-10">
                    <Outlet /> 
                </main>
            ) : <Navigate to="/" /> }
            <Footer />
        </>
    )
};
export default RutaProtegida;
//auth la primera vez carga vacio
// <Outlet/> Retorna <Route index element={<AdministrarPacientes />} /> (app.jsx)