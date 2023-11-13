import React from "react";
import Sidebar from "./Sidebar.jsx";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";

const ModuloClientes = (props) => {

    return (
        <div className="ModuloRepartidor">
            <div className="ModuloRepartidor_DivImagen">
                <img className="ModuloRepartidor_ImagenPerfil" src="https://pm1.aminoapps.com/7437/432864b21d0d2083e7cc8acb81f2a8ab7d80425ar1-564-564v2_00.jpg" alt="" />
            </div>
            <h3 className="ModuloRepartidor_Titulo">{props.nombre}</h3>
        </div>
    );
};
export default ModuloClientes;