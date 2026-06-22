import { useEffect, useState } from "react";
import {
    obtenerMascota,
    crearMascota,
    actualizarMascota,
    eliminarMascota
} from "../services/mascotaServices";
import { obtenerPersonas} from "../services/personaService";
import { obtenerCliente} from "../services/personaRolService"

function Mascota() {
    const [personas, setPersonas] = useState ([]);
    const [clientes, setClientes] = useState ([]);
    const [mascotas, setMascotas] = useState([]);
    const [idMascota, setIdMascota] = useState(null);
    const [nombreMascota, setNombreMascota] = useState(""); 
    const [especie, setEspecie] = useState(""); 
    const [raza, setRaza] = useState(""); 
    const [fechaNacimiento, setFechaNacimiento] = useState(""); 
    const [dueno, setDueno] = useState("");

    const [editado, setEditando] = useState(false);

    useEffect(() => {
        cargarMascota();
        cargarPersona();
    },[]);

    const cargarPersona = async () => {
        try {
            const response = await obtenerCliente();
            setClientes(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const cargarMascota = async () =>{
        try{
            const response = await obtenerMascota();
            console.log(response.data);
            setMascotas(response.data);
        }
        catch(error){
            console.log(error)
        }
    };

    const limpiarFormulario = () => {
        setIdMascota(null);
        setNombreMascota("");
        setEspecie("");
        setRaza("");
        setFechaNacimiento("");
        setDueno("");

        setEditando(false);
    };

    const guardarMascota = async (e) => {

        e.preventDefault();

        if (
            !nombreMascota ||
            !especie ||
            !raza ||
            !fechaNacimiento ||
            !dueno
        ){
            alert("Todos los campos son obligatorios");
            return
        }

        const mascota = {

            nombreMascota,
            especie,
            raza,
            fechaNacimiento,
            dueño: parseInt(dueno)
        };
        try {
            if (editado){
                await actualizarMascota(
                    idMascota,
                    mascota
                );
                alert ("Mascota Actualizada correctamente");

            } else {
                await crearMascota(
                    mascota
                );
                alert("Mascota registrada correctamente");
            }
            await cargarMascota();
            limpiarFormulario();
        }
        catch (error){
            console.log(mascota);
            alert("Error al guardar mascota");
        }
    };

    const editarMascota = (mascota) => {
        
        setIdMascota(
            mascota.idMascota
        );

        setNombreMascota(
            mascota.nombreMascota
        );

        setEspecie(
            mascota.especie
        );

        setRaza(
            mascota.raza
        );

        setFechaNacimiento(
        mascota.fechaNacimiento?.split("T")[0]
        );

        setDueno(
            mascota.dueño
        );

        setEditando(true);
    };

    const borrarMascota = async (id) => {

        if (!window.confirm(
            "¿Desea eliminar esta mascota?"
        )) return;

        try{
            await eliminarMascota(id);
            cargarMascota();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Gestion de mascota.</h1>
            <form
            className="form-mascota"
            onSubmit={guardarMascota}>
                <input
                type="text"
                placeholder="Nombre"
                value={nombreMascota}
                onChange={(e) => 
                    setNombreMascota(
                        e.target.value
                    )
                }/>
                <input 
                type="text" 
                placeholder="Especie"
                value={especie}
                onChange={(e) =>
                    setEspecie(
                        e.target.value
                    )
                }
                />
                <input 
                type="text"
                placeholder="Raza"
                value={raza}
                onChange={(e) =>
                    setRaza(
                        e.target.value
                    )
                }
                />
                <input 
                type="date" 
                value={fechaNacimiento}
                onChange={(e) => 
                    setFechaNacimiento (
                        e.target.value
                    )
                }
                />
                <select
                className="form-select mb-2"
                value={dueno}
                onChange={(e) =>
                    setDueno(
                        e.target.value
                    )
                }
                >
                    <option value="">
                        Seleccione el dueño
                    </option>
                    {clientes.map
                    ((cliente)=> (
                        <option
                        key={cliente.docPersona}
                        value={cliente.docPersona}
                        >
                            {cliente.nombre}
                        </option>
                    ))
                    }
                </select>
                <button type="submit">
                    {
                        editado
                        ? "Actualizar"
                        : "Guardar"
                    }
                </button>
                {
                    editado && 
                    (
                        <button
                        type="button"
                        onClick={
                            limpiarFormulario
                        }
                        >
                            Cancelar
                        </button>
                    )
                }
            </form>
            
            <hr></hr>
            <table
            className="table table-striped table-hover"
            >
                <thead
                className="table-dark"
                >
                    <tr>
                        <th>Nombre </th>
                        <th>Especie </th>
                        <th>Raza </th>
                        <th>Fecha de nacimiento </th>
                        <th>Dueño </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.map((mascota) => (
                        <tr key={mascota.idMascota}>
                            <td>{mascota.nombreMascota}</td>
                            <td>{mascota.especie}</td>
                            <td>{mascota.raza}</td>
                            <td>{mascota.fechaNacimiento?.split("T")[0]}</td>
                            <td>
                                {clientes.find(
                                    c => c.docPersona === mascota.dueño
                                )?.nombre}
                            </td>
                                <td>
                                    <button
                                    className="btn btn-outline-success btn-sm me-2"
                                    onClick={() =>
                                        editarMascota(
                                            mascota
                                        )
                                    }
                                    >
                                    Editar
                                    </button>
                                    <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        borrarMascota(
                                            mascota.idMascota
                                        )
                                    }
                                    >
                                        Eliminar
                                    </button>
                                </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}

export default Mascota;