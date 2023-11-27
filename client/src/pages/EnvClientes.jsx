import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloEnvCliente from "./ModuloEnvCliente"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
export const envioSeleccionado = [];


function EnvClientes() {
    const { currentUser } = useContext(AuthContext);
    const [EnvCliente, setEnvCliente] = useState([]);
    const { getSolicitudIdCliente } = useContext(AuthContext);
    const [identificador, setIdentificador] = useState({
        idsolicitudenvio: ""
    });
    const { deleteEnvCliente } = useContext(AuthContext);
    const [enviosList, setEnvios] = useState([]);
    const { getEnvios } = useContext(AuthContext);

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
                const res = await getEnvios();
                console.log(res);
                setEnvios(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerEnvios();
    }, []);

    useEffect(() => {
        const obtenerSolicitudes = async () => {
            try {
                const res = await getSolicitudIdCliente(currentUser.idusuario);
                setEnvCliente(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerSolicitudes();
    }, [currentUser.idusuario]);



    useEffect(() => {

    }, [EnvCliente]);
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
    const showModal = (idsolicitudenvio) => {
        if (!clickedModal) {
            setModalStyle({ visibility: 'visible' });
            console.log(idsolicitudenvio);
            setIdentificador({ idsolicitudenvio: idsolicitudenvio });
            console.log(identificador);
        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };

    const handleEliminarEnvCliente = async (e) => {
        try {
            console.log("Identificador: ", identificador);
            if (identificador.idsolicitudenvio !== null) {
                const res = await deleteEnvCliente(identificador.idsolicitudenvio);
                console.log("Ha salido bien :D", res);
                window.location.reload();
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
                            EnvCliente.map((solicitud) => {
                                // Filtra los envíos asociados a la solicitud del usuario actual
                                const enviosUsuarioActual = enviosList.filter(envio => envio.idsolicitudenvio === solicitud.idsolicitudenvio);

                                return enviosUsuarioActual.map((val) => (
                                    <React.Fragment key={val.idenvio}>
                                        <div className="ModuloRepartidorContainer">
                                        <div className="eliminarModulo" onClick={() => showModal(val.idsolicitudenvio)} style={divStyle}>X</div>
                                            <Link to="/EnvClientesInfo" onClick={() => currentEnvio(val)} style={{ textDecoration: 'none' }}>
                                                <ModuloEnvCliente idenvio={val.idenvio} />
                                            </Link>
                                        </div>
                                        <div className="modalEliminarRepartidorContenedor" style={modalStyle}>
                                            <div className="containerModalEliminarRepartidor2">
                                                <div className="eliminarModalRepartidor" onClick={() => showModal(val.idsolicitudenvio)}>X</div>
                                                <div className="modalEliminarRepartidor">
                                                    <h3>¿Estás seguro de eliminar el envío?</h3>
                                                    <p>Al eliminar tu envío la entrega no se podrá hacer</p>
                                                    <button onClick={handleEliminarEnvCliente}>Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ));
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EnvClientes;