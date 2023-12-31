import React from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/authContext";
import InfoBar from "./InfoBar";
import { useContext } from "react";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa6";
import * as FcIcons from "react-icons/fc";
import { Link } from "react-router-dom";
import logo from '../img/Mochi.jpeg';
const Home = () => {

    const { currentTypeUser } = useContext(AuthContext);
    if (currentTypeUser === "administrador") { // Si el usuario es admin
        return (
            <div className="content-flex">
                <Sidebar />
                <div className="divContentHAdmin">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes"> Bienvenido de vuelta!
                            </h3>
                        </div>
                        <div className="InfoBarImg">
                            <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="ItemsContainerHAdmin" style={{ overflowY: 'auto' }}>
                        <Link to="/Personal-Info" className="NombreH" style={{ textDecoration: 'none' }}>
                            <div className="image">
                                <img src={logo} alt="" />
                            </div>
                            <h3> Información personal</h3>
                        </Link>
                        <Link to="/Consultar-Pedidos" className="ConsultarPedidosH" style={{ textDecoration: 'none', color: '#4A4846' }} >
                            <BiIcons.BiSolidShoppingBags className="IconColorH" />
                            <h3> Consultar Pedidos</h3>
                        </Link>
                        <Link to="/Habilitar-Solicitud" className="HabilitarSH" style={{ textDecoration: 'none', color: '#4A4846' }}>
                            <MdIcons.MdNotificationAdd className="IconColorH" />
                            <h3> Habilitar Solicitud</h3>
                        </Link>
                        <Link to="/Repartidores" className="RepartidoresH" style={{ textDecoration: 'none', color: '#4A4846' }}>
                            <FaIcons.FaTruckArrowRight className="IconColorH" />
                            <h3> Repartidores</h3>
                        </Link>
                        <Link to="/Clientes" className="ClientesH" style={{ textDecoration: 'none', color: '#4A4846' }}>
                            <BiIcons.BiSolidHappyBeaming className="IconColorH" />
                            <h3> Clientes</h3>
                        </Link>
                        <Link to="/Envios" className="enviosH" style={{ textDecoration: 'none', color: '#4A4846' }}>
                            <PiIcons.PiPackageFill className="IconColorH" />
                            <h3> Envíos</h3>
                        </Link>
                        <Link to="/Auditoria" className="auditoriaH" style={{ textDecoration: 'none', color: '#4A4846' }}>
                            <PiIcons.PiNotebookBold className="IconColorH" />
                            <h3> Auditoria</h3>
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else if (currentTypeUser === "cliente") { // Si el usuario es cliente
        return (
            <div className="content-flex">
                <Sidebar />
                <div className="divContentHAdmin">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes"> Bienvenido de vuelta!
                            </h3>
                        </div>
                        <div className="InfoBarImg">
                            <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="ItemsContainerHAdmin">
                        <Link to="/Personal-Info" className="NombreH" style={{ textDecoration: 'none' }}>
                            <div className="image">
                                <img src={logo} alt="" />
                            </div>
                            <h3> Información personal</h3>
                        </Link>
                        <Link to="/Consultar-Envios-Cliente" className="enviosH" style={{ textDecoration: 'none', color: '#4A4846' }} >
                            <BiIcons.BiSolidShoppingBags className="IconColorH" />
                            <h3> Envíos</h3>
                        </Link>
                        <Link to="/SolEnvClientes" className="solicitudesEnviosH" style={{ textDecoration: 'none', color: '#4A4846' }}>
                            <MdIcons.MdNotificationAdd className="IconColorH" />
                            <h3> Solucitudes envíos</h3>
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else { //Si el usuario es repartidor
        return (
            <div className="content-flex">
                <Sidebar />
                <div className="divContentHAdmin">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes"> Bienvenido de vuelta!
                            </h3>
                        </div>
                        <div className="InfoBarImg">
                            <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="ItemsContainerHAdmin">
                        <Link to="/Personal-Info" className="NombreH" style={{ textDecoration: 'none' }}>
                            <div className="image">
                                <img src={logo} alt="" />
                            </div>
                            <h3> Información personal</h3>
                        </Link>
                        <Link to="/EnviosAsignados" className="enviosAsignadosH" style={{ textDecoration: 'none', color: '#4A4846' }} >
                            <BiIcons.BiSolidShoppingBags className="IconColorH" />
                            <h3> Envíos Asignados</h3>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

};
export default Home;