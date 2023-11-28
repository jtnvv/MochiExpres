import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { selectedE } from "./EnviosAsignados.jsx";
import { getEstado, obtenerValorEstado } from "../components/estadosEnvio.js";
export const selectedClient = [];

const EnviosInfoRepartidores = () => {

    const { updateEnvioEstado, updateEnvioRepartidor } = useContext(AuthContext);

    const [nombreCliente, setNombreCliente] = useState("");
    const [nombreRepartidor, setNombreRepartidor] = useState("");
    const { getRepartidores } = useContext(AuthContext);
    const [repartidoresList, setRepartidoresList] = useState([]);
    const [repartidorSeleccionado, setRepartidorSeleccionado] = useState([]);
    const [estadoactualenvio, setEstadoEnvio] = useState("");
    const [err, setError] = useState(null);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const navigate = useNavigate();


    const [inputs, setInputs] = useState({
        idenvio: selectedE[0].idenvio,
        estadoenvio: selectedE[0].estadoenvio,
        idrepartidor: selectedE[0].idrepartidor,
    });

    const handleEstadoEnvioChange = (event) => {
        setEstadoEnvio(event.target.value);

        console.log("Se selecciono: ", estadoactualenvio);
    };
    const { getClienteSol } = useContext(AuthContext);
    const { getRepartidor } = useContext(AuthContext);


    useEffect(() => {
        const obtenerRepartidores = async () => {
            try {
                const res = await getRepartidores();
                //console.log(res);
                setRepartidoresList(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidores();
    }, []);


    const handleRepartidorSeleccionado = (e) => {
        const idrepartidor = e.target.value;
        console.log(repartidoresList);
        const reparSele = repartidoresList.find((repartidor) => repartidor.idrepartidor === (idrepartidor));
        setRepartidorSeleccionado(reparSele || {});

        console.log("Se selecciono: ", reparSele);
    }

    useEffect(() => {

    }, [repartidoresList]);

    useEffect(() => {
        setInputs(prev => ({ ...prev, idrepartidor: repartidorSeleccionado.idrepartidor }));
    }, [repartidorSeleccionado]);

    useEffect(() => {
        console.log("Se selecciono: ", estadoactualenvio);
        let estado = getEstado(parseInt(estadoactualenvio));
        setInputs(prev => ({ ...prev, estadoenvio: estado }));
    }, [estadoactualenvio]);

    useEffect(() => {
        const obtenerCliente = async () => {
            try {
                //console.log(envioSeleccionado[0]);
                const res = await getClienteSol(selectedE[0].idsolicitudenvio);
                setNombreCliente(res.nombrecliente);
                selectedClient.pop();
                selectedClient.push(res);
                //console.log(res.nombrecliente);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerCliente();
    }, [nombreCliente]);

    useEffect(() => {
        const obtenerRepartidor = async () => {
            try {
                if (selectedE[0].idrepartidor !== null) {
                    //console.log(envioSeleccionado[0].idrepartidor);
                    const res = await getRepartidor(selectedE[0].idrepartidor);
                    setNombreRepartidor(res);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);

        try {
            await updateEnvioEstado(inputs);
            console.log("Se actualizo el estado");
            setShouldNavigate(true);
        } catch (err) {
            setError(err.response.data);
        }
    }

    useEffect(() => {
        if (shouldNavigate) {
            navigate("/EnviosAsignados");
        }
    }, [shouldNavigate]);

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
                                <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="modalEnvioContenedor">
                        <div className="Container2modalEnvio">
                            <div className="modalEnvioContenedor2">
                                <div className="id ">
                                    <div className="idEnvio card">{selectedE[0].idenvio}</div>
                                    <div className="info card">
                                        <h3>NombreCliente</h3>
                                        <p>{nombreCliente}</p>
                                        <h3>Fecha envío realizado</h3>
                                        <p>{selectedE[0].fechaenviorealizado}</p>
                                        <h3>Fecha envío entregado</h3>
                                        <p>{selectedE[0].fechaenvioentregado || "Pendiente"}</p>
                                        <h3>Estado</h3>
                                        <select name="estadoenvioactual" className="status" onChange={handleEstadoEnvioChange}>
                                            <option value={obtenerValorEstado(selectedE[0].estadoenvio)}>{getEstado(obtenerValorEstado(selectedE[0].estadoenvio))}</option>
                                            <option value="1">{getEstado(1)}</option>
                                            <option value="2">{getEstado(2)}</option>
                                            <option value="3">{getEstado(3)}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="contenedorTarifaInfo">
                                    <div className="tarifaInfo">
                                        <div className="tarifaDescripcion ">
                                            <div className="tarifa card">$ {selectedE[0].tarifaenvio}</div>
                                            <div className="Descripcion card">
                                                <h3>Descripcion paquete</h3>
                                                <textarea value={selectedE[0].descripcionpaquete} disabled name="" id="" cols="50" rows="30" className="descripcionText">
                                                </textarea>
                                            </div>
                                        </div>


                                        <div className="personalInfo card" >

                                            <div className="personalInfoImage" >


                                                <img src="https://i.imgur.com/bzO2izE.png" alt="profileFoto" />

                                            </div>

                                            <h3>Cliente</h3>
                                            <Link to="/ClientesInfoRepartidores">
                                                <h3>{nombreCliente}</h3>
                                            </Link>
                                            {err && <p className="register__bg__error"> {err}</p>}
                                            <button type="submit" onClick={handleSubmit}>Actualizar</button>

                                        </div>

                                    </div>
                                    <div className="direccion">
                                        <h3>
                                            Dirección
                                        </h3>
                                        <p>{selectedE[0].destinoenvio}</p>
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
export default EnviosInfoRepartidores;