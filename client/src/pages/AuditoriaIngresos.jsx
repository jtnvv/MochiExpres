import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloAuditoriaIngresos from "./ModuloAuditoriaIngresos"
import { AuthContext } from "../context/authContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from '../img/Mochi.jpeg';

export const auditoriaIngresosSeleccionado = [];

function AuditoriaIngresos() {
    const { currentUser } = useContext(AuthContext);
    const { getAuditoriaLog } = useContext(AuthContext);

    const [err, setError] = useState(null);
    const [auditoriaIngresosList, setAuditoriaIngresosList] = useState([]);

    useEffect(() => {
        const obtenerAuditoriaIngresos = async () => {
            try {
                const res = await getAuditoriaLog();
                setAuditoriaIngresosList(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerAuditoriaIngresos();
    }, []);


    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Auditoria">Registro de auditoría - Ingresos</h3>
                        </div>
                        <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="Auditoria">
                        <div className="containerAuditoria">
                            <div className="header2">
                                <h3 className="text_i">ID Auditoria</h3>
                                <h3 className="text">Tipo usuario</h3>
                                <h3 className="text">Identificador usuario</h3>
                                <h3 className="text">Nombre usuario</h3>
                                <h3 className="text">Tipo de log</h3>
                                <h3 className="text">Detalle</h3>
                                <h3 className="text">Resultado</h3>
                                <h3 className="text_d">Fecha</h3>
                            </div>
                            <div className="container">
                                {
                                    auditoriaIngresosList.map((auditoriaIngresos) => {
                                        return (
                                            console.log("Aca: ", auditoriaIngresos),
                                            <React.Fragment key={auditoriaIngresos.aud_id}>
                                                <ModuloAuditoriaIngresos
                                                    aud_id={auditoriaIngresos.aud_id}
                                                    aud_tipousuario={auditoriaIngresos.aud_tipousuario}
                                                    aud_idusuario={auditoriaIngresos.aud_idusuario}
                                                    aud_nombreusuario={auditoriaIngresos.aud_nombreusuario}
                                                    aud_tipolog={auditoriaIngresos.aud_tipolog}
                                                    aud_detalle={auditoriaIngresos.aud_detalle}
                                                    aud_resultado={auditoriaIngresos.aud_resultado}
                                                    aud_fecha={auditoriaIngresos.aud_fecha}
                                                ></ModuloAuditoriaIngresos>
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
export default AuditoriaIngresos;