import React, { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";

const ModuloEnvio = (props) => {

    const { getClienteSol } = useContext(AuthContext);
    const { getRepartidor } = useContext(AuthContext);

    const [nombreCliente, setNombreCliente] = useState("");
    const [nombreRepartidor, setNombreRepartidor] = useState("");

    useEffect(() => {
        const obtenerCliente = async () => {
            try {
                console.log(props.idsolicitudenvio);
                const res = await getClienteSol(props.idsolicitudenvio);
                setNombreCliente(res.nombrecliente);
                console.log(res.nombrecliente);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerCliente();
    }, [nombreCliente]);

    useEffect(() => {
        const obtenerRepartidor = async () => {
            try {
                if (props.idrepartidor !== null) {
                    const res = await getRepartidor(props.idrepartidor);
                    setNombreRepartidor(res.nombrerepartidor);
                    console.log(nombreRepartidor);
                }else{
                    setNombreRepartidor("No asignado");
                }

            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidor();
    }, [props.idrepartidor]);

    return (
        <div className="content-flex-module-Envio" >
            <h2>{props.idenvio}</h2>
            <h3>{nombreCliente}</h3>
            <div className="fecha">
                <h3>{props.fechaenviorealizado}</h3>
                <h3>{props.fechaenvioentregado}</h3>
            </div>
            <h3>{nombreRepartidor}</h3>
            <h3>{props.tarifaenvio}</h3>

        </div>
    );
};
export default ModuloEnvio;