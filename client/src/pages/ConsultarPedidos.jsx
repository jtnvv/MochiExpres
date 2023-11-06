import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import { Link } from "react-router-dom";
import Axios from "axios";
import ModuloClientes from "./ModuloClientes";
export const selClient = [];

const ConsultarPedidos = () => {
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
                            <h3 className="styleH3Clientes">Consultar pedidos</h3>
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

                                <div className="ModuloRepartidorContainer" onClick={showModal}>                 
                                    <Link  onClick={() => currentClient(val)} style={{ textDecoration: 'none' }}> 
                                        <ModuloClientes nombre={val.nombrecliente}  />
                                    </Link>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="modalConsultarContenedor" style={modalStyle}>
                <div className="containerModalEliminarRepartidor2">
                    <div className="eliminarModalConsulta" onClick={showModal}>X</div>
                    <div className="modalConsultarPedido">
                        <div className="row">
                            <h3>ID</h3>
                            <input type="text" disabled className="textareaInput"/>
                        </div>
                        <div className="row">
                            <h3>Fecha envío</h3>
                            <input type="text" disabled className="textareaInput"/>
                        </div>
                        <div className="row">
                            <h3>Fecha entrega</h3>
                            <input type="text" disabled className="textareaInput"/>
                        </div>
                        <div className="row">
                            <h3>Estado</h3>
                            <input type="text" disabled className="textareaInput"/>
                        </div>
                        <div className="row">
                            <h3>Tarifa</h3>
                            <input type="text" disabled className="textareaInput"/>
                        </div>
                        <div className="row">
                            <h3>Peso</h3>
                            <input type="text" disabled className="textareaInput"/>
                        </div>
                        <div className="row">
                            <h3>Descripción</h3>
                            <input type="text" disabled className="textareaInput"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ConsultarPedidos;