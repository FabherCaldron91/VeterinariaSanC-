import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const {iniciarSesion, rutaInicio} = useAuth()

    
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [verPassword, setVerPassword] = useState(false)
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        if (!usuario.trim() || !password.trim()) {
            setError("Por favor ingrese su usuario y contraseña. ")
            return
        }

        setCargando(true)
        try {
            await iniciarSesion(usuario.trim(), password)

            const destino = location.state?.desde || rutaInicio()
            navigate(destino, {replace: true})
        } catch (err) {
            console.log("Error en el login:", err?.message.status, err?.message)
            if (err?.response?.status === 401) {
                setError("Usuario o contraseña incorecta.")
            } else {
                setError("No se puede iniciar sesion.")
            }
        }
            finally {
            setCargando(false)
        }
    }

    return(
        <div className="vet-login-page d-flex align-items-center justify-content-center">
            <div className="vet-login-card shadow-lg">
                <div className="row g-0">
                    <div className="col-lg-5 vet-login-aside d-none d-lg-flex 
                    flex-column justify-content-between p-4">
                        <div className="d-flex align-items-center gap-2">
                            <img src="/Vetrinaria.svg" alt="LogoVete."
                            width="40" height="40"/>
                            <span className="fw-bold fs-5 text-white">
                                San Martin
                            </span>
                        </div>
                        <div>
                            <h2 className="text-white fw-bold mb-3 text-balance">
                                Cuidamos a quienes mas amas🐾🐾 🐾🐾
                            </h2>
                            <p className="text-white-50 mb-0">
                                Accede a tu cuenta para gestionar las citas, mascotas o el historial
                                clinico de tus pacientes.
                            </p>
                        </div>
                        <p className="text-white-50 small mb-0">
                            Veterinaria San Martín &copy; 2026
                        </p>
                    </div>

                    <div className="col-lg-7 p-4 p-md-5">
                        <div className="text-center mb-4">
                            <h1 className="vet-login-title h3 fw-bold mb-1">
                                Iniciar sesion
                            </h1>
                            <p className="text-muted mb-0">
                                Ingrese sus datos para continuar.
                            </p>
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label fw-semibold">
                                    usuario:
                                </label>
                                <input 
                                id="usuario"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Ej: Pepita."
                                value={usuario}
                                onChange={(e) => 
                                    setUsuario(e.target.value)
                                }
                                autoComplete="username"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    Contraseña
                                </label>
                                <div className="input-group input-group-lg">
                                    <input
                                    id="password"
                                    type={verPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Tu contraseña"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                    />
                                    <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setVerPassword((v) => !v)}
                                        aria-label={verPassword ?
                                        "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {verPassword ? "Ocultar" : "ver"}
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="form-check">
                                    <input 
                                    className="form-check-input"
                                    type="checkbox"
                                    id="recordar"
                                    />
                                    <label 
                                    className="form-check-label text-muted"
                                    htmlFor="recordar">
                                        Recordarme
                                    </label>
                                </div>
                                <a href="#" className="vet-login-link small">
                                    Olvide mi contraseña
                                </a>
                            </div>

                            <button
                            type="submit"
                            className="btn vet-btn-primary btn-lg w-100"
                            disabled={cargando}>
                                {cargando ? "Ingresando..." : "Ingresar"}
                            </button>
                        </form>

                        <p className="text-center text-muted mt-4 mb-0">
                            ¿No tienes cuenta? {" "}
                            <Link 
                            to="/personas/crear"
                            className="vet-login-link fw-semibold"
                            >
                            Registrate aqui.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login