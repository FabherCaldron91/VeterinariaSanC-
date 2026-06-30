import { Link, NavLink, useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext"
import { Modulos } from "../config/permiso";

function Navbar() {
    const navigate = useNavigate()
    const {autenticado, usuario, tienePermiso, cerrarSesion} = useAuth()

    const salir = () => {
        cerrarSesion()
        navigate("/login")
    }

    const nombreCorto = usuario?.nombres || usuario?.usuario || "Usuario"

    return(
        <header className="vet-navbar">
            <nav 
            className="navbar nav-expand-lg" data-bs-theme="white"
            >
                <div 
                className="container"
                >
                    <Link
                    className="navbar-brand vet-brand" to="/"
                    >
                    <img src="/public/Vetrinaria.svg" alt="" width="30" height="24" />
                    <span>
                    Veterinaria San Martin
                    </span>
                    </Link>

                    <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                    aria-controls="menuPrincipal"
                    aria-expanded="false"
                    aria-label="Abrir menu."
                    >
                        <span
                        className="navbar-toggler-icon"
                        >
                        </span>
                    </button>

                    <div
                    className="collapse navbar-collapse"
                    id="menuPrincipal"
                    >
                        <ul
                        className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1"
                        >
                            <li className="nav-item">
                                <NavLink 
                                className="nav-link vet-nav-link" to="/"
                                >
                                    Inicio
                                </NavLink>
                            </li>

                            {tienePermiso(Modulos.PERSONAS) &&(
                                <li
                                className="navitem">
                                    <NavLink
                                    className="nav-link vet-nav-link" to="/personas"
                                    >
                                        Personas
                                    </NavLink>
                                </li>
                            )}
                            {tienePermiso(Modulos.MASCOTAS) &&(
                                <li
                                className="navitem"
                                >
                                    <NavLink
                                    className="nav-link vet-nav-link" to="/mascotas"
                                    >
                                        Mascotas
                                    </NavLink>
                                </li>
                            )}
                            {tienePermiso(Modulos.CITAS) && (
                                <li
                                className="nav-item"
                                >
                                    <NavLink
                                    className="nav-link vet-nav-link" to="/citasdos"
                                    >
                                        Citas
                                    </NavLink>
                                </li>
                            )}
                            {tienePermiso(Modulos.ROLES) && (
                                <li
                                className="nav-item"
                                >
                                    <NavLink
                                    className="nav-link vet-nav-link" to="/rol"
                                    >
                                        Roles
                                    </NavLink>
                                </li>
                            )}
                            {autenticado ? (
                                <>
                                <li className="nav-item">
                                    <span className="nav-link vet-nav-usuario" title={nombreCorto}>
                                        Hola, {nombreCorto}
                                    </span>
                                </li>
                                <li className="nav-item ms-lg-2">
                                    <button type="button" className="nav-link
                                    vet-nav-cta border-0" onClick={salir}>
                                        Cerrar sesion.
                                    </button>
                                </li>
                                </>
                            ) : (
                            <li className="nav-item ms-lg-2">
                                <NavLink className="nav-link vet-nav-cta" to="/login">
                                    Iniciar sesion
                                </NavLink>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar