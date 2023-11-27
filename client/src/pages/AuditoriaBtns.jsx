import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const EnvClienteSeleccionado = [];


function AuditoriaBtns() {

    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Registro de auditoria </h3>
                            
                        </div>
                        <div className="containerBusquedaRepartidor containerBusquedaEnvClientes">
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            </div>
                        </div>
                    </div>
        
                
                    <div className="lista"> 
                        <div className="ModuloRepartidorContainer">
                            <Link to="/AuditoriaOperaciones"  style={{ textDecoration: 'none' }}>                                          
                                <div className="ModuloRepartidor">
                                    <h2 className="ModuloAuditoriaBtn">Operaciones</h2>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="ModuloRepartidorContainer">
                            <Link to="/AuditoriaIngresos"  style={{ textDecoration: 'none' }}>                                          
                                <div className="ModuloRepartidor">
                                    <h2 className="ModuloAuditoriaBtn">Ingresos</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                
                </div>
            </div>

        </div>
    );
};
export default AuditoriaBtns;