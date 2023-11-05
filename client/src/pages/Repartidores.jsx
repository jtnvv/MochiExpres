import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
export const repartidorSeleccionado = [];


function Repartidores() {

    const [repartidoresList, setRepartidores] = useState([]);
    const { getRepartidores } = useContext(AuthContext);
    //const { repartidores } = useContext(AuthContext);
    
    const currentRepartidor = (repartidor) => {
        repartidorSeleccionado.pop();
        repartidorSeleccionado.push(repartidor);

    }

    useEffect(() => {
        const obtenerRepartidores = async () => {
            try {
                const res = await getRepartidores();

                setRepartidores(res);

            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidores();

    }, []);

    // useEffect(() => {
    //     //console.log("Aqui esta la respuesta");
    //     //console.log(repartidoresList);
    // }, [repartidoresList]);

    return (

        <div className="content-flex">
            <Sidebar />
            <div className="divContent">

                <div className="ItemsContainer">
                    ola soy un repartidor
                    <Link to="/Home" className="ClientesInfo"> Volver</Link>
                    <div className="lista">

                        {
                            repartidoresList.map((val) => {
                                return (
                                    <div className="divBodyPersonalInfo">
                                        <h1>{val.nombrerepartidor}</h1>
                                        <h2 className="usernameTxt">
                                            <Link to="/RepartidoresInfo" onClick={() => currentRepartidor(val)}> {val.nombrerepartidor} </Link>
                                        </h2>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>

                    </div>
                </div>

            </div>
        </div>
    );
};
export default Repartidores;