import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Personas from './pages/Personas';
import Home from './pages/Home';
import Mascota from './pages/Mascota';
import Citas from './pages/Citas';
import Roles from './pages/Roles';
import CitasDos from './pages/CitasDos';
import CrearPersona from "./pages/CrearPersona";
import PersonaRoles from "./pages/PersonaRoles";
import Personasdos from './pages/Personasdos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
return (
    <BrowserRouter>
        <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/personas' element={<Personas />} />
        <Route path='/mascotas' element={<Mascota />} />
        <Route path='/citasdos' element={<CitasDos />} />
        <Route path='/rol' element= {<Roles />} />
        <Route path='/personas/:docPersona/roles' element={<PersonaRoles />} />
        <Route path="/personas/crear" element={<CrearPersona />} />
        <Route path="/personas/:docPersona/roles"element={<PersonaRoles />} />
    </Routes>
        <Footer />
    </BrowserRouter>
)
}

export default App;
