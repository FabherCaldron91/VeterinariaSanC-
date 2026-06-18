import api from "../api/api";

export const obtenerCliente = async () => {
    return await api.get("/PersonaRol/Clientes");
};

export const obtenerVeterinario = async () => {
    return await api.get("/PersonaRol/Veterinarios");
};

export const obtenerAdministrador = async () => {
    return await api.get("/PersonaRol/Administradores");
};

export const obtenerPersonaRoles = async () => {
    return await api.get("/PersonaRol");
};

export const crearPersonaRol = async (personaRol) => {
    return await api.post("/PersonaRol/Crear", personaRol);
};

export const eliminarPersonaRol = async (idPersonaRol) => {
    return await api.delete(`/PersonaRol/Eliminar/${idPersonaRol}`);
};