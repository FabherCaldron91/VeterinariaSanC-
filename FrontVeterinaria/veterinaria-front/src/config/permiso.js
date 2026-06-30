export const Modulos = {
    PERSONAS: "personas",
    MASCOTAS: "mascotas",
    CITAS: "citas",
    ROLES: "roles",
}

export const PermisosPorRol = {
    Administrador: [Modulos.PERSONAS, Modulos.MASCOTAS, Modulos.CITAS, Modulos.ROLES],
    Veterinario: [Modulos.CITAS, Modulos.MASCOTAS],
    Cliente: [Modulos.CITAS, Modulos.MASCOTAS]
}

export const RutaInicioRol = {
    Administrador: "/personas",
    Veterinario: "/citasdos",
    Cliente: "/citasdos"
}

export function modulosPermitido(roles = []) {
    const permitidos = new Set()
    roles.forEach((rol)=> {
        const modulos = PermisosPorRol[rol] || []
        modulos.forEach((m)=> permitidos.add(m))
    })
    return permitidos
}

export function puedeAcceder(roles = [], modulo) {
    if (!modulo) return true
    return modulosPermitido(roles).has(modulo)
}

export function rutaInicio(roles = []) {
    if (roles.includes("Administrador")) return RutaInicioRol.Administrador
    if (roles.includes("Veterinario")) return RutaInicioRol.Veterinario
    if (roles.includes("Cliente")) return "/"
    return "/"
}