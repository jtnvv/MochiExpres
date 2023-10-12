import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";

const ConsultarPedidos = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">    
                <InfoBar />
                <div className="ItemsContainer">
                    ola soy un consultarpedido
                </div>
            </div>
        </div>
    );
};
export default ConsultarPedidos;