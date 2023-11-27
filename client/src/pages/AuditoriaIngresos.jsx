import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloAuditoriaIngresos from "./ModuloAuditoriaIngresos"
import { AuthContext } from "../context/authContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const auditoriaIngresosSeleccionado = [];

function AuditoriaIngresos() {
    const { currentUser } = useContext(AuthContext);
    const { getAuditoriaLog } = useContext(AuthContext);

    const [err, setError] = useState(null);
    const [auditoriaIngresosList, setAuditoriaIngresosList] = useState([]);

    // const [identificador, setIdentificador] = useState({
    //     aud_id: ""
    // });

    // useEffect(() => {
    //     console.log(identificador);
    // }, [identificador]);

    // const currentAuditoriaIngresos = (auditoriaIngresos) => {
    //     auditoriaIngresosSeleccionado.pop();
    //     auditoriaIngresosSeleccionado.push(auditoriaIngresos);

    // }

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

    const [divStyle, setDivStyle] = useState({});
    const [clicked, setClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [clickedModal, setClickedModal] = useState(false);
    const navigate = useNavigate();

    // const handleButtonClick = () => {
    //     if (!clicked) {
    //         setDivStyle({ visibility: 'visible' });
    //     } else {
    //         setDivStyle({ visibility: 'hidden' });
    //     }
    //     setClicked(!clicked);
    // };
    // const showModal = () => {
    //     if (!clickedModal) {
    //         setModalStyle({ visibility: 'visible' });
    //         console.log(identificador);
    //         setIdentificador({ aud_id: aud_id });
    //         console.log(identificador);
    //     } else {
    //         setModalStyle({ visibility: 'hidden' });
    //     }
    //     setClickedModal(!clickedModal);
    // };

    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Auditoria">Registro de auditoría - Ingresos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor containerBusquedaEnvClientes">
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            </div>
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