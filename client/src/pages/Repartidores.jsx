import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";

const Repartidores = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                    ola soy un repartidor
                </div>
            </div>
        </div>
    );
};
export default Repartidores;