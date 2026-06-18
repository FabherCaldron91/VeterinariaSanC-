import { Link } from "react-router-dom";

function Navbar() {
    return(
        <header className="navbar">
            <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="logo">
                    veterinaria San Martin
                </div>
                <div class="container">
                    <img src="public/Favicon.svg" alt="Bootstrap" width="30" height="24"></img>
                    <ul>
                        <Link to="/">
                            Inicio  
                        </Link>
                        <Link to="/personas">
                            Personas  
                        </Link>
                        <Link to="/mascotas">
                            Mascotas
                        </Link>
                        <Link to="/citasdos">
                            Citas
                        </Link>
                        <Link to="/login">
                        iniciar secion
                        </Link> 
                        <Link to="/rol">
                        Roles
                        </Link>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;