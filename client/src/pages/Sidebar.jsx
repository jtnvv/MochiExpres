import React from "react";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as PiIcons from "react-icons/pi";
import * as IoIcons from "react-icons/io";

const Sidebar = () => {
  
     return (
        <div className="Sidebar">
            <div className="Dashboard">
            <ul style={{listStyleType:"none"}}>
                <li>
                    <Link to="#" className="Inicio">
                    <BiIcons.BiSolidHomeHeart/> 
                    </Link>
                </li>
                <li>
                    <Link to="/Consultar-Pedidos" className="Consultar pedidos">
                        <BiIcons.BiSolidShoppingBags/>
                    </Link>
                </li>
                <li>
                    <Link to="/Habilitar-Solicitud" className="Habilitar Solicitudes"> 
                        <MdIcons.MdNotificationAdd/>
                    </Link>
                </li>
                <li>
                    <Link to="/Repartidores" className="Repartidores">
                        <GrIcons.GrUserWorker/>
                    </Link>
                </li>
                <li>
                    <Link to="/Clientes" className="Clientes">
                        <BiIcons.BiSolidHappyBeaming/>
                    </Link>
                </li>
                <li>
                    <Link to="/Envios" className="Envios">
                        <PiIcons.PiPackageFill/>
                    </Link>
                </li>
            </ul>
            <div className="Salida">
                <ul style={{listStyleType:"none"}}>
                <li>
                    <Link to="/Login" className="Salida">
                        <IoIcons.IoMdExit/>
                    </Link>
                </li>
                </ul>
            </div>
            </div>
            
        </div>
    );
};
export default Sidebar;