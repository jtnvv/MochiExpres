import React, { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";

const ModuloAuditoria = (props) => {

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
                    console.log("nombre del repa: ", res.nombrerepartidor);
                }else{
                    setNombreRepartidor("No asignado");
                }

            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidor();
    }, [nombreRepartidor]);

    return (
        <div className="moduloAuditoria" >
            <h3 className="text_i">{props.tipo}</h3>
            <h3 className="text">{props.usuario}</h3>
            <h3 className="text">{props.accion}</h3>
            <h3 className="text">{props.archivo}</h3>
            <h3 className="text">{props.id}</h3>
            <h3 className="text_d">{props.fecha}</h3>

        </div>
    );
};
export default ModuloAuditoria;