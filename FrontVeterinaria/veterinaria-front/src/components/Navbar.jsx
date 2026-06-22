import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return(
        <header className="vet-navbar">
            <nav 
            class="navbar nav-expand-lg" data-bs-theme="white"
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
                            <li
                            className="nav-item"
                            >
                                <NavLink 
                                className="nav-link vet-nav-link" to="/"
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            <li
                            className="navitem">
                                <NavLink
                                className="nav-link vet-nav-link" to="/personas"
                                >
                                    Personas
                                </NavLink>
                            </li>
                            <li
                            className="navitem"
                            >
                                <NavLink
                                className="nav-link vet-nav-link" to="/mascotas"
                                >
                                    Mascotas
                                </NavLink>
                            </li>
                            <li
                            className="nav-item"
                            >
                                <NavLink
                                className="nav-link vet-nav-link" to="/citasdos"
                                >
                                    Citas
                                </NavLink>
                            </li>
                            <li
                            className="nav-item"
                            >
                                <NavLink
                                className="nav-link vet-nav-link" to="/rol"
                                >
                                    Roles
                                </NavLink>
                            </li>
                            <li
                            className="nav-item ms-lg-2"
                            >
                                <Link
                                className="nav-link vet-nav-cta" to="/citasdos"
                                >
                                    Agendar Cita
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar