import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    obtenerPersonaRoles,
    crearPersonaRol,
    eliminarPersonaRol
} from "../services/personaRolService";

import { obtenerPersonas } from "../services/personaService";

function PersonaRoles() {

    const { docPersona } = useParams();
    const navigate = useNavigate();

    const [persona, setPersona] = useState(null);
    const [rolesPersona, setRolesPersona] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState("");

    const rolesDisponibles = [
        {
            idRol: 1,
            nombreRol: "Administrador"
        },
        {
            idRol: 2,
            nombreRol: "Cliente"
        },
        {
            idRol: 3,
            nombreRol: "Veterinario"
        }
    ];

    useEffect(() => {
        cargarPersona();
        cargarRoles();
    }, []);

    const cargarPersona = async () => {

        try {

            const response =
                await obtenerPersonas();

            const personaEncontrada =
                response.data.find(
                    p =>
                        p.docPersona ==
                        docPersona
                );

            setPersona(
                personaEncontrada
            );

        } catch(error) {

            console.log(error);

        }
    };

    const cargarRoles = async () => {

        try {

            const response =
                await obtenerPersonaRoles();

            const rolesFiltrados =
                response.data.filter(
                    r =>
                        r.personaDocPersona ==
                        docPersona
                );

            setRolesPersona(
                rolesFiltrados
            );

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

        const existe =
            rolesPersona.some(
                r =>
                    r.rolIdRol ==
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
                "¿Eliminar rol?"
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

            <button
                className="btn btn-secondary mb-3"
                onClick={() =>
                    navigate(
                        "/personas"
                    )
                }
            >
                Volver
            </button>

            <h1>
                Gestión de Roles
            </h1>

            {
                persona && (
                    <div
                        className="card mb-4"
                    >
                        <div
                            className="card-body"
                        >
                            <h4>
                                {
                                    persona.nombres
                                } {
                                    persona.apellidos
                                }
                            </h4>

                            <p>
                                Documento:
                                {
                                    persona.docPersona
                                }
                            </p>
                        </div>
                    </div>
                )
            }

            <div
                className="card mb-4"
            >
                <div
                    className="card-body"
                >

                    <h5>
                        Asignar Rol
                    </h5>

                    <select
                        className="form-select mb-3"
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

                        {
                            rolesDisponibles.map(
                                rol => (
                                    <option
                                        key={
                                            rol.idRol
                                        }
                                        value={
                                            rol.idRol
                                        }
                                    >
                                        {
                                            rol.nombreRol
                                        }
                                    </option>
                                )
                            )
                        }
                    </select>

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

            <table
                className="table table-striped"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Rol</th>
                        <th>
                            Acciones
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {
                        rolesPersona.map(
                            rol => (
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
                            )
                        )
                    }

                </tbody>

            </table>

        </div>
    );
}

export default PersonaRoles;