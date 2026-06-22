import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrearPersonas } from "../services/personaService";

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
        const [rol, setRol] = useState ("");

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
                    password
                });

                alert("Persona creada correctamente");

                navigate("/personas");

            } catch(error) {

                console.log(error);
                alert("Error al guardar");

            }
        };

return (
    <div className="container mt-4">
    
    <div className="card">

        <div className="card-header">
            <h2>Nueva Persona</h2>
        </div>

        <div className="card-body">

            <form onSubmit={guardarPersona}>

                <div className="mb-3">

                    <label className="form-label">
                        Documento
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={docPersona}
                        onChange={(e) =>
                            setDocPersona(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Tipo Documento
                    </label>

                    <select
                        className="form-select"
                        value={tipoDoc}
                        onChange={(e) =>
                            setTipoDoc(e.target.value)
                        }
                    >
                        <option value="">
                            Seleccione...
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

                    <br></br>
                    <select
                    className="from-select"
                    value={rol}
                    onChange={(e) =>
                        setRol(e.target.value)
                    }
                    >
                        <option
                        value=""
                        >
                            selleciobne rol 
                        </option>

                        <option
                        value="1"
                        >
                            Administradro
                        </option>

                        <option
                        value="2"
                        >
                        Cliente 
                        </option>

                        <option
                        value="3"
                        >
                            Veterinario
                        </option>
                    </select>
                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Nombres
                    </label>

                    <input
                        className="form-control"
                        value={nombres}
                        onChange={(e) =>
                            setNombres(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Apellidos
                    </label>

                    <input
                        className="form-control"
                        value={apellidos}
                        onChange={(e) =>
                            setApellidos(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Teléfono
                    </label>

                    <input
                        className="form-control"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Usuario
                    </label>

                    <input
                        className="form-control"
                        value={usuario}
                        onChange={(e) =>
                            setUsuario(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-success me-2"
                >
                    Guardar
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/personas")
                    }
                >
                    Cancelar
                </button>

            </form>

        </div>

    </div>

</div>


);


}

export default CrearPersona;
