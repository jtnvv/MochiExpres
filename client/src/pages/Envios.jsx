import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import ModuloEnvio from "./ModuloEnvio";
const Envios = () => {
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
                    <ModuloEnvio id={"170703"} nombre={"Andersson"} 
                    fechaEnvioRealizado={"17/06/03"} fechaEnvioEntregado={"17/07/03"}
                    repartidor={"Ivana"} tarifa={"17000.0"} />
                    <ModuloEnvio />
                    <ModuloEnvio />
                </div>
            </div>
        </div>
    );
};
export default Envios;