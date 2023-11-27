import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloAuditoriaIngresos from "./ModuloAuditoriaIngresos"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
export const EnvClienteSeleccionado = [];


function AuditoriaIngresos() {
    const { currentUser } = useContext(AuthContext);

    const [err, setError] = useState(null);



    const navigate = useNavigate();


    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Auditoria">Registro de auditoría - Ingresos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor containerBusquedaEnvClientes">
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="Auditoria">
                        <div className="containerAuditoria">
                            <div className="header2">
                                <h3 className="text_i">ID Auditoria</h3>
                                <h3 className="text">Tipo Usuario</h3>
                                <h3 className="text">Usuario</h3>
                                <h3 className="text">Accion</h3>
                                <h3 className="text">Detalle</h3>
                                <h3 className="text">Resultado</h3>
                                <h3 className="text_d">Fecha</h3>
                            </div>
                            <div className="container">
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="as" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                <ModuloAuditoriaIngresos idaud="12345667" tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                 detalle="dasdadasdd" resultado="dadsad" fecha="17/07/2003 23:00h"></ModuloAuditoriaIngresos>
                                
                            </div>
                        </div>
                    </div>
                    
                
                    
                
                </div>
            </div>

        </div>
    );
};
export default AuditoriaIngresos;