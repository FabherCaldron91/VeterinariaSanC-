import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Nosotros from "../components/Nosotros";
import Servicios from "../components/Servicios";
import Estadisticas from "../components/Estadisticas";
import Contactos from "../components/Contacto";
import Footer from "../components/Footer";
import Galeria from "../components/Galeria";

function Home(){

    return(
        <>
        <Navbar />
        <Hero />
        <Nosotros />
        <Servicios />
        <Estadisticas />
        <Galeria/>
        <Contactos />
        <Footer />
        </>
    );
}

export default Home;