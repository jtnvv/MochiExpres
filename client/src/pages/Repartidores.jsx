import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styled from 'styled-components';
export const selDealer = [];


function Repartidores () {

    const [dealersList, setDealers] = useState([])

    const getDealers =()=>{
        Axios.get("http://localhost:3006/dealers").then((response)=>{
        setDealers(response.data);
    })
    }

    const [selectedDealer, setSelectedDealer] = useState([])

    const currentDealer =(Dealer) => {
           selDealer.pop();
           selDealer.push(Dealer)

    }

    useEffect(()=>{
        getDealers();
    },[])
    
    return (
        
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                
                <div className="ItemsContainer">
                    ola soy un repartidor
                    <Link to="/Home" className="ClientesInfo"> Volver</Link>
                    <div className="lista">
                    
                    {                               
                                dealersList.map((val,key)=>{
                                    return <li key={key}>
                                    <div className="divBodyPersonalInfo">                                   
                                    <h2 className="usernameTxt">
                                        <Link to="/RepartidoresInfo" onClick={() => currentDealer(val)}> {val.nombrerepartidor} </Link>  
                                    </h2> 

                                </div>
                                </li>
                                })
                            }
                    </div>
                    <div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
};
export default Repartidores;