const stadis = [
    {numero: "500+", label: "Mascotas atendidas."},
    {numero: "10+", label: "Veterinarios."},
    {numero: "15+", label: "Años de experiencia."},
    {numero: "100%", label: "Clienmtes safifechos."},
]

function Estadisticas () {
    return(
        <section className="vet-section vet-stadis">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="text-white">
                        Nuestros numero
                    </h2>
                </div>
                <div className="row g-4 text-center">
                    {stadis.map((s) =>
                    (
                        <div className="col-6 col-lg-3" key={s.label}>
                            <p className="vet-stadis-number">{s.numero}</p>
                            <p className="vet-stadis-label">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Estadisticas
