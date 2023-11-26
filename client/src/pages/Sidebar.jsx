import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa6";
import * as FcIcons from "react-icons/fc";
import { AuthContext } from "../context/authContext";
const Sidebar = () => {

    const { currentTypeUser } = useContext(AuthContext);
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="Sidebar">
            <div className="Dashboard">
                <ul style={{ listStyleType: "none" }}>
                    <li>

                        <Link to="/Home" className="Inicio">
                            <FcIcons.FcInTransit className="IconLogo" />
                        </Link>
                    </li>

                    {currentTypeUser === "administrador" ? (
                        <>
                            <li>
                                <Link to="/Consultar-Pedidos" className="Consultar pedidos">
                                    <BiIcons.BiSolidShoppingBags className="IconColor" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/Habilitar-Solicitud" className="Habilitar Solicitudes">
                                    <MdIcons.MdNotificationAdd className="IconColor" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/Repartidores" className="Repartidores">
                                    <FaIcons.FaTruckArrowRight className="IconColor" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/Clientes" className="Clientes">
                                    <BiIcons.BiSolidHappyBeaming className="IconColor" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/Envios" className="Envios">
                                    <PiIcons.PiPackageFill className="IconColor" />
                                </Link>
                            </li>
                        </>

                    ) : currentTypeUser === "repartidor" ? (
                        <>
                            <li>
                                <Link to="/Consultar-Pedidos" className="Consultar pedidos">
                                    <BiIcons.BiSolidShoppingBags className="IconColor" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/Clientes" className="Clientes">
                                    <BiIcons.BiSolidHappyBeaming className="IconColor" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/Envios" className="Envios">
                                    <PiIcons.PiPackageFill className="IconColor" />
                                </Link>
                            </li>
                        </>

                    ) : (
                        <>
                            <li>
                                <Link to="/Consultar-Envios-Cliente" className="Consultar-Envios-Cliente">
                                    <BiIcons.BiSolidShoppingBags className="IconColor" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/SolEnvClientes" className="Habilitar Solicitudes">
                                    <MdIcons.MdNotificationAdd className="IconColor" />
                                </Link>
                            </li>
                        </>

                    )
                    }

                </ul>
                <div className="Salida">
                    <ul style={{ listStyleType: "none" }}>
                        <li>
                            {/* {currentUser ? (
                                <Link to="#" className="Salida">
                                    <IoIcons.IoMdExit className="IconColor" onClick={logout} />
                                </Link>
                            ) : (
                                <Link to="\Login" className="Salida">
                                    <IoIcons.IoMdExit className="IconColor" />
                                </Link>
                            )} */}

                            <Link to="/Login" className="Salida">
                                <IoIcons.IoMdExit className="IconColor" onClick={logout} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};
export default Sidebar;