import React from "react";
import Sidebar from "./Sidebar.jsx";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";
import logo from '../img/Mochi.jpeg';

const ModuloClientes = (props) => {

    return (
        <div className="ModuloRepartidor">
            <div className="ModuloRepartidor_DivImagen">
                <img className="ModuloRepartidor_ImagenPerfil" src={logo} alt="" />
            </div>
            <h3 className="ModuloRepartidor_Titulo">{props.nombre}</h3>
        </div>
    );
};
export default ModuloClientes;