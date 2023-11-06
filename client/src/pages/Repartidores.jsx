import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloRepartidor from "./ModuloRepartidor"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import * as BsIcons from "react-icons/bs";
export const repartidorSeleccionado = [];


function Repartidores() {

    const [repartidoresList, setRepartidores] = useState([]);
    const { getRepartidores } = useContext(AuthContext);
    //const { repartidores } = useContext(AuthContext);



    const [selectedDealer, setSelectedDealer] = useState([])

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

    useEffect(() => {
        console.log("Aqui esta la respuesta");
        console.log(repartidoresList);
    }, [repartidoresList]);

    const [divStyle, setDivStyle] = useState({ });
    const [clicked, setClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({ });
    const [clickedModal, setClickedModal] = useState(false);
    
    
    const handleButtonClick = () => {
      if (!clicked){
        setDivStyle({ visibility: 'visible' });
      }else{
        setDivStyle({ visibility: 'hidden' });
      }
      setClicked(!clicked);
    };
    const showModal = () => {
        if (!clickedModal){
            setModalStyle({ visibility: 'visible' });
        }else{
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
      };

    return (

        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <div className="ItemsContainer">
                    
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <button className="buttonRepartidorStyle" >Agregar Repartidor</button>
                            <button className="buttonRepartidorStyle" onClick={handleButtonClick}>Eliminar Repartidor</button>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Repartidor"/>
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo"  src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="lista">{
                        repartidoresList.map((val) => {
                            return (
                                <div className="ModuloRepartidorContainer">                                
                                    <div className="eliminarModulo" onClick={showModal} style={divStyle}>X</div>
                                    <Link to="/RepartidoresInfo" onClick={() => currentRepartidor(val)} style={{ textDecoration: 'none' }}> 
                                        <ModuloRepartidor nombre={val.nombrerepartidor}  />
                                    </Link>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="modalEliminarRepartidorContenedor" style={modalStyle}>
                <div className="containerModalEliminarRepartidor2">
                    <div className="eliminarModalRepartidor" onClick={showModal}>X</div>
                    <div className="modalEliminarRepartidor">
                        <h3>¿Estás seguro de eliminar al repartidor?</h3>
                        <p>Al eliminar al repartidor se borraran todos sus envíos hechos</p>
                        <button>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Repartidores;