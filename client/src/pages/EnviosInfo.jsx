import React from "react";

import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
const EnviosInfo = () => {
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const nombre = searchParams.get('nombre');
    const fechaEnvioRealizado = searchParams.get('fechaEnvioRealizado');
    const fechaEnvioEntregado = searchParams.get('fechaEnvioEntregado');
    const tarifa = searchParams.get('tarifa');
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Envíos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Envío"/>
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo"  src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="modalEnvioContenedor">
                        <div className="Container2modalEnvio">
                            <div className="modalEnvioContenedor2">
                                <div className="id ">
                                    <div className="idEnvio card">{id}</div>
                                    <div className="info card">
                                        <h3>NombreCliente</h3>
                                        <p>{nombre}</p>
                                        <h3>Fecha envío realizado</h3>
                                        <p>{fechaEnvioRealizado}</p>
                                        <h3>Fecha envío entregado</h3>
                                        <p>{fechaEnvioEntregado}</p>
                                        <h3>Estado</h3>
                                        <select name="selectStatus" className="status">
                                            <option value="Entregado">Entregado</option>
                                            <option value="EnBodega">En bodega</option>
                                            <option value="EnCamino">En camino</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="tarifaDescripcion ">
                                    <div className="tarifa card">{tarifa}</div>
                                    <div className="Descripcion card">
                                        <h3>Descripcion paquete</h3>
                                        <textarea value={"dadasdsad"} disabled name="" id="" cols="50" rows="30" className="descripcionText">
                                        </textarea>
                                    </div>
                                </div>
                                <div className="personalInfo card">
                                    <div className="personalInfoImage">
                                        <img src="data:image/jpeg;base64,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" alt="profileFoto" />
                                    </div>
                                    <h3>Repartidor</h3>
                                    <select name="selectStatus" className="status">
                                        <option value="Entregado">Ivana</option>
                                        <option value="EnBodega">Kelly</option>
                                        <option value="EnCamino">Catalina</option>
                                    </select>
                                    <button>Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EnviosInfo;