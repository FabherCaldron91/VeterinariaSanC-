const servicios = [
    {icon: "🩺", titulo: "Consulta general",desc: "Revisiones completas para mantener a tu mascota sana y feliz.",},
    {icon: "💉", titulo: "Vacunación", desc: "Planes de vacunación al día para prevenir enfermedades.",},
    {icon: "🔬", titulo: "Cirugía", desc: "Procedimientos quirúrgicos con equipo y personal especializado.",
    },
    {icon: "🏥", titulo: "Hospitalización", desc: "Cuidado y monitoreo permanente para una pronta recuperación.",
    },
]

function Servicios(){
    return(
        <section id="servicios" className="vet-section">
            <div className="container">
                <div className="text-center mb-5">
                    <span className="vet-eyebrow">
                        Lo qie ofrecemos
                    </span>
                    <p className="lead mx-auto">
                        Cuidado completo en cada etapa de la vida de tu mascota.
                    </p>
                </div>
                <div className="row g-4">
                    {servicios.map((s) => (
                        <div className="col-12 col-sm-6 col-lg-3" key={s.titulo}>
                            <div className="vet-service-card text-center text-sm-start">
                                <div className="vet-service-icon mx-auto mx-sm-0">{s.icon}</div>
                                <h3>{s.titulo}</h3>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Servicios