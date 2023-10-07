import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";

const Envios = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                    ola soy un envio
                </div>
            </div>
        </div>
    );
};
export default Envios;