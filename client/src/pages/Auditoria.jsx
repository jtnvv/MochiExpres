import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloAuditoria from "./ModuloAuditoria"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
import logo from '../img/Mochi.jpeg';
export const EnvClienteSeleccionado = [];


function Auditoria() {
    const { currentUser } = useContext(AuthContext);
    const [EnvCliente, setEnvCliente] = useState([]);
    const { getSolicitudIdCliente } = useContext(AuthContext);
    const { deleteEnvCliente } = useContext(AuthContext);
    //const { repartidores } = useContext(AuthContext);
    const [identificador, setIdentificador] = useState({
        idsolicitudenvio: ""
    });

    // useEffect(() => {
    //     console.log(identificador);
    // }, [identificador]);

    const [err, setError] = useState(null);

    const currentSolicitud = (solicitud) => {
        EnvClienteSeleccionado.pop();
        EnvClienteSeleccionado.push(solicitud);

    }

    useEffect(() => {
        const obtenerSolicitudes = async () => {
            try {
                const res = await getSolicitudIdCliente(currentUser.idusuario);
                setEnvCliente(res);

            } catch (err) {
                console.log(err);
            }
        };
        obtenerSolicitudes();
    }, []);


    useEffect(() => {

    }, [EnvCliente]);
    // useEffect(() => {
    //     console.log("Aqui esta la respuesta");
    //     console.log(repartidoresList);
    // }, [repartidoresList]);

    const navigate = useNavigate();

   
    const handleEliminarEnvCliente = async (e) => {
        try {
            console.log("Identificador: ", identificador);
            if (identificador.idsolicitudenvio !== null) {
                const res = await deleteEnvCliente(identificador.idsolicitudenvio);
                console.log("Ha salido bien :D", res);
                window.location.reload();
            }
        } catch (err) {
            setError(err.response.data);
        }
    }
    const handleRedirect = () => { navigate("/AgregarEnvCliente") };

    return (
        console.log(EnvCliente),
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Auditoria">Registro de auditoría</h3>
                        </div>
                        <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="Auditoria">
                        <div className="containerAuditoria">
                            <div className="header">
                                <h3 className="text_i">Tipo de usuario</h3>
                                <h3 className="text">Usuario</h3>
                                <h3 className="text">Acción</h3>
                                <h3 className="text">Archivo</h3>
                                <h3 className="text">ID</h3>
                                <h3 className="text_d">Fecha</h3>
                            </div>
                            <div className="container">
                                <ModuloAuditoria tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456123131dasdasdasasasF" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="cliente" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="repartidor" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                                <ModuloAuditoria tipo="admin" usuario="Ivana" accion="eliminar modulo"
                                archivo="perro.txt" id="34456F" fecha="17/07/2003 23:00h"></ModuloAuditoria>
                            
                            
                            </div>
                        </div>
                    </div>
                    
                
                    
                
                </div>
            </div>

        </div>
    );
};
export default Auditoria;