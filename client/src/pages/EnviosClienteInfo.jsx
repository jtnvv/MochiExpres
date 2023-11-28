import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { envioSeleccionado } from "./EnvClientes";
import { mensajeInformacion, mensajeExito } from "../components/mensajesAlerta.js";
import { AuthContext } from "../context/authContext.js";



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
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="" />
                            <div className="InfoBarImg">
                                <Link to="/RepartidoresInfo">
                                    <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                                </Link>
                            </div>
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
                                                <img src="data:image/jpeg;base64,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" alt="profileFoto" />
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