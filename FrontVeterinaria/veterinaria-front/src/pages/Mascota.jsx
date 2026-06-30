import { useEffect, useState } from "react"
import {
    obtenerMascota,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
} from "../services/mascotaServices"
import { obtenerCliente } from "../services/personaRolService"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Mascota() {
    const [clientes, setClientes] = useState([])
    const [mascotas, setMascotas] = useState([])
    const [cargando, setCargando] = useState(true)

    const [idMascota, setIdMascota] = useState(null)
    const [nombreMascota, setNombreMascota] = useState("")
    const [especie, setEspecie] = useState("")
    const [raza, setRaza] = useState("")
    const [fechaNacimiento, setFechaNacimiento] = useState("")
    const [dueno, setDueno] = useState("")

    const [editando, setEditando] = useState(false)

    useEffect(() => {
        cargarMascota()
        cargarClientes()
    }, [])

    const cargarClientes = async () => {
        try {
        const response = await obtenerCliente()
        setClientes(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar clientes:", error?.message)
        }
    }

    const cargarMascota = async () => {
        setCargando(true)
        try {
        const response = await obtenerMascota()
        setMascotas(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar mascotas:", error?.message)
        } finally {
        setCargando(false)
        }
    }
    const nombreDueno = (doc) => {
        const cliente = clientes.find((c) => c.docPersona === doc)
        return cliente ? `${cliente.nombres} ${cliente.apellidos ?? ""}`.trim() : "Sin Dueño"
    }
    const limpiarFormulario = () => {
        setIdMascota(null)
        setNombreMascota("")
        setEspecie("")
        setRaza("")
        setFechaNacimiento("")
        setDueno("")
        setEditando(false)
    }
    const guardarMascota = async (e) => {
        e.preventDefault()
        if (!nombreMascota.trim() || 
            !especie.trim() || 
            !raza.trim() || 
            !fechaNacimiento ||
            !dueno) {
        alert("Todos los campos son obligatorios")
        return
        }
        const mascota = {
        nombreMascota,
        especie,
        raza,
        fechaNacimiento,
        dueño: parseInt(dueno),
        }
        try {
        if (editando) {
            await actualizarMascota(idMascota, mascota)
        } else {
            await crearMascota(mascota)
        }
        await cargarMascota()
        limpiarFormulario()
        } catch (error) {
        console.log("[v0] Error al guardar mascota:", error?.message)
        alert("Error al guardar mascota")
        }
    }
    const editarMascota = (mascota) => {
        setIdMascota(mascota.idMascota)
        setNombreMascota(mascota.nombreMascota)
        setEspecie(mascota.especie)
        setRaza(mascota.raza)
        setFechaNacimiento(mascota.fechaNacimiento?.split("T")[0] ?? "")
        setDueno(mascota.dueño ?? "")
        setEditando(true)
    }
    const borrarMascota = async (id) => {
        if (!window.confirm("¿Desea eliminar esta mascota?")) return
        try {
        await eliminarMascota(id)
        await cargarMascota()
        } catch (error) {
        console.log("[v0] Error al eliminar mascota:", error?.message)
        }
    }
    return (
        <>
        <Navbar />
        <main className="container py-4">
            <div className="mb-4">
            <h1 className="h3 fw-bold mb-1">Gestión de mascotas</h1>
            <p className="text-muted mb-0">Registra y administra las mascotas de tus clientes.</p>
            </div>
            <div className="row g-4">
            <div className="col-lg-4">
                <form onSubmit={guardarMascota} className="card border-0 shadow-sm">
                <div className="card-body">
                    <h2 className="h5 fw-bold mb-3">{editando ? "Editar mascota" : "Nueva mascota"}
                    </h2>
                    <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de la mascota"
                        value={nombreMascota}
                        onChange={(e) => setNombreMascota(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Especie</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Perro, gato, etc."
                        value={especie}
                        onChange={(e) => setEspecie(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Raza</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Raza"
                        value={raza}
                        onChange={(e) => setRaza(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Dueño</label>
                    <select className="form-select" value={dueno} onChange={(e) => setDueno(e.target.value)}>
                        <option value="">Seleccione el dueño</option>
                        {clientes.map((cliente) => (
                        <option key={cliente.docPersona} value={cliente.docPersona}>
                            {cliente.nombre}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div className="d-flex gap-2">
                    <button type="submit" className="btn vet-btn-primary">
                        {editando ? "Actualizar" : "Guardar"}
                    </button>
                    {editando && (
                        <button type="button" className="btn btn-outline-secondary" onClick={limpiarFormulario}>
                        Cancelar
                        </button>
                    )}
                    </div>
                </div>
                </form>
            </div>

            <div className="col-lg-8">
                <div className="card border-0 shadow-sm">
                <div className="card-body">
                    {cargando ? (
                    <p className="text-muted text-center my-4">Cargando mascotas...</p>
                    ) : mascotas.length === 0 ? (
                    <p className="text-muted text-center my-4">No hay mascotas registradas.</p>
                    ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Raza</th>
                            <th>Nacimiento</th>
                            <th>Dueño</th>
                            <th className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mascotas.map((mascota) => (
                            <tr key={mascota.idMascota}>
                                <td>{mascota.nombreMascota}</td>
                                <td>{mascota.especie}</td>
                                <td>{mascota.raza}</td>
                                <td>{mascota.fechaNacimiento?.split("T")[0]}</td>
                                <td>{mascota.dueñoNombre}</td>
                                <td className="text-end">
                                <div className="d-inline-flex gap-2">
                                    <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => editarMascota(mascota)}
                                    >
                                    Editar
                                    </button>
                                    <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => borrarMascota(mascota.idMascota)}
                                    >
                                    Eliminar
                                    </button>
                                </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </main>
        <Footer />
        </>
    )
    }

export default Mascota
