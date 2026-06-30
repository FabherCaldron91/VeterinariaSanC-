import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Loader from "./components/Loader"
import RutaProtegida from "./components/RutaProtegida"
import { Modulos } from "./config/permiso"

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Personas = lazy(() => import("./pages/Personas"))
const CrearPersona = lazy(() => import("./pages/CrearPersona"))
const PersonaRoles = lazy(() => import("./pages/PersonaRoles"))
const Mascota = lazy(() => import("./pages/Mascota"))
const Citas = lazy(() => import("./pages/Citas"))
const CitasDos = lazy(() => import("./pages/CitasDos"))
const Roles = lazy(() => import("./pages/Roles"))

function App() {
    console.log("Hola");
    return (
        <BrowserRouter>
        <Suspense fallback={<Loader texto="Cargando la página..." />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
            path="/personas"
            element={
            <RutaProtegida modulo={Modulos.PERSONAS}>
                <Personas />
            </RutaProtegida>
            }/>
            <Route 
            path="/personas/crear"
            element={ 
                <RutaProtegida modulo={Modulos.PERSONAS}>
                    <CrearPersona />
                </RutaProtegida>
            }
            />
            <Route
                path="/personas/:docPersona/roles"
                element={
                <RutaProtegida modulo={Modulos.ROLES}>
                    <PersonaRoles />
                </RutaProtegida>
                }
            />
            <Route
                path="/mascotas"
                element={
                <RutaProtegida modulo={Modulos.MASCOTAS}>
                    <Mascota />
                </RutaProtegida>
                }
            />
            <Route
                path="/citas"
                element={
                <RutaProtegida modulo={Modulos.CITAS}>
                    <Citas />
                </RutaProtegida>
                }
            />
            <Route
                path="/citasdos"
                element={
                <RutaProtegida modulo={Modulos.CITAS}>
                    <CitasDos />
                </RutaProtegida>
                }
            />
            <Route
                path="/rol"
                element={
                <RutaProtegida modulo={Modulos.ROLES}>
                    <Roles />
                </RutaProtegida>
                }
            />
            </Routes>
        </Suspense>
        </BrowserRouter>
    )
    }

export default App
