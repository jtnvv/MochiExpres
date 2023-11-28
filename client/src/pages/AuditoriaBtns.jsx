import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from '../img/Mochi.jpeg';

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
                        <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src={logo} alt="" />
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