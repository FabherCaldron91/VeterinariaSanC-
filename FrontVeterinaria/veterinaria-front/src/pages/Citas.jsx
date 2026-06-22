import { use, useEffect, useState } from "react";
import { obtenerPersonas } from "../services/personaService";
import { obtenerMascota } from "../services/mascotaServices";
import {
    crearCita ,
    obtenerCitas,
    actualizarCita,
    eliminarCita
} from "../services/citaService";

function Citas() {
    const [citas, setCitas] = useState([]);

    const [fechaHora, setFechaHora] = useState("");
    const [motivo, setMotivo] = useState("");
    const [estado, setEstado] = useState("Pendiente");

    const [mascota, setMascota] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [veterinarioSeleccionado, setVeterinarioSeleccionado] = useState("");

    const [idCita, setIdCita] = useState(null);
    const [editando, setEditando] = useState(false);




    useEffect(() => {
        cargarCitas();
        cargarMascotas();
        cargarPersonas();
        
    }, []);

    const guardarCita = async (e) => {
        e.preventDefault();

        const nuevaCita = {
            fechaHora,
            motivo,
            estado,
            mascota: parseInt(mascota),
            veterinario: parseInt(veterinarioSeleccionado)
        };

        try {
            const respuesta = await crearCita(nuevaCita);
            console.log(respuesta.data);
            alert("Cita creada correctamente");
        } catch (error) {
            console.log(error);
            alert("Error al crear la cita");
        }
    };

    return (
        <form onSubmit={guardarCita}>
            <div>
                <label>Fecha y Hora</label>
                <input
                    type="datetime-local"
                    value={fechaHora}
                    onChange={(e) => setFechaHora(e.target.value)}
                />
            </div>
            <div>
                <label>Motivo</label>
                <input
                    type="text"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                />
            </div>
            <div>
                <label>Estado</label>
                <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />
            </div>
            <div>
                <label>Mascota (ID)</label>
                <input
                    type="number"
                    value={mascota}
                    onChange={(e) => setMascota(e.target.value)}
                />
            </div>
            <div>
                <label>Veterinario</label>
                <select
                    value={veterinarioSeleccionado}
                    onChange={(e) => setVeterinarioSeleccionado(e.target.value)}
                >
                    <option value="">Seleccione un veterinario</option>
                    {veterinarios.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">
                Guardar Cita
            </button>
        </form>

    );

}

export default Citas;