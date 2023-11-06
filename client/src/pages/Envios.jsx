import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import ModuloEnvio from "./ModuloEnvio";
import { AuthContext } from "../context/authContext";
import { clienteSeleccionado } from "./Clientes";

export const envioSeleccionado = [];

function Envios() {

    const [enviosList, setEnvios] = useState([]);
    const { getEnvios } = useContext(AuthContext);

    const [identificador, setIdentificador] = useState({
        idenvio: ""
    });

    useEffect(() => {
        console.log(identificador);
    });

    const [err, setError] = useState(null);

    const currentEnvio = (envio) => {
        envioSeleccionado.pop();
        envioSeleccionado.push(envio);
    }

    useEffect(() => {
        const obtenerEnvios = async () => {
            try {
                const res = await getEnvios();
                setEnvios(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerEnvios();
    });

    const [envioSeleccionado, setEnvioSeleccionado] = useState({
        idenvio: "",
        descripcionpaquete: "",
        estadoenvio: "",
        tarifaenvio: "",
        fechaenvioentregado: "",
        fechaenviorealizado: "",
        destinoenvio: "",
        idrepartidor: "",
        idsolicitudenvio: ""
    });
    const [redirigir, setRedirigir] = useState(false);

    const actualizarDatos = (id, descripcion, estado, tarifa, fechaentrega, fechacreacion, destino, idrepartidor, idsolicitud) => {
        setEnvioSeleccionado({
            id,
            descripcion,
            estado,
            tarifa,
            fechaentrega,
            fechacreacion,
            destino,
            idrepartidor,
            idsolicitud
        });
        setRedirigir(true);
    };

    useEffect(() => {
        if (redirigir) {
            const url = `/EnviosInfo?idenvio=${envioSeleccionado.idenvio}&descripcionpaquete=${envioSeleccionado.descripcionpaquete}&estadoenvio=${envioSeleccionado.estadoenvio}&tarifaenvio=${envioSeleccionado.tarifaenvio}&fechaenvioentregado=${envioSeleccionado.fechaenvioentregado}&fechaenviorealizado=${datos.fechaenviorealizado}&destinoenvio=${datos.destinoenvio}&idrepartidor=${datos.idrepartidor}&idsolicitud=${datos.idsolicitud}`;
            window.location.href = url;
        }
    }, [redirigir, envioSeleccionado]);

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
                                <React.Fragment key={envio.idenvio}>
                                    <div className="ModuloEnvioBarra" onClick={() => actualizarDatos(envio.idenvio, envio.descripcionpaquete, envio.estadoenvio, envio.tarifaenvio, envio.fechaenvioentregado, envio.fechaenviorealizado, envio.destinoenvio, envio.idrepartidor, envio.idsolicitud)}>
                                        <ModuloEnvio id={envio.idenvio} nombre={envio.descripcionpaquete} fechaEnvioRealizado={envio.fechaenviorealizado}
                                            fechaEnvioEntregado={envio.fechaenvioentregado} repartidor={envio.idrepartidor} tarifa={envio.tarifaenvio} />
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