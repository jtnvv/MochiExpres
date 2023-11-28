import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloAuditoriaOperaciones from "./ModuloAuditoriaOperaciones"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from '../img/Mochi.jpeg';
export const EnvClienteSeleccionado = [];


function AuditoriaOperaciones() {
    const { currentUser } = useContext(AuthContext);
    const { getAuditoriaOperaciones } = useContext(AuthContext);

    const [err, setError] = useState(null);
    const [auditoriaOperacionesList, setAuditoriaOperacionesList] = useState([]);

    useEffect(() => {
        const obtenerAuditoriaOperaciones = async () => {
            try {
                const res = await getAuditoriaOperaciones();
                setAuditoriaOperacionesList(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerAuditoriaOperaciones();
    }, []);


    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Auditoria">Registro de auditoría - operaciones</h3>
                        </div>
                        <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="Auditoria">
                        <div className="containerAuditoria">
                            <div className="header">
                                <h3 className="text_i">ID Auditoria</h3>
                                <h3 className="text">Tipo de usuario</h3>
                                <h3 className="text">ID usuario</h3>
                                <h3 className="text">Nombre usuario</h3>
                                <h3 className="text">Acción</h3>
                                <h3 className="text">Archivo</h3>
                                <h3 className="text">ID objeto</h3>
                                <h3 className="text">Detalle</h3>
                                <h3 className="text">Resultado</h3>
                                <h3 className="text_d">Fecha</h3>
                            </div>
                            <div className="container">
                                {
                                    auditoriaOperacionesList.map((auditoriaOperaciones) => {
                                        return (
                                            console.log("Aca: ", auditoriaOperaciones),
                                            <React.Fragment key={auditoriaOperaciones.aud_id}>
                                                <ModuloAuditoriaOperaciones
                                                    aud_id={auditoriaOperaciones.aud_id}
                                                    aud_tipousuario={auditoriaOperaciones.aud_tipousuario}
                                                    aud_idusuario={auditoriaOperaciones.aud_idusuario}
                                                    aud_nombreusuario={auditoriaOperaciones.aud_nombreusuario}
                                                    aud_accion={auditoriaOperaciones.aud_accion}
                                                    aud_archivo={auditoriaOperaciones.aud_archivo}
                                                    aud_idobjeto={auditoriaOperaciones.aud_idobjeto}
                                                    aud_detalle={auditoriaOperaciones.aud_detalle}
                                                    aud_resultado={auditoriaOperaciones.aud_resultado}
                                                    aud_fecha={auditoriaOperaciones.aud_fecha}>
                                                </ModuloAuditoriaOperaciones>
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuditoriaOperaciones;