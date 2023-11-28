import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import ModuloSolicitudEnvio from "./ModuloSolicitudEnvio";
import logo from '../img/Mochi.jpeg';

export const senvioSeleccionado = [];

const HabilitarSolicitud = () => {
    const [solicitudList, setSolicitudenvio] = useState([]);
    const { getSolicitudesEnvio } = useContext(AuthContext);

    const [identificador, setIdentificador] = useState({
        idsolicitudenvio: ""
    });
    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);

    const currentSolicitud = (solicitudenvio) => {
        senvioSeleccionado.pop();
        senvioSeleccionado.push(solicitudenvio);
    }

    useEffect(() => {
        const obtenerSolicitudes = async () => {
            try {
                const res = await getSolicitudesEnvio();
                console.log(res);
                setSolicitudenvio(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerSolicitudes();
    }, []);
    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Solicitud de envíos</h3>
                        </div>
                        <div className="InfoBarImg">
                            <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    {
                        solicitudList.map((solicitudenvio) => {
                            return (
                                console.log("Aca: ", solicitudenvio),
                                <React.Fragment key={solicitudenvio.idenvio}>
                                    <div className="ModuloEnvioBarra">
                                        <Link to="/SolEnvInfo1" onClick={() => currentSolicitud(solicitudenvio)} style={{ textDecoration: 'none' }}>
                                            <ModuloSolicitudEnvio
                                                idsolicitudenvio={solicitudenvio.idsolicitudenvio}
                                            />
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