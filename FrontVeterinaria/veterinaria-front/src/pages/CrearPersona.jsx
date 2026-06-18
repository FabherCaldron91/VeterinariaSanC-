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
            <>
                <h1>Nueva Persona</h1>

                <form onSubmit={guardarPersona}>

                    <input
                        type="number"
                        placeholder="Documento"
                        value={docPersona}
                        onChange={(e) =>
                            setDocPersona(e.target.value)
                        }
                    />

                    <select
                        value={tipoDoc}
                        onChange={(e) =>
                            setTipoDoc(e.target.value)
                        }
                    >
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


                    <input
                        placeholder="Nombres"
                        value={nombres}
                        onChange={(e) =>
                            setNombres(e.target.value)
                        }
                    />

                    <input
                        placeholder="Apellidos"
                        value={apellidos}
                        onChange={(e) =>
                            setApellidos(e.target.value)
                        }
                    />

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                    />

                    <input
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) =>
                            setUsuario(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">
                        Guardar Persona
                    </button>

                </form>
    </>
);


}

export default CrearPersona;
