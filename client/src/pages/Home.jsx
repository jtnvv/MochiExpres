import React from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/authContext";
import InfoBar from "./InfoBar";
import { useContext } from "react";
const Home = () => {

    const { currentTypeUser } = useContext(AuthContext);
    if (currentTypeUser === "administrador") { // Si el usuario es admin
        return (
            <div className="content-flex">
                <Sidebar />
                <div className="divContent">
                    <InfoBar />
                    <div className="ItemsContainer">
                        Esta es la pagina de inicio del admin :D
                    </div>
                </div>
            </div>
        );
    } else if (currentTypeUser === "cliente") { // Si el usuario es cliente
        return (
            <div className="content-flex">
                <Sidebar />
                <div className="divContent">
                    <InfoBar />
                    <div className="ItemsContainer">
                        Esta es la pagina de inicio del cliente :D
                    </div>
                </div>
            </div>
        );
    } else { //Si el usuario es repartidor
        return (
            <div className="content-flex">
                <Sidebar />
                <div className="divContent">
                    <InfoBar />
                    <div className="ItemsContainer">
                        <div className="ItemsContainer__construccion">
                            <div className="ItemsContainer__img_construccion">
                                <img src="https://i.imgur.com/Lfs0XUC.png"></img>
                            </div>
                            <div className="ItemsContainer__texto_construccion">
                                <h1>En construcción</h1>
                                <p>Esta sección se encuentra en construcción</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};
export default Home;