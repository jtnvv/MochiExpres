import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import ModuloEnvio from "./ModuloEnvio";
import { AuthContext } from "../context/authContext";
import { clienteSeleccionado } from "./Clientes";
import { Link } from "react-router-dom";

export const solicitudEnvioSeleccionada = [];

function HabilitarSolicitud() {

    const [solicitudesEnviosList, setSolicitudesEnvios] = useState([]);
    const { getSolicitudesEnvio } = useContext(AuthContext);

    const [identificador, setIdentificador] = useState({
        idenvio: ""
    });

    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);

    const currentSolicitudEnvio = (solicitudEnvio) => {
        solicitudEnvioSeleccionada.pop();
        solicitudEnvioSeleccionada.push(solicitudEnvio);
    }

    useEffect(() => {
        const obtenerSolicitudesEnvios = async () => {
            try {
                const res = await getSolicitudesEnvio();
                console.log(res);
                setSolicitudesEnvios(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerSolicitudesEnvios();
    }, []);


    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Solicitudes de Envíos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Solicitud de Envío" />
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    {
                        solicitudesEnviosList.map((solicitudEnvio) => {
                            return (
                                console.log("Aca: ",solicitudEnvio),
                                <React.Fragment key={solicitudEnvio.idsolicitudenvio}>
                                    <div className="ModuloEnvioBarra">
                                        <Link to="/EnviosInfo" onClick= { () => currentSolicitudEnvio(solicitudEnvio)} style={{ textDecoration: 'none' }}>
                                                <div className="content-flex-module-SolicitudEnvio">

                                                      <div className="nombrecliente">
                                                        <h3>{solicitudEnvio.nombrecliente}</h3>
                                                      </div>
                                                      <h2>Ver Info</h2>


                                                </div>
    
                                        </Link>
                                    </div>
                                </React.Fragment>
                            );

                        })
                    }




                </div>
            </div>
        </div>
    );
};
export default HabilitarSolicitud;