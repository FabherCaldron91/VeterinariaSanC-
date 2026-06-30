import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authServices";
import {puedeAcceder, rutaInicio } from "../config/permiso" 

const AuthContext = createContext(null)

export function AuthProvider({children}) {
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const sesion = authService.obtenerSesion()
        if (sesion) setUsuario(sesion)
        setCargando(false)
    }, [])

    const iniciarSesion = async (nombreUsuario, password) => {
        const data = await authService.login(nombreUsuario, password)
        const roles = Array.isArray(data.roles) ? data.roles : []
        const usuarioNormalizado = {...data, roles}
        authService.guardarSesion(usuarioNormalizado)
        setUsuario(usuarioNormalizado)
        return usuarioNormalizado
    }

    const cerrarSesion = () => {
        authService.cerrarSesion()
        setUsuario(null)
    }

    const roles = usuario?.roles ?? []

    const valor = {
        usuario,
        roles,
        cargando,
        autenticado: !!usuario,
        iniciarSesion,
        cerrarSesion,
        tienePermiso: (modulo) => puedeAcceder(roles, modulo),
        tieneRol: (rol) => roles.includes(rol),
        rutaInicio: () => rutaInicio(roles)
    }

    return <AuthContext.Provider value={valor}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error("useAuth debe usarser dentro de <AuthContext.Provider>")
    }
    return ctx
}