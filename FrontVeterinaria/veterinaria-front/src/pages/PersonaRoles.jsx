import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
obtenerPersonaRoles,
crearPersonaRol,
eliminarPersonaRol
} from "../services/personaRolService";

function PersonaRoles() {

const { docPersona } = useParams();

const [roles, setRoles] = useState([]);
const [rolSeleccionado, setRolSeleccionado] = useState("");

useEffect(() => {
    cargarRoles();
}, []);

const cargarRoles = async () => {

    try {

        const response =
            await obtenerPersonaRoles();

        const rolesPersona =
            response.data.filter(
                r =>
                    r.personaDocPersona ==
                    docPersona
            );

        setRoles(rolesPersona);

    } catch(error) {

        console.log(error);

    }
};

const agregarRol = async () => {

    if(!rolSeleccionado) {

        alert(
            "Seleccione un rol"
        );

        return;
    }

    const existe = roles.some(
        r =>
            r.rolIdRol ===
            parseInt(
                rolSeleccionado
            )
    );

    if(existe) {

        alert(
            "La persona ya tiene ese rol"
        );

        return;
    }

    const tieneCliente =
        roles.some(
            r => r.rolIdRol === 2
        );

    const tieneVeterinario =
        roles.some(
            r => r.rolIdRol === 3
        );

    if(
        parseInt(
            rolSeleccionado
        ) === 2 &&
        tieneVeterinario
    ) {

        alert(
            "Un veterinario no puede ser cliente"
        );

        return;
    }

    if(
        parseInt(
            rolSeleccionado
        ) === 3 &&
        tieneCliente
    ) {

        alert(
            "Un cliente no puede ser veterinario"
        );

        return;
    }

    try {

        await crearPersonaRol({

            personaDocPersona:
                parseInt(
                    docPersona
                ),

            rolIdRol:
                parseInt(
                    rolSeleccionado
                )

        });

        alert(
            "Rol asignado correctamente"
        );

        await cargarRoles();

        setRolSeleccionado("");

    } catch(error) {

        console.log(error);

        alert(
            "Error al asignar rol"
        );

    }
};

const quitarRol = async (
    idPersonaRol
) => {

    if(
        !window.confirm(
            "¿Eliminar este rol?"
        )
    )
        return;

    try {

        await eliminarPersonaRol(
            idPersonaRol
        );

        alert(
            "Rol eliminado"
        );

        await cargarRoles();

    } catch(error) {

        console.log(error);

        alert(
            "Error al eliminar"
        );

    }
};

return (

    <div className="container mt-4">

        <div className="card shadow p-4">

            <h2 className="mb-3">
                Gestión de Roles
            </h2>

            <h5>
                Documento:
                {docPersona}
            </h5>

            <hr />

            <div className="row">

                <div className="col-md-6">

                    <select
                        className="form-select"
                        value={
                            rolSeleccionado
                        }
                        onChange={(e) =>
                            setRolSeleccionado(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Seleccione rol
                        </option>

                        <option value="1">
                            Administrador
                        </option>

                        <option value="2">
                            Cliente
                        </option>

                        <option value="3">
                            Veterinario
                        </option>

                    </select>

                </div>

                <div className="col-md-3">

                    <button
                        className="btn btn-success"
                        onClick={
                            agregarRol
                        }
                    >
                        Asignar Rol
                    </button>

                </div>

            </div>

        </div>

        <div className="mt-4">

            <table className="table table-striped table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        roles.map(
                            (rol) => (

                            <tr
                                key={
                                    rol.idPersonaRol
                                }
                            >

                                <td>
                                    {
                                        rol.idPersonaRol
                                    }
                                </td>

                                <td>
                                    {
                                        rol.rolNombre
                                    }
                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            quitarRol(
                                                rol.idPersonaRol
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

);


}

export default PersonaRoles;
