import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import { Link } from "react-router-dom";

const Clientes = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                    ola soy un cliente
                    <Link to="/ClientesInfo" className="ClientesInfo"> Volver</Link>
                </div>
            </div>
        </div>
    );
};
export default Clientes;