import { Navigate, useLocation, Link} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loader from "./Loader"

function RutaProtegida ({ children, modulo }) {
    const {autenticado, cargando, tienePermiso } = useAuth()
    const location = useLocation()

    if (cargando) {
        return <Loader texto="Verificando tu sesion..." />
    }

    if (!autenticado) {
        return <Navigate to="/login" replace state={{desde: location
            .pathname
        }} />
    }
    if (modulo && !tienePermiso(modulo)){
            return (
                <div className="container py-5">
                    <div className="vet-sin-permiso text-center mx-auto">
                        <div className="vet-sin-permiso-icono mb-3"
                        aria-hidden="true">
                            <svg width="56" height="56" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11v7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h1 className="h3 fw-bold mb-2">Acceso Restringido</h1>
                        <p className="text-muted mb-4">
                            Tu rol no tiene permiso para acceder a esto.
                        </p>
                        <Link to="/" className="btn vet-btn-primary">
                        Volver al inicio,
                        </Link>
                    </div>
                </div>
            )
        }
    return children
}

export default RutaProtegida