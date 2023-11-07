import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { senvioSeleccionado } from "./HabilitarSolicitud";
import { repartidorSeleccionadoexp } from "./SolEnvInfo1";
import { getEstado, obtenerValorEstado } from "../components/estadosEnvio.js";
import { Link } from "react-router-dom";


const SolEnvInfo2 = () => {
    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Solicitud de envíos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar solicitud envío" />
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>{senvioSeleccionado[0].idCliente}</p>
                        <p>{senvioSeleccionado[0].pesopaquete}</p>
                        <p>{senvioSeleccionado[0].descripcionsolicitud}</p>
                        <p>{senvioSeleccionado[0].destinosolicitud}</p>
                        <p>{repartidorSeleccionadoexp[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SolEnvInfo2;