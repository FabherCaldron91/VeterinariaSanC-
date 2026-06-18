import api from "../api/api";

export const obtenerRol = async () => {

    return await api("/Rol")
};