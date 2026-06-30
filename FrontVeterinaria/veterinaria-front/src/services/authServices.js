import api from "../api/api";

const ClaveSesion = "vetUsuario"

export const login = async(usuario, password) => {
    const {data} = await api.post("/Auth/Login", {usuario, password})
    return data
}

export const guardarSesion = (usuario) => {
    sessionStorage.setItem(ClaveSesion, JSON.stringify(usuario))
}

export const obtenerSesion =() => {
    try {
        const raw = sessionStorage.getItem(ClaveSesion)
        return raw ? JSON.parse(raw) : null
    }
    catch {
        return null
    }
}

export const cerrarSesion =() => {
    sessionStorage.removeItem(ClaveSesion)
}