import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrearPersonas } from "../services/personaService";
import Navbar from "../components/Navbar"
import { crearPersonaRol } from "../services/personaRolService";

function CrearPersona() {

        const navigate = useNavigate();

        const [docPersona, setDocPersona] = useState("");
        const [tipoDoc, setTipoDoc] = useState("");
        const [nombres, setNombres] = useState("");
        const [apellidos, setApellidos] = useState("");
        const [email, setEmail] = useState("");
        const [telefono, setTelefono] = useState("");
        const [usuario, setUsuario] = useState("");
        const [password, setPassword] = useState("");
        const [rol, setRol] = useState("")

        const guardarPersona = async (e) => {

            e.preventDefault();

            try {

                await CrearPersonas({
                    docPersona: parseInt(docPersona),
                    tipoDoc,
                    nombres,
                    apellidos,
                    email,
                    telefono,
                    usuario,
                    password,
                    rol
                });

                alert("Persona creada correctamente");

                navigate("/personas");

            } catch(error) {

                console.log(error);
                alert("Error al guardar");

            }
        }

        const limpiar = () => {
        setDocPersona("")
        setTipoDoc("")
        setNombres("")
        setApellidos("")
        setEmail("")
        setTelefono("")
        setUsuario("")
        setPassword("")
        setRol("")
    }

        return (
            <>
            <Navbar />
            <main className="conteiner py-4">
                <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h1 className="h3 fw-bold mb-1">
                            Nueva Persona
                        </h1>
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <form onSubmit={guardarPersona} className="card border-0 shadow shadow-sm mt-4">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="form-label"> Documento </label>
                                                <input
                                                className="form-control"
                                                    type="number"
                                                    placeholder="Documento"
                                                    value={docPersona}
                                                    onChange={(e) =>
                                                        setDocPersona(e.target.value)
                                                    }/>
                                                    <select className="form-select form-control"
                                                            value={tipoDoc}
                                                            onChange={(e) =>
                                                                setTipoDoc(e.target.value)
                                                            }>
                                                                <option value="">
                                                                    Seleccione tipo de documento
                                                                </option>
                                                                <option value="CC">
                                                                    Cédula de Ciudadanía
                                                                </option>
                                                                <option value="CE">
                                                                    Cédula de Extranjería
                                                                </option>
                                                                <option value="TI">
                                                                    Tarjeta de Identidad
                                                                </option>
                                                                <option value="PP">
                                                                    Pasaporte
                                                                </option>
                                                                <option value="NIT">
                                                                    NIT
                                                                </option>
                                                    </select>
                                            </div>
                                        <div className="mb-3">
                                            <label className="form-label"> Nombres</label>
                                                <input
                                                className="form-control"
                                                placeholder="Nombres"
                                                value={nombres}
                                                onChange={(e) =>
                                                    setNombres(e.target.value)
                                                }/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Apellidos</label>
                                                <input
                                                className="form-control"
                                                placeholder="Apellidos"
                                                value={apellidos}
                                                onChange={(e) =>
                                                    setApellidos(e.target.value)
                                                }/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                                <input
                                                className="form-control"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Telefono</label>
                                                <input
                                                className="form-control"
                                                placeholder="Teléfono"
                                                value={telefono}
                                                onChange={(e) =>
                                                setTelefono(e.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Usuario 🤔</label>
                                            <input
                                            className="form-control"
                                            placeholder="Usuario"
                                            value={usuario}
                                            onChange={(e) =>
                                            setUsuario(e.target.value)}/>
                                        </div>
                                    </div>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña 🔑</label>
                                                <input
                                                className="form-control"
                                                type="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) =>
                                                setPassword(e.target.value)}/>
                                        </div>
                                        <div className="d-flex gap-2 mt-3">
                                            <button type="submit" className="btn vet-btn-primary">
                                                Guardar Persona
                                            </button>
                                            <button type="button" className="btn btn-outline-secondary" onClick={limpiar}>
                                                Cancelar
                                            </button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="vet-login-page h-100 d-flex align-items-center justify-content-center">
                        <div className="vet-login-aside d-flex flex-column justify-content-between p-4 rounded shadow-lg h-100 w-100">
                            <div className="d-flex align-items-center gap-2">
                                <img src="/Vetrinaria.svg" alt="LogoVete" width="40" height="40"/>
                                <span className="fw-bold fs-5 text-white">
                                    San Martín
                                </span>
                            </div>
                            <div>
                                <h2 className="text-white fw-bold mb-3">
                                    Cuidamos a quienes más amas 🐾🐾
                                </h2>
                                <p className="text-white-50">
                                    Accede a tu cuenta para gestionar las citas,
                                    mascotas o el historial clínico de tus pacientes.
                                </p>
                            </div>
                            <p className="text-white-50 small mb-0">
                                Veterinaria San Martín &copy; 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
)


}

export default CrearPersona
