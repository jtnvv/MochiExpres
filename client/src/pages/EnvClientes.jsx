import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloEnvCliente from "./ModuloEnvCliente"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
import {mensajeExito} from "../components/mensajesAlerta.js";

export const envioSeleccionado = [];


function EnvClientes() {
    const { currentUser } = useContext(AuthContext);
    const [EnvCliente, setEnvCliente] = useState([]);
    const { getEnviosCliente } = useContext(AuthContext);
    const [identificador, setIdentificador] = useState({
        idenvio: "",
    });
    const { deleteEnvioId } = useContext(AuthContext);
    const [enviosList, setEnvios] = useState([]);

    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);


    const currentEnvio = (envio) => {
        envioSeleccionado.pop();
        envioSeleccionado.push(envio);
    }

    useEffect(() => {
        const obtenerEnvios = async () => {
            try {
                const res = await getEnviosCliente(currentUser.idusuario);
                setEnvCliente(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerEnvios();
    }, [currentUser.idusuario]);


    // useEffect(() => {
    //     console.log("Aqui esta la respuesta");
    //     console.log(repartidoresList);
    // }, [repartidoresList]);

    const [divStyle, setDivStyle] = useState({});
    const [clicked, setClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [clickedModal, setClickedModal] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (!clicked) {
            setDivStyle({ visibility: 'visible' });
        } else {
            setDivStyle({ visibility: 'hidden' });
        }
        setClicked(!clicked);
    };
    const showModal = (idEnvio) => {
        if (!clickedModal) {
            setModalStyle({ visibility: 'visible' });
            console.log(idEnvio);
            setIdentificador({ idenvio: idEnvio });
            console.log("k ", identificador.idenvio);
        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };

    const handleEliminarEnvCliente = async (e) => {
        try {
            console.log("Identificador: ", identificador.idenvio);
            if (identificador.idenvio !== null) {
                const res = await deleteEnvioId(identificador.idenvio);
                console.log("Ha salido bien :D", res);
                mensajeExito("Se ha eliminado correctamente el envio ", identificador.idenvio);
            }
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        console.log(EnvCliente),
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Envíos </h3>
                            <button className="buttonEnviosClienteStyle" onClick={handleButtonClick}>
                               Eliminar  <HiOutlineTrash className="IconColor" />
                            </button>
                        </div>
                        <div className="containerBusquedaRepartidor containerBusquedaEnvClientes">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar envio" />
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="lista">
                        {
                            EnvCliente.map((enviosele) => {
                                // Filtra los envíos asociados a la solicitud del usuario actual
                                return (
                                    <React.Fragment key={enviosele.idenvio}>
                                        <div className="ModuloRepartidorContainer">
                                        <div className="eliminarModulo" onClick={() => showModal(enviosele.idenvio)} style={divStyle}>X</div>
                                            <Link to="/EnvClientesInfo" onClick={() => currentEnvio(enviosele)} style={{ textDecoration: 'none' }}>
                                                <ModuloEnvCliente idenvio={enviosele.idenvio} />
                                            </Link>
                                        </div>
                                        <div className="modalEliminarRepartidorContenedor" style={modalStyle}>
                                            <div className="containerModalEliminarRepartidor2">
                                                <div className="eliminarModalRepartidor" onClick={() => showModal(enviosele.idenvio)}>X</div>
                                                <div className="modalEliminarRepartidor">
                                                    <h3>¿Estás seguro de eliminar el envío?</h3>
                                                    <p>Al eliminar tu envío la entrega no se podrá hacer</p>
                                                    <button onClick={handleEliminarEnvCliente}>Eliminar</button>
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
export default EnvClientes;