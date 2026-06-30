import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { obtenerPersonas, actualizarPersona, eliminarPersona } from "../services/personaService"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Personas() {
    const navigate = useNavigate()

    const [personas, setPersonas] = useState([])
    const [cargando, setCargando] = useState(true)

    const [docPersona, setDocPersona] = useState("")
    const [tipoDoc, setTipoDoc] = useState("")
    const [nombres, setNombres] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")

    const [editando, setEditando] = useState(false)

    useEffect(() => {
        cargarPersonas()
    }, [])

    const cargarPersonas = async () => {
        setCargando(true)
        try {
        const response = await obtenerPersonas()
        setPersonas(response.data)
        } catch (error) {
        console.log("[v0] Error al cargar personas:", error?.message)
        } finally {
        setCargando(false)
        }
    }

    const editarPersona = (persona) => {
        setDocPersona(persona.docPersona)
        setTipoDoc(persona.tipoDoc)
        setNombres(persona.nombres)
        setApellidos(persona.apellidos)
        setEmail(persona.email)
        setTelefono(persona.telefono)
        setUsuario(persona.usuario)
        setPassword("")
        setEditando(true)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        try {
        await actualizarPersona(docPersona, {
            tipoDoc,
            nombres,
            apellidos,
            email,
            telefono,
            usuario,
            password,
        })
        await cargarPersonas()
        limpiar()
        } catch (error) {
        console.log("[v0] Error al actualizar persona:", error?.message)
        alert("No fue posible actualizar la persona.")
        }
    }

    const eliminar = async (doc) => {
        if (!window.confirm("¿Eliminar persona?")) return
        try {
        await eliminarPersona(doc)
        await cargarPersonas()
        } catch (error) {
        console.log("[v0] Error al eliminar persona:", error?.message)
        }
    }

    const limpiar = () => {
        setDocPersona("")
        setTipoDoc("")
        setNombres("")
        setApellidos("")
        setEmail("")
        setTelefono("")
        setUsuario("")
        setPassword("")
        setEditando(false)
    }

    return (
        <>
        <Navbar />
        <main className="container py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div>
                <h1 className="h3 fw-bold mb-1">Gestión de personas</h1>
                <p className="text-muted mb-0">Administra los usuarios registrados en la clínica.</p>
            </div>
            <button className="btn vet-btn-primary" onClick={() => navigate("/personas/crear")}>
                + Nueva persona
            </button>
            </div>

            <div className="card border-0 shadow-sm">
            <div className="card-body">
                {cargando ? (
                <p className="text-muted text-center my-4">Cargando personas...</p>
                ) : personas.length === 0 ? (
                <p className="text-muted text-center my-4">No hay personas registradas.</p>
                ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Usuario</th>
                        <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((persona) => (
                        <tr key={persona.docPersona}>
                            <td>{persona.docPersona}</td>
                            <td>{persona.nombres}</td>
                            <td>{persona.apellidos}</td>
                            <td>{persona.usuario}</td>
                            <td className="text-end">
                            <div className="d-inline-flex gap-2">
                                <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => navigate(`/personas/${persona.docPersona}/roles`)}
                                >
                                Roles
                                </button>
                                <button
                                type="button"
                                className="btn btn-sm btn-outline-success"
                                onClick={() => editarPersona(persona)}
                                >
                                Editar
                                </button>
                                <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => eliminar(persona.docPersona)}
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

            {editando && (
            <form onSubmit={actualizar} className="card border-0 shadow-sm mt-4">
                <div className="card-body">
                <h2 className="h5 fw-bold mb-3">Editar persona</h2>
                <div className="row g-3">
                    <div className="col-md-4">
                    <label className="form-label">Tipo de documento</label>
                    <input className="form-control" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                    <label className="form-label">Nombres</label>
                    <input className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                    <label className="form-label">Apellidos</label>
                    <input className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                    <label className="form-label">Teléfono</label>
                    <input className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                    <label className="form-label">Usuario</label>
                    <input className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                    <label className="form-label">Nueva contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Dejar en blanco para no cambiar"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                    <button type="submit" className="btn vet-btn-primary">
                    Actualizar
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={limpiar}>
                    Cancelar
                    </button>
                </div>
                </div>
            </form>
            )}
        </main>
        <Footer />
        </>
    )
    }

export default Personas
