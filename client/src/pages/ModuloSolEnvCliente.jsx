import React from "react";
import Sidebar from "./Sidebar.jsx";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";

const ModuloRepartidor = (props) => {

    return (
        <div className="ModuloRepartidor">
            <h2 className="ModuloSolEnv_t">Solicitud de envio</h2>
            <h1 className="ModuloSolEnv">{props.id}</h1>
            <h2 className="ModuloSolEnv_t">{props.fecha}</h2>
        </div>
    );
};
export default ModuloRepartidor;