import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { crearCita } from "../services/citaService"
import { obtenerMascota } from "../services/mascotaServices"
import { obtenerVeterinario } from "../services/personaRolService"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Citas() {
    const navigate = useNavigate()

    const [mascotas, setMascotas] = useState([])
    const [veterinarios, setVeterinarios] = useState([])

    const [fechaHora, setFechaHora] = useState("")
    const [motivo, setMotivo] = useState("")
    const [estado, setEstado] = useState("Pendiente")
    const [mascota, setMascota] = useState("")
    const [veterinario, setVeterinario] = useState("")
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        cargarMascotas()
        cargarVeterinarios()
    }, [])

    const cargarMascotas = async () => {
        try {
        const response = await obtenerMascota()
        setMascotas(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar mascotas:", error?.message)
        }
    }

    const cargarVeterinarios = async () => {
        try {
        const response = await obtenerVeterinario()
        setVeterinarios(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar veterinarios:", error?.message)
        }
    }

    const guardarCita = async (e) => {
        e.preventDefault()

        if (!fechaHora || !motivo || !mascota || !veterinario) {
        alert("Completa todos los campos para agendar la cita.")
        return
        }

        setGuardando(true)
        try {
        await crearCita({
            fechaHora,
            motivo,
            estado,
            mascota: parseInt(mascota),
            veterinario: parseInt(veterinario),
        })
        alert("Cita agendada correctamente")
        navigate("/citasdos")
        } catch (error) {
        console.log("[v0] Error al crear la cita:", error?.message)
        alert("Error al crear la cita")
        } finally {
        setGuardando(false)
        }
    }


    return (
        <>
        <Navbar />
        <main className="container py-4">
            <div className="mb-4">
            <h1 className="h3 fw-bold mb-1">Agendar una cita</h1>
            <p className="text-muted mb-0">Programa una nueva cita para tu mascota.</p>
            </div>

            <form onSubmit={guardarCita} className="card border-0 shadow-sm mx-auto" style={{ maxWidth: "640px" }}>
            <div className="card-body">
                <div className="mb-3">
                <label className="form-label">Fecha y hora</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={fechaHora}
                    onChange={(e) => setFechaHora(e.target.value)}
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Motivo</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Motivo de la consulta"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                />
                </div>

                <div className="mb-3">
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

                <div className="mb-4">
                <label className="form-label">Veterinario</label>
                <select className="form-select" value={veterinario} onChange={(e) => setVeterinario(e.target.value)}>
                    <option value="">Seleccione un veterinario</option>
                    {veterinarios.map((v) => (
                    <option key={v.docPersona} value={v.docPersona}>
                        {v.nombres} {v.apellidos}
                    </option>
                    ))}
                </select>
                </div>

                <button type="submit" className="btn vet-btn-primary w-100" disabled={guardando}>
                {guardando ? "Agendando..." : "Agendar cita"}
                </button>
            </div>
            </form>
        </main>
        <Footer />
        </>
    )
    }

export default Citas
