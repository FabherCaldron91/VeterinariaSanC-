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

            try {

                await crearPersonaRol({
                    personaDocPersona:
                        parseInt(docPersona),

                    rolIdRol:
                        parseInt(rolSeleccionado)
                });

                await cargarRoles();

            } catch(error) {

                console.log(error);

            }
        };

        const quitarRol = async (
            idPersonaRol
        ) => {

            try {

                await eliminarPersonaRol(
                    idPersonaRol
                );

                await cargarRoles();

            } catch(error) {

                console.log(error);

            }
        };

        return (
            <>
                <h1>
                    Gestión de Roles
                </h1>

                <h3>
                    Documento:
                    {docPersona}
                </h3>

                <select
                    value={rolSeleccionado}
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

                <button
                    onClick={agregarRol}
                >
                    Asignar Rol
                </button>

                <hr />

                <table border="1">

                    <thead>
                        <tr>
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
                                                rol.rolNombre
                                            }
                                        </td>

                                        <td>

                                            <button
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
            </>
        );


        }

export default PersonaRoles;
