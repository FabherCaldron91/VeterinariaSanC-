import api from "../api/api";

export const obtenerPersonas = async () => {
    return await api.get("/Persona");
};

export const buscarPersonaDoc = async (DocPersona) => {

    return await api.get(`/Persona/Listar/${DocPersona}`)
}

export const CrearPersonas = async (persona) => {
    return await api.post("/Persona/Crear", persona);
};

export const actualizarPersona = async (DocPersona, persona) => {
    return await api.put(`/Persona/Actualizar/${DocPersona}`, persona)
}

export const eliminarPersona = async (DocPersona) => {

    return await api.delete(`/Persona/Eliminar/${DocPersona}`)
}

