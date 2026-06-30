const fotos = [
    {src:"/Imagenes/Ganjha.jpeg", alt: "Aqui van fotos"},
    {src:"/Imagenes/Minie.jpeg", alt: "Aqui van fotos"},
    {src:"/Imagenes/Luci.jpeg", alt: "Aqui van fotos"},
    {src:"/Imagenes/GanjhaDos.jpeg", alt: "Aqui van fotos"},
    {src:"/Imagenes/MinieDos.jpeg", alt: "Aqui van fotos"},
]

function Galeria() {
    return(
        <section id="galeria" className="vet-section vet-section-alt">
            <div className="container">
                <div className="text-center mb-5">
                    <span className="vet-eyebrow">Galeria</span>
                    <h2>Nuestros peluditos</h2>
                    <p className="lead mx-auto">
                        Aqui veras las historias de nuestros amiguitos.
                    </p>
                </div>
                <div className="row g-4">
                    {fotos.map((f)=>
                    (
                        <div className="col-12 col-sm-6 col-lg-3" key={f.src}>
                            <div className="vet-card">
                            <img src={f.src} alt={f.alt} className="vet-gallery-img shadow-sm"/>
                            <div className="vet-card-body">
                                <h5 className="card-tittle">Titulo</h5>
                                <p className="card">
                                    hola
                                </p>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Galeria