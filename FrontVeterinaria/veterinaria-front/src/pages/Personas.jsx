import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
obtenerPersonas,
actualizarPersona,
eliminarPersona
} from "../services/personaService";
import { obtenerPersonaRoles } from "../services/personaRolService";

function Personas() {

const navigate = useNavigate();

const [personas, setPersonas] = useState([]);

const [docPersona, setDocPersona] = useState("");
const [tipoDoc, setTipoDoc] = useState("");
const [nombres, setNombres] = useState("");
const [apellidos, setApellidos] = useState("");
const [email, setEmail] = useState("");
const [telefono, setTelefono] = useState("");
const [usuario, setUsuario] = useState("");
const [password, setPassword] = useState("");
const [roles, setRoles] = useState([]);

const [editando, setEditando] = useState(false);

useEffect(() => {
    cargarPersonas();
    cargarRol();
}, []);

const cargarPersonas = async () => {
    const response = await obtenerPersonas();
    setPersonas(response.data);
};

const cargarRol = async () => {
    const response = await obtenerPersonaRoles();
    setRoles(response.data);
};

const editarPersona = (persona) => {

    setDocPersona(persona.docPersona);
    setTipoDoc(persona.tipoDoc);
    setNombres(persona.nombres);
    setApellidos(persona.apellidos);
    setEmail(persona.email);
    setTelefono(persona.telefono);
    setUsuario(persona.usuario);

    setPassword("");
    setEditando(true);
};

const actualizar = async (e) => {

    e.preventDefault();

    try {

        await actualizarPersona(
            docPersona,
            {
                tipoDoc,
                nombres,
                apellidos,
                email,
                telefono,
                usuario,
                password
            }
        );

        alert("Persona actualizada");

        await cargarPersonas();

        limpiar();

    } catch(error) {

        console.log(error);

    }
};

const eliminar = async (docPersona) => {

    if(!confirm("¿Eliminar persona?"))
        return;

    await eliminarPersona(docPersona);

    await cargarPersonas();
};

const limpiar = () => {

    setDocPersona("");
    setTipoDoc("");
    setNombres("");
    setApellidos("");
    setEmail("");
    setTelefono("");
    setUsuario("");
    setPassword("");

    setEditando(false);
};

return (
    <div className="container mt-4">
        <h1>Gestión Personas</h1>

        <button 
            btn btn-secondary mb-3
            onClick={() =>
                navigate("/personas/crear")
            }
        >
            Nueva Persona
        </button>
        <div className="card mb-4" >
        <div className="card-body">
        <table border="1">
            <thead>
                <tr>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Usuario</th>
                    <th>Roles</th>
                    <th>Acciones </th>
                </tr>
            </thead>

            <tbody>
                {
                    personas.map((persona) => (
                        <tr key={persona.docPersona}>

                            <td>{persona.docPersona}</td>
                            <td>{persona.nombres}</td>
                            <td>{persona.apellidos}</td>
                            <td>{persona.usuario}</td>
                            <td>
                                <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() =>
                                    navigate(`/personas/${persona.docPersona}/roles`
                                    )
                                    }
                                >
                                    Roles
                                </button>
                            </td>
                            <td>{persona.rol}</td>

                            <td>
                                
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={() =>
                                        editarPersona(persona)
                                    }
                                >
                                    Editar
                                </button>

                                <button 
                                    type="button"
                                    class="btn btn-outline-danger"
                                    onClick={() =>
                                        eliminar(persona.docPersona)
                                    }
                                >
                                    Eliminar
                                </button>

                            </td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
</div>
        {
            editando && (

                <form onSubmit={actualizar}>

                    <h2>Editar Persona</h2>

                    <input
                        value={tipoDoc}
                        onChange={(e) =>
                            setTipoDoc(e.target.value)
                        }
                    />

                    <input
                        value={nombres}
                        onChange={(e) =>
                            setNombres(e.target.value)
                        }
                    />

                    <input
                        value={apellidos}
                        onChange={(e) =>
                            setApellidos(e.target.value)
                        }
                    />

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                    />

                    <input
                        value={usuario}
                        onChange={(e) =>
                            setUsuario(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">
                        Actualizar
                    </button>

                </form>

            )
        }
    </div>
);


}

export default Personas;
