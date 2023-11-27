import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloEnvCliente from "./ModuloEnvCliente"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
export const EnvClienteSeleccionado = [];


function AuditoriaBtns() {
    const { currentUser } = useContext(AuthContext);
    const [EnvCliente, setEnvCliente] = useState([]);
    const { getSolicitudIdCliente } = useContext(AuthContext);
    const { deleteEnvCliente } = useContext(AuthContext);
    //const { repartidores } = useContext(AuthContext);
    const [identificador, setIdentificador] = useState({
        idsolicitudenvio: ""
    });

    // useEffect(() => {
    //     console.log(identificador);
    // }, [identificador]);

    const [err, setError] = useState(null);

    const currentSolicitud = (solicitud) => {
        EnvClienteSeleccionado.pop();
        EnvClienteSeleccionado.push(solicitud);

    }

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
    }, []);


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
    const handleRedirect = () => { navigate("/AgregarEnvCliente") };

    return (
        console.log(EnvCliente),
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Registro de auditoria </h3>
                            
                        </div>
                        <div className="containerBusquedaRepartidor containerBusquedaEnvClientes">
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            </div>
                        </div>
                    </div>
        
                
                    <div className="lista"> 
                        <div className="ModuloRepartidorContainer">
                            <Link to="/AuditoriaOperaciones"  style={{ textDecoration: 'none' }}>                                          
                                <div className="ModuloRepartidor">
                                    <h2 className="ModuloAuditoriaBtn">Operaciones</h2>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="ModuloRepartidorContainer">
                            <Link to="/AuditoriaIngresos"  style={{ textDecoration: 'none' }}>                                          
                                <div className="ModuloRepartidor">
                                    <h2 className="ModuloAuditoriaBtn">Ingresos</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                
                </div>
            </div>

        </div>
    );
};
export default AuditoriaBtns;