import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { obtenerCitas, crearCita, actualizarCita, eliminarCita } from "../services/citaService"
import { obtenerMascota } from "../services/mascotaServices"
import { obtenerVeterinario } from "../services/personaRolService"

function CitasDos() {
    const [citas, setCitas] = useState([])
    const [mascotas, setMascotas] = useState([])
    const [veterinarios, setVeterinarios] = useState([])
    const [cargando, setCargando] = useState(true)

    const [idCita, setIdCita] = useState(null)
    const [fechaHora, setFechaHora] = useState("")
    const [motivo, setMotivo] = useState("")
    const [estado, setEstado] = useState("")
    const [mascota, setMascota] = useState("")
    const [veterinario, setVeterinario] = useState("")
    const [editando, setEditando] = useState(false)

    useEffect(() => {
        cargarCitas()
        cargarMascotas()
        cargarVeterinario()
    }, [])

    const cargarCitas = async () => {
        setCargando(true)
        try {
        const response = await obtenerCitas()
        setCitas(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar citas:", error?.message)
        } finally {
        setCargando(false)
        }
    }

    const cargarMascotas = async () => {
        try {
        const response = await obtenerMascota()
        setMascotas(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar mascotas:", error?.message)
        }
    }

    const cargarVeterinario = async () => {
        try {
        const response = await obtenerVeterinario()
        setVeterinarios(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar veterinarios:", error?.message)
        }
    }

    const guardarCita = async (e) => {
        e.preventDefault()
        const cita = {
        fechaHora,
        motivo,
        estado,
        mascota: parseInt(mascota),
        veterinario: parseInt(veterinario),
        }

        try {
        if (editando) {
            await actualizarCita(idCita, cita)
        } else {
            await crearCita(cita)
        }
        await cargarCitas()
        limpiarFormulario()
        } catch (error) {
        console.log("[v0] Error al guardar cita:", error?.message)
        alert("Error al guardar la cita")
        }
    }

    const editarCita = (cita) => {
        setIdCita(cita.idCita)
        setFechaHora(cita.fechaHora?.slice(0, 16) ?? "")
        setMotivo(cita.motivo)
        setEstado(cita.estado)
        setMascota(cita.mascota ?? "")
        setVeterinario(cita.veterinario ?? "")
        setEditando(true)
    }

    const eliminar = async (id) => {
        if (!window.confirm("¿Desea eliminar esta cita?")) return
        try {
        await eliminarCita(id)
        await cargarCitas()
        } catch (error) {
        console.log("[v0] Error al eliminar cita:", error?.message)
        alert("No fue posible eliminar")
        }
    }

    const limpiarFormulario = () => {
        setIdCita(null)
        setFechaHora("")
        setMotivo("")
        setEstado("")
        setMascota("")
        setVeterinario("")
        setEditando(false)
    }

    const colorEstado = (e) => {
        if (e === "Atendida") return "bg-success"
        if (e === "Cancelada") return "bg-danger"
        return "bg-warning text-dark"
    }

    return (
        <>
        <Navbar />
        <main className="container py-4">
            <div className="mb-4">
            <h1 className="h3 fw-bold mb-1">Gestión de citas</h1>
            <p className="text-muted mb-0">Agenda y administra las citas de la clínica.</p>
            </div>

            <form onSubmit={guardarCita} className="card border-0 shadow-sm mb-4">
            <div className="card-body">
                <h2 className="h5 fw-bold mb-3">{editando ? "Editar cita" : "Nueva cita"}</h2>
                <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Fecha y hora</label>
                    <input
                    type="datetime-local"
                    className="form-control"
                    value={fechaHora}
                    onChange={(e) => setFechaHora(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Motivo</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Motivo de la cita"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Estado</label>
                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="">Seleccione estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Atendida">Atendida</option>
                    <option value="Cancelada">Cancelada</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Mascota</label>
                    <select className="form-select" value={mascota} onChange={(e) => setMascota(e.target.value)}>
                    <option value="">Seleccione mascota</option>
                    {mascotas.map((m) => (
                        <option key={m.idMascota} value={m.idMascota}>
                        {m.nombreMascota}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Veterinario</label>
                    <select className="form-select" value={veterinario} onChange={(e) => setVeterinario(e.target.value)}>
                    <option value="">Seleccione veterinario</option>
                    {veterinarios.map((v) => (
                        <option key={v.docPersona} value={v.docPersona}>
                        {v.nombre} {v.apellido}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
                <div className="d-flex gap-2 mt-3">
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

            <div className="card border-0 shadow-sm">
            <div className="card-body">
                {cargando ? (
                <p className="text-muted text-center my-4">Cargando citas...</p>
                ) : citas.length === 0 ? (
                <p className="text-muted text-center my-4">No hay citas registradas.</p>
                ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Motivo</th>
                        <th>Estado</th>
                        <th>Mascota</th>
                        <th>Veterinario</th>
                        <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita) => (
                        <tr key={cita.idCita}>
                            <td>{cita.idCita}</td>
                            <td>{new Date(cita.fechaHora).toLocaleString("es-CO")}</td>
                            <td>{cita.motivo}</td>
                            <td>
                            <span className={`badge ${colorEstado(cita.estado)}`}>{cita.estado}</span>
                            </td>
                            <td>{cita.mascotaNombre}</td>
                            <td>{cita.veterinarioNombre}</td>
                            <td className="text-end">
                            <div className="d-inline-flex gap-2">
                                <button className="btn btn-sm btn-outline-success" onClick={() => editarCita(cita)}>
                                Editar
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(cita.idCita)}>
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
        </main>
        <Footer />
        </>
    )
    }

export default CitasDos
