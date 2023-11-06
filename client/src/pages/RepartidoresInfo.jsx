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
import { selDealer } from "./Repartidores";

const RepartidoresInfo = () => {

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
            <Sidebar/>
            <div className="divContent">
                <InfoBar />
                <div className="ItemsContainer">
                <div className="divContent">
                <div className="ItemsContainer-PersonalInfo">

                    <div className="divBodyPersonalInfo">
                        <div className="divLeftPersonalInfo">
                            <img className="imgLeftPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            <h2 className="usernameTxt">{selDealer[0].nombrerepartidor}</h2>
                            
                        </div>
                        <div className="divRightPersonalInfo">
                            <div className="top">
                                <h1 className="tittle">Datos del Repartidor</h1>
                                <ul>
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número telefónico: </p>
                                            <p className="content">{selDealer[0].telefonorepartidor}</p>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Correo electrónico: </p>
                                            <p className="content">{selDealer[0].correorepartidor}</p>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número identidad: </p>
                                            <p className="content">{selDealer[0].idrepartidor}</p>
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
export default RepartidoresInfo;