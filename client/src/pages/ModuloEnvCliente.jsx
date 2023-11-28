import React from "react";
import Sidebar from "./Sidebar.jsx";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";

const ModuloEnvCliente = (props) => {
    console.log(props);
    return (
        <div className="ModuloRepartidor">
            <h2 className="ModuloEnvCliente_t">Envío</h2>
            <h1 className="ModuloEnvCliente" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {props.idenvio}
            </h1>
        </div>
    );
};

export default ModuloEnvCliente;