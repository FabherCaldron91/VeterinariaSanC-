import { useEffect, useState } from "react";
import {
obtenerCitas,
crearCita,
actualizarCita,
eliminarCita
} from "../services/citaService";
import { obtenerMascota } from "../services/mascotaServices";
import { obtenerVeterinario} from "../services/personaRolService"

function CitasDos() {

        const [citas, setCitas] = useState ([]);
        const [mascotas, setMascotas] = useState ([]);
        const [veterinarios, setVeterinarios] = useState ([]);
        const [idCita, setIdCita] = useState (null);
        const [fechaHora, setFechaHora] = useState ("");
        const [motivo, setMotivo] = useState ("");
        const [estado, setEstado] = useState ("");
        const [mascota, setMascota] = useState ("");
        const [editando, setEditando] = useState (false);


        useEffect(() => {
            cargarCitas();
            cargarMascotas();
            cargarVeterinario();
        }, []);

        const cargarCitas = async () => {
            try {
                const response = await obtenerCitas();
                setCitas(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const cargarMascotas = async () => {
            try {
                const response = await obtenerMascota();
                setMascotas(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        
        const cargarVeterinario = async () => {
            try {
                const response = await obtenerVeterinario();
                setVeterinarios(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const guardarCita = async (e) => {
            e.preventDefault();
            const cita = {
                fechaHora,
                motivo,
                estado,
                mascota: parseInt(mascota),
                veterinario: parseInt(veterinario)
            };

            try {
                if (editando) {
                    await actualizarCita(idCita, cita);
                    alert("Cita actualizada correctamente");
                } else {
                    await crearCita(cita);
                    alert("Cita registrada correctamente");
                }
                await cargarCitas();
                limpiarFormulario();
            } catch (error) {
                console.log(error);
                alert("Error al guardar la cita");
            }
        };

        const editarCita = (cita) => {
            setIdCita(cita.idCita);
            setFechaHora(
                cita.fechaHora?.slice(0, 16)
            );
            setMotivo(cita.motivo);
            setEstado(cita.estado);
            setMascota(cita.mascota);
            setVeterinario(cita.veterinario);
            setEditando(true);
        };

        const eliminar = async (idCita) => {
            if (!confirm("¿Desea eliminar esta cita?"))
                return;
            try {
                await eliminarCita(idCita);
                await cargarCitas();
            } catch (error) {
                console.log(error);
                alert("No fue posible eliminar");
            }
        };

        const limpiarFormulario = () => {
            setIdCita(null);
            setFechaHora("");
            setMotivo("");
            setEstado("");
            setMascota("");
            setVeterinario("");
            setEditando(false);
        };

        return (
            <>
                <h1>Gestión de Citas</h1>
                <form onSubmit={guardarCita}>
                    <input
                        type="datetime-local"
                        value={fechaHora}
                        onChange={(e) =>
                            setFechaHora(e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Motivo"
                        value={motivo}
                        onChange={(e) =>
                            setMotivo(e.target.value)
                        }
                    />
                    <select
                        value={estado}
                        onChange={(e) =>
                            setEstado(e.target.value)
                        }
                    >
                        <option value="">
                            Seleccione estado
                        </option>
                        <option value="Pendiente">
                            Pendiente
                        </option>
                        <option value="Atendida">
                            Atendida
                        </option>
                        <option value="Cancelada">
                            Cancelada
                        </option>
                    </select>
                    <select
                        value={mascota}
                        onChange={(e) =>
                            setMascota(e.target.value)
                        }
                    >
                        <option value="">
                            Seleccione mascota
                        </option>
                        {
                            mascotas.map((m) => (
                                <option
                                    key={m.idMascota}
                                    value={m.idMascota}
                                >
                                    {m.nombreMascota}
                                </option>
                            ))
                        }
                    </select>
                    <select
                        value={veterinarios}
                        onChange={(e) =>
                            setVeterinario(e.target.value)
                        }
                    >
                        <option value="">
                            Seleccione veterinario
                        </option>
                        {
                            veterinarios.map(
                                (veterinario) => (
                                <option
                                    key={veterinario.docPersona}
                                    value={veterinario.docPersona}
                                >
                                    {veterinario.Nombre}
                                </option>
                            ))
                        }
                    </select>
                    <button type="submit">
                        {
                            editando
                                ? "Actualizar"
                                : "Guardar"
                        }
                    </button>
                </form>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                            <th>Mascota</th>
                            <th>Veterinario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            citas.map((cita) => (
                                <tr key={cita.idCita}>
                                    <td>{cita.idCita}</td>
                                    <td>
                                        {
                                            new Date(
                                                cita.fechaHora
                                            ).toLocaleString("es-CO")
                                        }
                                    </td>
                                    <td>{cita.motivo}</td>
                                    <td>{cita.estado}</td>
                                    <td>{cita.mascotaNombre}</td>
                                    <td>{cita.veterinarioNombre}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                editarCita(cita)
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                eliminar(cita.idCita)
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
            </>
        );
        
        }

export default CitasDos;
