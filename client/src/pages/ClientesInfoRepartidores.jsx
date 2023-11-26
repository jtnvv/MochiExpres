import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import * as RiIcons from "react-icons/ri";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { selectedClient } from "./EnviosInfoRepartidores";

const ClientesInfo = () => {

    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    const [inputs, setInputs] = useState({
        idusuario: currentUser?.idusuario

    });

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { updatepass, getinfouser, checkpass } = useContext(AuthContext);

    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                    <div className="divContent">
                        <div className="ItemsContainer-PersonalInfo">

                            <div className="divBodyPersonalInfo">
                                <div className="divLeftPersonalInfo">
                                    <img className="imgLeftPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                                    <h2 className="usernameTxt">{selectedClient[0].nombrecliente}</h2>

                                </div>
                                <div className="divRightPersonalInfo">
                                    <div className="top">
                                        <h1 className="tittle">Datos del cliente</h1>
                                        <ul>
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Número telefónico: </p>
                                                    <p className="content">{selectedClient[0].telefonocliente}</p>
                                                </div>
                                            </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Correo electrónico: </p>
                                                    <p className="content">{selectedClient[0].correocliente}</p>
                                                </div>
                                            </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Identificador de usuario: </p>
                                                    <p className="content">{selectedClient[0].idCliente}</p>
                                                </div>
                                            </li><br />

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ClientesInfo;