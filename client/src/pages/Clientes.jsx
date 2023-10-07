import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
const Clientes = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                    ola soy un cliente
                </div>
            </div>
        </div>
    );
};
export default Clientes;