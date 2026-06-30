function Nosotros() {
    return(
        <section
        id="nosotros"
        className="vet-section vet-section-alt">
            <div
            className="container"
            >
                <div
                className="row aling-items-center g-5"
                >
                    <div className="col-lg-6">
                        <img src="/Imagenes/Veterinarios.png" alt="Veterinarios" 
                        className="img-fluid rounded-4 shadow-sm"
                        />
                    </div>
                    <div className="col-lg-6">
                        <span
                        className="vet-eyebrow">
                            ¿Quienes somoas?
                        </span>
                        <h2>
                            Una clinica dedicada al bienestar animal
                        </h2>
                        <p
                        className="lead">
                            Somo una clinica veterinaria dedicada 
                            al cuidado integral de las mascotas, 
                            brindando atencio medica de calidad con un equipo
                            profesional y comprometido.
                        </p>
                        <ul
                        className="list-unstyled mt-3">
                            <li className="mb-2">
                                <span
                                className="me-2 fw-bold" style={{ 
                                    color: "var(--vet-primary)"}}>
                                    ✓
                                </span>
                                Atencion personalizada y cerca de ti.
                            </li>
                            <li className="mb-2">
                                <span 
                                className="me-2 fw-bold"
                                style={{
                                    color: "var(--vet-primary)"}}>
                                    ✓
                                </span>
                                Equipo Medico con alta experiencia.
                            </li>
                            <li className="mb-2">
                                <span
                                className="me-2 fw-bold"
                                style={{
                                    color : "var(--vet-primary)"
                                }}
                                >
                                    ✓
                                </span>
                                Tecnologia moderna.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Nosotros;