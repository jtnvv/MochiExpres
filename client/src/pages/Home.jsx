import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
const Home = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                    Esta es la pagina de inicio del usuario :D
                </div>
            </div>
        </div>
    );
};
export default Home;