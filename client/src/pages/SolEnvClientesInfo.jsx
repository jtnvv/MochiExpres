import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { SolEnvClienteSeleccionado } from "./SolEnvClientes";
import { Link } from "react-router-dom";
import logo from '../img/Mochi.jpeg';

const SolEnvClientesInfo = () => {
    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Solicitud de envíos</h3>
                        </div>
                        <div className="InfoBarImg">
                            <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                </div>
                <div className="Sol-env1__bg">
                    <h2>Fecha Solicitud: </h2><p>{SolEnvClienteSeleccionado[0].fechasolicitud}</p><br />
                    <h2>Peso del paquete: </h2><p>{SolEnvClienteSeleccionado[0].pesopaquete} kg</p><br />
                    <h2>Descipcion paquete: </h2><p>{SolEnvClienteSeleccionado[0].descripcionsolicitud}</p><br />
                    <h2>Destino de la solicitud: </h2><p>{SolEnvClienteSeleccionado[0].destinosolicitud}</p><br />
                    <h2>Estado: </h2><p>En espera</p><br />
                </div>
            </div>
        </div>
    );
};
export default SolEnvClientesInfo;