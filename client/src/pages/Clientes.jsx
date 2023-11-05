import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styled from 'styled-components';
import ModuloClientes from "./ModuloClientes";
export const selClient = [];


function Clientes () {

    const [clientsList, setClients] = useState([])

    const getClients =()=>{
        Axios.get("http://localhost:3005/clients").then((response)=>{
        setClients(response.data);
        console.log(typeof(response))
    })
    }

    const [selectedClient, setSelectedClient] = useState([])

    const currentClient =(Client) => {
           selClient.pop();
           selClient.push(Client)

    }

    useEffect(()=>{
        getClients();
    },[])
    
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
            <Sidebar/>
            <div className="divContent">
                <div className="ItemsContainer">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Clientes</h3>
                            <button className="buttonRepartidorStyle" onClick={handleButtonClick}>Eliminar Cliente</button>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Cliente"/>
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo"  src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="lista">{
                        clientsList.map((val,key)=>{
                            return(

                                <div className="ModuloRepartidorContainer">                                
                                    <div className="eliminarModulo" onClick={showModal} style={divStyle}>X</div>
                                    <Link to="/ClientesInfo" onClick={() => currentClient(val)} style={{ textDecoration: 'none' }}> 
                                        <ModuloClientes nombre={val.nombrecliente}  />
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
                        <h3>¿Estás seguro de eliminar al cliente?</h3>
                        <p>Al eliminar al cliente, sus solicitudes y envíos serán eliminados</p>
                        <button>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Clientes;
