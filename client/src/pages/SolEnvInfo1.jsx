import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { senvioSeleccionado } from "./HabilitarSolicitud";
import { Link } from "react-router-dom";
import logo from '../img/Mochi.jpeg';

export const repartidorSeleccionadoexp = [];
const SolEnvInfo1 = () => {
    const [nombreCliente, setNombreCliente] = useState("");
    const { getRepartidores } = useContext(AuthContext);
    const [repartidoresList, setRepartidoresList] = useState([]);
    const [repartidorSeleccionado, setRepartidorSeleccionado] = useState([]);
    const { getSolicitudId } = useContext(AuthContext);

    useEffect(() => {
        const obtenerRepartidores = async () => {
            try {
                const res = await getRepartidores();
                //console.log(res);
                setRepartidoresList(res);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidores();
    }, []);

    const handleRepartidorSeleccionado = (e) => {
        if (e.target.value === "No asignado") {
            setRepartidorSeleccionado({});
            repartidorSeleccionadoexp.pop();
            repartidorSeleccionadoexp.push({});
            console.log("Se selecciono: ", e.target.value);
            return;
        } else {
            const idrepartidor = e.target.value;
            console.log(repartidoresList);
            const reparSele = repartidoresList.find((repartidor) => repartidor.idrepartidor === (idrepartidor));
            setRepartidorSeleccionado(reparSele.idrepartidor || {});
            repartidorSeleccionadoexp.pop();
            repartidorSeleccionadoexp.push(reparSele.idrepartidor || {});
            console.log("Se selecciono: ", reparSele.idrepartidor);
        }
    };
    useEffect(() => {

    }, [repartidoresList]);

    useEffect(() => {

    }, [repartidorSeleccionado]);

    useEffect(() => {
        const obtenerCliente = async () => {
            try {
                //console.log(envioSeleccionado[0]);
                const res = await getSolicitudId(senvioSeleccionado[0].idsolicitudenvio);
                setNombreCliente(res[0].nombrecliente);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerCliente();
    }, [nombreCliente]);

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
                </div>
                <div className="Sol-env1__bg">
                    <h2>Cliente: </h2><p>{nombreCliente}</p><br />
                    <h2>Peso del paquete: </h2><p>{senvioSeleccionado[0].pesopaquete} kg</p><br />
                    <h2>Descipcion de la solicitud: </h2><p>{senvioSeleccionado[0].descripcionsolicitud}</p><br />
                    <h2>Destino de la solicitud: </h2><p>{senvioSeleccionado[0].destinosolicitud}</p><br />
                </div>
                <div className="Sol-env1__bgt">
                    <h2 className="Sol-env1__bg__crearenvio">Crear Envio</h2>
                    <div className="seleccionar">
                        <h2>Asignar <br></br>Repartidor:</h2>
                        <select name="repartidoractual" className="status" onChange={handleRepartidorSeleccionado}>
                            <option>No asignado</option>
                            {
                                repartidoresList.map((val) => {

                                    return (
                                        <React.Fragment key={val.idrepartidor}>
                                            <option key={val.idrepartidor} value={val.idrepartidor}>
                                                {val.nombrerepartidor}
                                            </option>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </select>
                        <Link to="/SolEnvInfo2"><button className="btn btn-primary">Continuar</button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default SolEnvInfo1;