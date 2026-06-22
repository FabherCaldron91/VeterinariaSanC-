import { Link } from "react-router-dom"

function Hero() {
    return(
        <section className="vet-hero">
            <div className="container">
                <div className="row aling-items-center g-5">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1>
                            Cuidamos a los que mas amas.
                        </h1>
                        <p>
                            Atencion veterinaria profecional para perros, gatos
                            y mascotas extoticas.
                            Tu mejor amigo merece el mejhor cuidado.
                        </p>
                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center
                        justify-content-lg-start">
                            <Link to="/citasdos" className="btn vet-btn-accent btn-outline-success">
                            Agendar cita
                            </Link>
                            <a href="#servicios" className="btn btn-outline-light btn-lg rounded-3">
                                Ver servicios
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img src="/public/Logo.png" alt="Meter imagen aqui nose de que "  className="img-fluid rounded-4 shadow-lg"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;