import React from "react";

const ModuloEnvio = (props) => {
    
    return (
        <div className="content-flex-module-Envio" >
            <h2>{props.id}</h2>
            <h3>{props.nombre}</h3>
            <div className="fecha">
                <h3>{props.fechaEnvioRealizado}</h3>
                <h3>{props.fechaEnvioEntregado}</h3>
            </div>
            <h3>{props.repartidor}</h3>
            <h3>{props.tarifa}</h3>
            
        </div>
    );
};
export default ModuloEnvio;