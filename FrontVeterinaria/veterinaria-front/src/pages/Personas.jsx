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

return ( <div className="container mt-4">

    <h1 className="mb-3">
        Gestión Personas
    </h1>

    <button
        className="btn btn-secondary mb-3"
        onClick={() =>
            navigate("/personas/crear")
        }
    >
        Nueva Persona
    </button>

    <div className="card mb-4">
        <div className="card-body">

            <table className="table table-striped table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Usuario</th>
                        <th>Roles</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        personas.map((persona) => (

                            <tr key={persona.docPersona}>

                                <td>
                                    {persona.docPersona}
                                </td>

                                <td>
                                    {persona.nombres}
                                </td>

                                <td>
                                    {persona.apellidos}
                                </td>

                                <td>
                                    {persona.usuario}
                                </td>

                                <td>

                                    <button
                                        type="button"
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() =>
                                            navigate(
                                                `/personas/${persona.docPersona}/roles`
                                            )
                                        }
                                    >
                                        Roles
                                    </button>

                                </td>

                                <td>

                                    <button
                                        type="button"
                                        className="btn btn-outline-success btn-sm me-2"
                                        onClick={() =>
                                            editarPersona(persona)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() =>
                                            eliminar(
                                                persona.docPersona
                                            )
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

            <div className="card p-4">

                <h3>
                    Editar Persona
                </h3>

                <form onSubmit={actualizar}>

                    <select
                        className="form-select mb-2"
                        value={tipoDoc}
                        onChange={(e) =>
                            setTipoDoc(
                                e.target.value
                            )
                        }
                    >
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
                        className="form-control mb-2"
                        value={nombres}
                        onChange={(e) =>
                            setNombres(
                                e.target.value
                            )
                        }
                        placeholder="Nombres"
                    />

                    <input
                        className="form-control mb-2"
                        value={apellidos}
                        onChange={(e) =>
                            setApellidos(
                                e.target.value
                            )
                        }
                        placeholder="Apellidos"
                    />

                    <input
                        className="form-control mb-2"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        placeholder="Email"
                    />

                    <input
                        className="form-control mb-2"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(
                                e.target.value
                            )
                        }
                        placeholder="Teléfono"
                    />

                    <input
                        className="form-control mb-2"
                        value={usuario}
                        onChange={(e) =>
                            setUsuario(
                                e.target.value
                            )
                        }
                        placeholder="Usuario"
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        placeholder="Nueva contraseña"
                    />

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Actualizar
                    </button>

                </form>

            </div>

        )
    }

</div>


);



}

export default Personas;
