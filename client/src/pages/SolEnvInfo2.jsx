import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { senvioSeleccionado } from "./HabilitarSolicitud";
import { repartidorSeleccionadoexp } from "./SolEnvInfo1";
import { generarIdEnvio } from "../components/generarIdEnvio.js";
import { Link } from "react-router-dom";


const SolEnvInfo2 = () => {

    const [inputs] = useState({
        idenvio: generarIdEnvio(),
        descripcionpaquete: senvioSeleccionado[0].descripcionsolicitud,
        estadoenvio: "En bodega",
        tarifaenvio: senvioSeleccionado[0].tarifasolicitud,
        fechaenvioentregado: null,
        fechaenviorealizado: senvioSeleccionado[0].fechasolicitud,
        destinoenvio: senvioSeleccionado[0].destinosolicitud,
        idrepartidor: repartidorSeleccionadoexp[0],
        idsolicitudenvio: senvioSeleccionado[0].idsolicitudenvio,
    });
    const [err, setError] = useState(null);

    const { createEnvio } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            if (!inputs.idenvio || !inputs.descripcionpaquete || !inputs.estadoenvio || !inputs.tarifaenvio || !inputs.fechaenviorealizado || !inputs.destinoenvio || !inputs.idrepartidor || !inputs.idsolicitudenvio) {
                setError("Por favor llene los campos necesarios");
                return;
            }
            else {
                console.log(inputs);
                // const res = await createEnvio(inputs);
                // alert("Envio habilitado con éxito");
                // window.location.reload();
            }
        } catch (err) {
            setError(err.response.data);
        }

    }
    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Solicitud de envíos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar solicitud envío" />
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="Sol-env2__bg">
                        <div className="Sol-env2__bg__tarifa">
                            <button>Calcular tarifa</button>
                            <p>$ {senvioSeleccionado[0].tarifasolicitud}</p>
                        </div>
                        {err && <p className="register__bg__error"> {err}</p>}
                        <button onClick={handleSubmit}>Aceptar</button>
                        <Link to="/Home"><button>Rechazar</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SolEnvInfo2;