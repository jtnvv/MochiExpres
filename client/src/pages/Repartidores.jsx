import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloRepartidor from "./ModuloRepartidor"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from '../img/Mochi.jpeg';
export const repartidorSeleccionado = [];


function Repartidores() {

    const [repartidoresList, setRepartidores] = useState([]);
    const { getRepartidores } = useContext(AuthContext);
    const { deleteRepartidor } = useContext(AuthContext);
    //const { repartidores } = useContext(AuthContext);

    const [identificador, setIdentificador] = useState({
        idrepartidor: ""
    });

    useEffect(() => {
        console.log(identificador);
    }, [identificador]);

    const [err, setError] = useState(null);

    const currentRepartidor = (repartidor) => {
        repartidorSeleccionado.pop();
        repartidorSeleccionado.push(repartidor);

    }

    useEffect(() => {
        const obtenerRepartidores = async () => {
            try {
                const res = await getRepartidores();

                setRepartidores(res);

            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidores();

    }, []);

    const [divStyle, setDivStyle] = useState({});
    const [clicked, setClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [clickedModal, setClickedModal] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (!clicked) {
            setDivStyle({ visibility: 'visible' });
        } else {
            setDivStyle({ visibility: 'hidden' });
        }
        setClicked(!clicked);
    };
    const showModal = (idrepartidor) => {
        if (!clickedModal) {
            setModalStyle({ visibility: 'visible' });
            console.log(idrepartidor);
            setIdentificador({ idrepartidor: idrepartidor });
            console.log(identificador);
        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };

    const handleEliminarRepartidor = async (e) => {
        try {
            console.log("Identificador: ", identificador);
            if (identificador.idrepartidor !== null) {
                const res = await deleteRepartidor(identificador.idrepartidor);
                console.log("Ha salido bien :D", res);
                window.location.reload();
            }
        } catch (err) {
            setError(err.response.data);
        }
    }
    const handleRedirect = () => { navigate("/AgregarRepartidor") };

    return (

        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">

                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <button className="buttonRepartidorStyle" onClick={handleRedirect}>Agregar Repartidor</button>
                            <button className="buttonRepartidorStyle" onClick={handleButtonClick}>Eliminar Repartidor</button>
                        </div>
                        <div className="InfoBarImg">
                            <img className="imgPersonalInfo" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="lista">{
                        repartidoresList.map((val) => {
                            return (
                                <React.Fragment key={val.idrepartidor}>
                                    <div className="ModuloRepartidorContainer">
                                        <div className="eliminarModulo" onClick={() => showModal(val.idrepartidor)} style={divStyle}>X</div>
                                        <Link to="/RepartidoresInfo" onClick={() => currentRepartidor(val)} style={{ textDecoration: 'none' }}>
                                            <ModuloRepartidor nombre={val.nombrerepartidor} />
                                        </Link>
                                    </div>

                                    <div className="modalEliminarRepartidorContenedor" style={modalStyle}>
                                        <div className="containerModalEliminarRepartidor2">
                                            <div className="eliminarModalRepartidor" onClick={() => showModal(val.idrepartidor)}>X</div>
                                            <div className="modalEliminarRepartidor">
                                                <h3>¿Estás seguro de eliminar al repartidor?</h3>
                                                <p>Al eliminar al repartidor se borraran todos sus envíos hechos</p>
                                                <button onClick={handleEliminarRepartidor}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>

                                </React.Fragment>

                            );
                        })
                    }
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Repartidores;