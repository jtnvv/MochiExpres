import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
const HabilitarSolicitud = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                    ola soy un habilitar solicitar
                </div>
            </div>
        </div>
    );
};
export default HabilitarSolicitud;