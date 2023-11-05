import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
export const selClient = [];


function Clientes () {

    const [clientsList, setClients] = useState([]);
    const { getClientes } = useContext(AuthContext);

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
    
    return (
        
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                
                <div className="ItemsContainer">
                    ola soy un cliente
                    <Link to="/Home" className="ClientesInfo"> Volver</Link>
                    <div className="lista">
                    
                    {
                                
                                clientsList.map((val,key)=>{
                                    return <li key={key}>
                                    <div className="divBodyPersonalInfo">
                                    
                                    <h2 className="usernameTxt">
                                        <Link to="/ClientesInfo" onClick={() => currentClient(val)}> {val.nombrecliente} </Link>  
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
export default Clientes;
