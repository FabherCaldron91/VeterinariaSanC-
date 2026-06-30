import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
obtenerPersonas,
actualizarPersona,
eliminarPersona
} from "../services/personaService";

function Personasdos() {

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

const [editando, setEditando] = useState(false);

useEffect(() => {
    cargarPersonas();
}, []);

const cargarPersonas = async () => {
    try {
        const response =
            await obtenerPersonas();

        setPersonas(
            response.data
        );

    } catch(error) {

        console.log(error);

    }
};

const editarPersona = (persona) => {

    setDocPersona(
        persona.docPersona
    );

    setTipoDoc(
        persona.tipoDoc
    );

    setNombres(
        persona.nombres
    );

    setApellidos(
        persona.apellidos
    );

    setEmail(
        persona.email
    );

    setTelefono(
        persona.telefono
    );

    setUsuario(
        persona.usuario
    );

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

        alert(
            "Persona actualizada"
        );

        await cargarPersonas();

        limpiar();

    } catch(error) {

        console.log(error);

    }
};

const eliminar = async (
    docPersona
) => {

    if(
        !window.confirm(
            "¿Eliminar persona?"
        )
    )
        return;

    try {

        await eliminarPersona(
            docPersona
        );

        await cargarPersonas();

    } catch(error) {

        console.log(error);

    }
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
        <div className="d-flex justify-content-between mb-3">
            <h1>
                Gestión Personas
            </h1>
            <button
                className="btn btn-success"
                onClick={() =>
                    navigate(
                        "/personas/crear"
                    )
                }
            >
                Nueva Persona
            </button>
        </div>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Usuario</th>
                    <th>Roles</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    personas.map(
                        (persona) => (
                        <tr
                            key={
                                persona.docPersona
                            }
                        >
                            <td>
                                {
                                    persona.docPersona
                                }
                            </td>
                            <td>
                                {
                                    persona.nombres
                                }
                            </td>
                            <td>
                                {
                                    persona.apellidos
                                }
                            </td>
                            <td>
                                {
                                    persona.email
                                }
                            </td>
                            <td>
                                {
                                    persona.usuario
                                }
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
                                        editarPersona(
                                            persona
                                        )
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
        {
            editando && (
                <form
                    onSubmit={
                        actualizar
                    }
                    className="card p-3 mt-4"
                >
                    <h3>
                        Editar Persona
                    </h3>
                    <input
                        className="form-control mb-2"
                        value={tipoDoc}
                        onChange={(e) =>
                            setTipoDoc(
                                e.target.value
                            )
                        }
                    />
                    <input
                        className="form-control mb-2"
                        value={nombres}
                        onChange={(e) =>
                            setNombres(
                                e.target.value
                            )
                        }
                    />
                    <input
                        className="form-control mb-2"
                        value={apellidos}
                        onChange={(e) =>
                            setApellidos(
                                e.target.value
                            )
                        }
                    />
                    <input
                        className="form-control mb-2"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />
                    <input
                        className="form-control mb-2"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(
                                e.target.value
                            )
                        }
                    />
                    <input
                        className="form-control mb-2"
                        value={usuario}
                        onChange={(e) =>
                            setUsuario(
                                e.target.value
                            )
                        }
                    />
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Actualizar
                    </button>
                </form>
            )
        }
    </div>
);


}

export default Personasdos;
