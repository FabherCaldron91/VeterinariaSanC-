const contactos = [
    {icon: "📞", titulo: "Telefono", dato: "321654987"},
    {icon: "✉️", titulo: "Email", dato: "Veterinaria@sanmartin.com"},
    {icon: "📍", titulo: "Dirrecio", dato: "Bogota, Colombia"},
]

function Contactos() {
    return(
        <section
        id="contacto"
        className="vet-section">
            <div className="container">
                <div className="text-center mb-5">
                    <span className="vet-eyebrow">
                        Estamos para ayudarte con tus peluditos 
                        'aunque suene sexual'
                    </span>
                    <h2>Contactenos</h2>
                    <p className="lead mx-auto">
                        Escribenos o visitanos, con gusto atenderemosa a tus mascotas.
                    </p>
                </div>
                <div className="row g-4 justify-content-center">
                    {contactos.map((c) => (
                        <div className="col-12 col-md-4" key={c.titulo}>
                            <div className="vet-contact-card text-center">
                                <div className="vet-contact-icon">{c.icon}</div>
                                <h3 className="h5 fw-bold">{c.titulo}</h3>
                                <p className="mb-0 text-muted">{c.dato}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Contactos