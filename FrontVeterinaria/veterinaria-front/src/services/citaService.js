import api from "../api/api";

export const obtenerCitas = () => {

    return api.get("/cita");
};

export const crearCita = (cita) => {
    return api.post("/Cita/crear", cita);
};

export const actualizarCita = async (idCita, cita) => {
    return await api.put(`/Cita/Actualizar/${idCita}`,cita);
};

export const eliminarCita = async (idCita) => {
    return await api.delete(`/Cita/Eliminar/${idCita}`);
};
