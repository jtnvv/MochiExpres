import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import ModuloEnvio from "./ModuloEnvio";
import { AuthContext } from "../context/authContext";
import { clienteSeleccionado } from "./Clientes";
import { Link } from "react-router-dom";

export const envioSeleccionado = [];

function Envios() {

    const [enviosList, setEnvios] = useState([]);
    const { getEnvios } = useContext(AuthContext);

   

    const [identificador, setIdentificador] = useState({
        idenvio: ""
    });

    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);

    const currentEnvio = (envio) => {
        envioSeleccionado.pop();
        envioSeleccionado.push(envio);
    }

    useEffect(() => {
        const obtenerEnvios = async () => {
            try {
                const res = await getEnvios();
                console.log(res);
                setEnvios(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerEnvios();
    }, []);

    // const [envioSeleccionado, setEnvioSeleccionado] = useState({
    //     idenvio: "",
    //     descripcionpaquete: "",
    //     estadoenvio: "",
    //     tarifaenvio: "",
    //     fechaenvioentregado: "",
    //     fechaenviorealizado: "",
    //     destinoenvio: "",
    //     idrepartidor: "",
    //     idsolicitudenvio: ""
    // });
    // const [redirigir, setRedirigir] = useState(false);

    // const actualizarDatos = (id, descripcion, estado, tarifa, fechaentrega, fechacreacion, destino, idrepartidor, idsolicitudenvio) => {
    //     setEnvioSeleccionado({
    //         id,
    //         descripcion,
    //         estado,
    //         tarifa,
    //         fechaentrega,
    //         fechacreacion,
    //         destino,
    //         idrepartidor,
    //         idsolicitudenvio
    //     });
    //     setRedirigir(true);
    // };

    // useEffect(() => {
    //     if (redirigir) {
    //         const url = `/EnviosInfo?
    //         idenvio=${envioSeleccionado.idenvio}
    //         &descripcionpaquete=${envioSeleccionado.descripcionpaquete}
    //         &estadoenvio=${envioSeleccionado.estadoenvio}
    //         &tarifaenvio=${envioSeleccionado.tarifaenvio}
    //         &fechaenvioentregado=${envioSeleccionado.fechaenvioentregado}
    //         &fechaenviorealizado=${envioSeleccionado.fechaenviorealizado}
    //         &destinoenvio=${envioSeleccionado.destinoenvio}
    //         &idrepartidor=${envioSeleccionado.idrepartidor}
    //         &idsolicitudenvio=${envioSeleccionado.idsolicitudenvio}`;
    //         window.location.href = url;
    //     }
    // }, [redirigir, envioSeleccionado]);

    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Envíos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Envío" />
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    {
                        enviosList.map((envio) => {
                            return (
                                console.log("Aca: ",envio),
                                <React.Fragment key={envio.idenvio}>
                                    <div className="ModuloEnvioBarra">
                                        <Link to="/EnviosInfo" onClick= { () => currentEnvio(envio)} style={{ textDecoration: 'none' }}>
                                                <ModuloEnvio
                                                    idenvio={envio.idenvio}
                                                    descripcionpaquete={envio.descripcionpaquete}
                                                    estadoenvio={envio.estadoenvio}
                                                    tarifaenvio={envio.tarifaenvio}
                                                    fechaenvioentregado={envio.fechaenvioentregado}
                                                    fechaenviorealizado={envio.fechaenviorealizado}
                                                    destinoenvio={envio.destinoenvio}
                                                    idrepartidor={envio.idrepartidor}
                                                    idsolicitudenvio={envio.idsolicitudenvio}
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
export default Envios;