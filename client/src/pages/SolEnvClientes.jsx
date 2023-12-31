import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloSolEnvCliente from "./ModuloSolEnvCliente"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from '../img/Mochi.jpeg';
export const SolEnvClienteSeleccionado = [];


function SolEnvClientes() {
    const { currentUser } = useContext(AuthContext);
    const [SolEnvCliente, setSolEnvCliente] = useState([]);
    const { getSolicitudIdCliente } = useContext(AuthContext);
    const { deleteSolEnvCliente } = useContext(AuthContext);
    //const { repartidores } = useContext(AuthContext);
    const [identificador, setIdentificador] = useState({
        idsolicitudenvio: ""
    });

    // useEffect(() => {
    //     console.log(identificador);
    // }, [identificador]);

    const [err, setError] = useState(null);

    const currentSolicitud = (solicitud) => {
        SolEnvClienteSeleccionado.pop();
        SolEnvClienteSeleccionado.push(solicitud);

    }

    useEffect(() => {
        const obtenerSolicitudes = async () => {
            try {
                const res = await getSolicitudIdCliente(currentUser.idusuario);
                setSolEnvCliente(res);

            } catch (err) {
                console.log(err);
            }
        };
        obtenerSolicitudes();
    }, []);



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

    const handleEliminarSolEnvCliente = async (e) => {
        try {
            console.log("Identificador: ", identificador);
            if (identificador.idsolicitudenvio !== null) {
                const res = await deleteSolEnvCliente(identificador.idsolicitudenvio);
                console.log("Ha salido bien :D", res);
                window.location.reload();
            }
        } catch (err) {
            setError(err.response.data);
        }
    }
    const handleRedirect = () => { navigate("/AgregarSolEnvCliente") };

    return (
        console.log(SolEnvCliente),
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <button className="buttonRepartidorStyle" onClick={handleRedirect}>Agregar Solicitud</button>
                            <button className="buttonRepartidorStyle" onClick={handleButtonClick}>Eliminar Solicitud</button>
                        </div>
                        <div className="InfoBarImg">
                            <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="lista">{
                        SolEnvCliente.map((val) => {
                            return (
                                <React.Fragment key={val.idsolicitudenvio}>
                                    <div className="ModuloRepartidorContainer">
                                        <div className="eliminarModulo" onClick={() => showModal(val.idsolicitudenvio)} style={divStyle}>X</div>
                                        <Link to="/SolEnvClientesInfo" onClick={() => currentSolicitud(val)} style={{ textDecoration: 'none' }}>
                                            <ModuloSolEnvCliente id={val.idsolicitudenvio} fecha={val.fechasolicitud} />
                                        </Link>
                                    </div>

                                    <div className="modalEliminarRepartidorContenedor" style={modalStyle}>
                                        <div className="containerModalEliminarRepartidor2">
                                            <div className="eliminarModalRepartidor" onClick={() => showModal(val.idsolicitudenvio)}>X</div>
                                            <div className="modalEliminarRepartidor">
                                                <h3>¿Estás seguro de eliminar la solicitud?</h3>
                                                <p>Al eliminar la solicitud, esta no será tenida en cuenta</p>
                                                <button onClick={handleEliminarSolEnvCliente}>Eliminar</button>
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
export default SolEnvClientes;