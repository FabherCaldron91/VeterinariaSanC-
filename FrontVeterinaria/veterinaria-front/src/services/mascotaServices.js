import api from "../api/api";

export const obtenerMascota = async () => {
    return await api.get("/Mascota")
}

export const crearMascota = async (mascota) => {

    return await api.post("/Mascota/Crear", mascota);
} ;

export const actualizarMascota = async (id, mascota) => {

    return await api.put(`/Mascota/Actualizar/${id}`, mascota);
};

export const eliminarMascota = async (id) => {

    return await api.delete(`/Mascota/Eliminar/${id}`);
};

