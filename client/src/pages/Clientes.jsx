import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ModuloClientes from "./ModuloClientes";
import { AuthContext } from "../context/authContext";
import { mensajeError, mensajeExito } from "../components/mensajesAlerta.js";
export const clienteSeleccionado = [];

function Clientes() {

    const [clientesList, setClientes] = useState([])
    const { getClientes } = useContext(AuthContext);
    const { deleteCliente } = useContext(AuthContext);

    const [identificador, setIdentificador] = useState({
        idCliente: ""
    });

    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);

    const currentCliente = (Client) => {
        clienteSeleccionado.pop();
        clienteSeleccionado.push(Client)

    }

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const res = await getClientes();
                setClientes(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerClientes();
    }, [])

    const [divStyle, setDivStyle] = useState({});
    const [clicked, setClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [clickedModal, setClickedModal] = useState(false);


    const handleButtonClick = () => {
        if (!clicked) {
            setDivStyle({ visibility: 'visible' });
        } else {
            setDivStyle({ visibility: 'hidden' });
        }
        setClicked(!clicked);
    };
    const showModal = (idCliente) => {
        if (!clickedModal) {
            setModalStyle({ visibility: 'visible' });
            console.log(idCliente);
            setIdentificador({ idCliente: idCliente });
            console.log(identificador);
        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };

    const handleEliminarCliente = async (e) => {
        //e.preventDefault();
        try {
            console.log("Identificador: ", identificador);
            if (identificador.idCliente !== null) {
                const res = await deleteCliente(identificador.idCliente);
                console.log("Ha salido bien :D ", res);
                mensajeExito("Cliente eliminado exitosamente");
            } else {
                console.log("Ha salido mal :c ");
                mensajeError("No se pudo eliminar el cliente");
            }
        } catch (err) {
            setError(err.response.data);
        }

    }


    return (

        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Clientes</h3>
                            <button className="buttonRepartidorStyle" onClick={handleButtonClick}>Eliminar Cliente</button>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Cliente" />
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="lista">{
                        clientesList.map((val) => {
                            return (
                                <React.Fragment key={val.idCliente}>
                                    <div className="ModuloRepartidorContainer">
                                        <div className="eliminarModulo" onClick={() => showModal(val.idCliente)} style={divStyle}>X</div>

                                        <Link to="/ClientesInfo" onClick={() => currentCliente(val)} style={{ textDecoration: 'none' }}>
                                            <ModuloClientes nombre={val.nombrecliente} />
                                        </Link>
                                    </div>

                                    <div className="modalEliminarRepartidorContenedor" style={modalStyle}>
                                        <div className="containerModalEliminarRepartidor2">
                                            <div className="eliminarModalRepartidor" onClick={() => showModal(val.idCliente)}>X</div>
                                            <div className="modalEliminarRepartidor">
                                                <h3>¿Estás seguro de eliminar al cliente?</h3>
                                                <p>Al eliminar al cliente, sus solicitudes y envíos serán eliminados</p>
                                                <button onClick={handleEliminarCliente}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>

                            );
                        })
                    }
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Clientes;
