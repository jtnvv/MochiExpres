import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import { Link } from "react-router-dom";
import ModuloClientes from "./ModuloClientes";
import { AuthContext } from "../context/authContext";
export let clienteSeleccionado = [];

//Esto es consultar pedidos realizados por cliente
const ConsultarPedidos = () => {

    const [clientesList, setClientes] = useState([]);
    const [enviosList, setEnviosList] = useState([]);
    const [envioSeleccionado, setEnvioSeleccionado] = useState([]);
    const { getClientes } = useContext(AuthContext);
    const { getEnviosCliente } = useContext(AuthContext);


    const [identificador, setIdentificador] = useState({
        idCliente: ""
    });

    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);

    const currentClient = (cliente) => {
        clienteSeleccionado.pop();
        clienteSeleccionado.push(cliente);
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



    const obtenerEnviosCliente = async () => {
        try {
            console.log("Desde aquiii ", identificador.idCliente);
            const res = await getEnviosCliente(identificador.idCliente);
            setEnviosList(res);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        console.log(enviosList);
    }, [enviosList]);

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
            setIdentificador({ idCliente: idCliente });
            setModalStyle({ visibility: 'visible' });

        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };

    useEffect(() => {
        if (identificador.idCliente !== "") {
            obtenerEnviosCliente();
        }
    }, [identificador]);

    const handleEnvioSeleccionado = (event) => {
        const selectedId = event.target.value;
        console.log(enviosList);
        const selectedEnvio = enviosList.filter((envio) => envio.idenvio == selectedId);
        setEnvioSeleccionado(selectedEnvio);
        console.log("Se selecciono: ", selectedEnvio);
    }

    useEffect(() => {
        console.log(envioSeleccionado);
    }, [envioSeleccionado]);

    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Consultar pedidos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Cliente" />
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="lista">{
                        clientesList.map((val) => {
                            return (
                                <React.Fragment key={val.idCliente}>
                                    <div className="ModuloRepartidorContainer" onClick={() => showModal(val.idCliente)}>
                                        <Link onClick={() => currentClient(val)} style={{ textDecoration: 'none' }}>
                                            <ModuloClientes nombre={val.nombrecliente} />
                                        </Link>
                                    </div>
                                </React.Fragment>

                            );
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="modalConsultarContenedor" style={modalStyle}>
                <div className="containerModalEliminarRepartidor2">
                    <div className="eliminarModalConsulta" onClick={showModal}>X</div>
                    <div className="modalConsultarPedido">
                        <div className="row_selection">
                            <h3>ID</h3>
                            <select onChange={handleEnvioSeleccionado}>
                                {enviosList.map((envio) => {
                                    return (
                                        <React.Fragment key={envio.idenvio}>
                                            <option key={envio.idenvio} value={envio.idenvio}>
                                                {envio.idenvio}
                                            </option>
                                        </React.Fragment>
                                    );

                                })}
                            </select>
                        </div>
                        <div className="row">
                            <h3>Fecha envío</h3>
                            <input type="text" disabled className="textareaInput" />
                        </div>
                        <div className="row">
                            <h3>Fecha entrega</h3>
                            <input type="text" disabled className="textareaInput" />
                        </div>
                        <div className="row">
                            <h3>Estado</h3>
                            <input type="text" disabled className="textareaInput" />
                        </div>
                        <div className="row">
                            <h3>Tarifa</h3>
                            <input type="text" disabled className="textareaInput" />
                        </div>
                        <div className="row">
                            <h3>Peso</h3>
                            <input type="text" disabled className="textareaInput" />
                        </div>
                        <div className="row">
                            <h3>Descripción</h3>
                            <input type="text" disabled className="textareaInput" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ConsultarPedidos;