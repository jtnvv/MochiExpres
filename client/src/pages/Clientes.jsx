import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
export const clienteSeleccionado = [];


function Clientes() {

    const [clientesList, setClientes] = useState([]);
    const { getClientes } = useContext(AuthContext);

    const currentCliente = (cliente) => {
        clienteSeleccionado.pop();
        clienteSeleccionado.push(cliente);
    }

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const res = await getClientes();
                setClientes(res);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerClientes();
    }, [])

    return (

        <div className="content-flex">
            <Sidebar />
            <div className="divContent">

                <div className="ItemsContainer">
                    ola soy un cliente
                    <Link to="/Home" className="ClientesInfo"> Volver</Link>
                    <div className="lista">
                        {
                            clientesList.map((val) => {
                                return (
                                    <div className="divBodyPersonalInfo">
                                        <h2 className="usernameTxt">
                                            <Link to="/ClientesInfo" onClick={() => currentCliente(val)}> {val.nombrecliente} </Link>
                                        </h2>
                                    </div>
                                );
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
