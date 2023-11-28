import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { envioSeleccionado } from "./EnvClientes";
import { mensajeInformacion, mensajeExito } from "../components/mensajesAlerta.js";
import { AuthContext } from "../context/authContext.js";
import logo from '../img/Mochi.jpeg';


const EnviosClienteInfo = () => {
    const [nombreCliente, setNombreCliente] = useState("");
    const [nombreRepartidor, setNombreRepartidor] = useState("");   
    const { deleteEnvioId } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        idenvio: envioSeleccionado[0].idenvio,
        estadoenvio: envioSeleccionado[0].estadoenvio,
        idrepartidor: envioSeleccionado[0].idrepartidor,
    });
    const { getClienteSol } = useContext(AuthContext);
    const { getRepartidor } = useContext(AuthContext);
    const [err, setError] = useState(null);

    useEffect(() => {
        const obtenerCliente = async () => {
            try {
                //console.log(envioSeleccionado[0]);
                const res = await getClienteSol(envioSeleccionado[0].idsolicitudenvio);
                setNombreCliente(res.nombrecliente);
                //console.log(res.nombrecliente);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerCliente();
    }, [nombreCliente]);


    const handleAceptar = async (e) => {
        mensajeInformacion("¡Haz aceptado el envío! Debes esperar a la entrega.\n¡Gracias por confiar en nosotros!")
    };

    const handleNoAceptar = async (e) => {
        mensajeInformacion("¡Haz rechazado el envío! Este será borrado de tu historial.\nPara mayor información contacta con el administrador.");
        handleBorrar(e);
    };

    const handleBorrar = async (e) => {
            try {
                console.log("Identificador: ", envioSeleccionado[0].idenvio);
                if (envioSeleccionado[0].idenvio !== null) {
                    const res = await deleteEnvioId(envioSeleccionado[0].idenvio);
                    console.log("Ha salido bien :D", res);
                    mensajeExito("Se ha eliminado correctamente el envio ", envioSeleccionado[0].idenvio);
                }
            } catch (err) {
                setError(err.response.data);
            }
    } 

    useEffect(() => {
        const obtenerRepartidor = async () => {
            try {
                if (envioSeleccionado[0].idrepartidor !== null) {
                    //console.log(envioSeleccionado[0].idrepartidor);
                    const res = await getRepartidor(envioSeleccionado[0].idrepartidor);
                    setNombreRepartidor(res.nombrerepartidor);
                    //console.log(nombreRepartidor);
                } else {
                    setNombreRepartidor("No asignado");
                }

            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidor();
    }, [nombreRepartidor]);

    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Envíos</h3>
                        </div>
                        <div className="InfoBarImg">
                            <Link to="/RepartidoresInfo">
                                    <img className="imgPersonalInfo" src={logo} alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className="modalEnvioContenedor">
                        <div className="Container2modalEnvio">
                            <div className="modalEnvioContenedor2">
                                <div className="id ">
                                    <div className="idEnvio card">{envioSeleccionado[0].idenvio}</div>
                                    <div className="info card">
                                        <h3>NombreCliente</h3>
                                        <p>{nombreCliente}</p>
                                        <h3>Fecha envío realizado</h3>
                                        <p>{envioSeleccionado[0].fechaenviorealizado}</p>
                                        <h3>Fecha envío entregado</h3>
                                        <p>{envioSeleccionado[0].fechaenvioentregado || "Pendiente"}</p>
                                        <h3>Estado</h3>
                                        <p>{envioSeleccionado[0].estadoenvio}</p>

                                    </div>
                                </div>
                                <div className="contenedorTarifaInfo">
                                    <div className="tarifaInfo">
                                        <div className="tarifaDescripcion ">
                                            <div className="tarifa card">$ {envioSeleccionado[0].tarifaenvio}</div>
                                            <div className="Descripcion card">
                                                <h3>Descripcion paquete</h3>
                                                <textarea value={envioSeleccionado[0].descripcionpaquete} disabled name="" id="" cols="50" rows="30" className="descripcionText">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="personalInfo card">
                                            <div className="personalInfoImage">
                                                {/*<Link to="/RepartidoresInfo">*/}
                                                <img src={logo} alt="profileFoto" />
                                                {/*</Link>*/}
                                            </div>
                                            <h3>Repartidor</h3>
                                            <p>{nombreRepartidor}</p>
                                            <button className="btnPersonalInfo" onClick={handleAceptar}>Aceptar</button>
                                            <button className="btnPersonalInfo" onClick={handleNoAceptar}>No Aceptar</button>
                                            {/* 
                                            <select name="repartidoractual" className="status" onChange={handleRepartidorSeleccionado}>
                                                <option key={EnvClienteSeleccionado[0].idrepartidor || "0"} value={EnvClienteSeleccionado[0].idrepartidor || "0"}>
                                                    {nombreRepartidor.nombrerepartidor || "No asignado"}
                                                </option>
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
                                            {err && <p className="register__bg__error"> {err}</p>}
                                            <button type="submit" onClick={handleSubmit}>Actualizar</button>
                                            </select>*/}
                                        </div>
                                    </div>
                                    <div className="direccion">
                                        <h3>
                                            Destino
                                        </h3>
                                        <p>{envioSeleccionado[0].destinoenvio}</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EnviosClienteInfo;