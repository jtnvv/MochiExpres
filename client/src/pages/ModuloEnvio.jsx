import React from "react";

const ModuloEnvio = (props) => {

    
    
    return (
        <div className="content-flex-module-Envio" >
            <h2>{props.idenvio}</h2>
            <h3>{}</h3>
            <div className="fecha">
                <h3>{props.fechaenviorealizado}</h3>
                <h3>{props.fechaenvioentregado}</h3>
            </div>
            <h3>{props.idrepartidor}</h3>
            <h3>{props.tarifaenvio}</h3>
            
        </div>
    );
};
export default ModuloEnvio;