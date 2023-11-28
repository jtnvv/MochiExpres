import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import { Link } from "react-router-dom";
import ModuloClientes from "./ModuloClientes";
import { AuthContext } from "../context/authContext";
import logo from '../img/Mochi.jpeg';
//import { getEnviosRepartidor } from "../../../api/controllers/envio";




export const selectedE = [];

//Esto es consultar envios Asignados a Repartidor
const EnviosAsignados = () => {

    const [clientesList, setClientes] = useState([]);
    const [enviosList, setEnviosList] = useState([]);
    const [envioSeleccionado, setEnvioSeleccionado] = useState([]);
    const { getClientes } = useContext(AuthContext);
    const { getEnviosRepartidor } = useContext(AuthContext);
    const { currentUser } = useContext(AuthContext);

    const [identificador, setIdentificador] = useState({
        idCliente: ""

    });

    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);

    const currentEnvio = (envio) => {
        selectedE.pop();
        selectedE.push(envio);
        console.log(selectedE[0]);
    }

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                console.log("Desde aquiii ", currentUser?.idusuario);
                const res = await getEnviosRepartidor(currentUser.idusuario);
                setEnviosList(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerClientes();
    }, [])



    // const obtenerEnviosCliente = async () => {
    //     try {
    //         console.log("Desde aquiii ", identificador.idCliente);
    //         const res = await getEnviosRepartidor(currentUser?.idusuario)
    //         setEnviosList(res);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };


    useEffect(() => {
        console.log(enviosList);
    }, [enviosList]);

    const [divStyle, setDivStyle] = useState({});
    const [clicked, setClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [clickedModal, setClickedModal] = useState(false);


    const showModal = (idCliente) => {
        if (!clickedModal) {
            setIdentificador({ idCliente: idCliente });
            setModalStyle({ visibility: 'visible' });
            setEnvioSeleccionado({});
        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };

    // useEffect(() => {
    //     if (identificador.idCliente !== "") {
    //         obtenerEnviosCliente();
    //     }
    // }, [identificador]);


    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Envíos Asignados</h3>
                        </div>
                        <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="lista">{
                        enviosList.map((envio) => {
                            return (
                                <React.Fragment key={envio.idenvio}>
                                    <div className="ModuloRepartidorContainer" onClick={() => showModal(envio.idenvio)}>
                                        <Link to="/EnviosInfoRepartidores" onClick={() => currentEnvio(envio)} style={{ textDecoration: 'none' }}>
                                            

                                            <div className="ModuloRepartidor">
                                                 <h3 className="ModuloRepartidor_Titulo">Envio</h3>
                                                 <h3 className="ModuloRepartidor_Titulo">{envio.idenvio}</h3>
                                                 <h3 className="ModuloRepartidor_Titulo">{envio.fechaenvioentregado}</h3>

                                                </div>

                                        </Link>
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
export default EnviosAsignados;