import React from "react";
import Sidebar from "./Sidebar";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import * as RiIcons from "react-icons/ri";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useState } from "react";
const PersonalInfo = () => {

    const { currentUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="content-flex">
                <Sidebar />
                <div className="divContent">
                    <div className="ItemsContainer-PersonalInfo">
                        <div className="divHeaderPersonalInfo">
                            <p><i><IoIcons.IoCaretBackOutline className="IoIconsPersonalInfo" /></i> Volver</p>
                            <p className="photo">{currentUser?.nombreusuario}<img src="https://i.imgur.com/T9X0JHm.jpg" alt="" /></p>
                        </div>
                        <div className="divBodyPersonalInfo">
                            <div className="divLeftPersonalInfo">
                                <img className="imgLeftPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                                <h2 className="usernameTxt">{currentUser?.nombreusuario}</h2>
                                <h2 className="rolTxt">Rol: {currentUser?.tipousuario}</h2>
                            </div>
                            <div className="divRightPersonalInfo">
                                <div className="top">
                                    <h1 className="tittle">Tus datos personales</h1>
                                    <ul>
                                        <li>
                                            <div className="p">
                                                <p className="p-list">Número telefónico: </p>
                                                <p className="content">{currentUser?.telefonousuario}</p>
                                            </div>
                                        </li><br />
                                        <li>
                                            <div className="p">
                                                <p className="p-list">Correo electrónico: </p>
                                                <p className="content">{currentUser?.correousuario}</p>
                                            </div>
                                        </li><br />
                                        <li>
                                            <div className="p">
                                                <p className="p-list">Número identidad: </p>
                                                <p className="content">{currentUser?.idusuario}</p>
                                            </div>
                                        </li><br />
                                        <li>
                                            <div className="p">
                                                <p className="p-list">Pregunta de seguridad: </p>
                                                <p className="content">{getPreguntaSeguridad(currentUser?.identificadorpregusuario)}</p>
                                            </div>
                                        </li><br />
                                    </ul>
                                </div>
                                <div className="bottom">
                                    <div className="flex">
                                        <div className="div">
                                            <p>¿Deseas cambiar tu contraseña?.</p>
                                            <button type="submit" onClick={() => setShowModal(true)}>Cambiar!</button>
                                        </div>
                                        <div className="div">
                                            <p>¿Deseas actualizar tus datos?.</p>
                                            <Link to="/Actualiza-personal-Info"><button type="submit">Actualizar!</button></Link>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && 
            (<div className="VentanaModel">
                <Overlay>
                    <ContenedorModal>
                        <EncabezadoModal>
                            <h3>Cambiar Contraseña</h3>
                        </EncabezadoModal>

                        <Contenido>
                            <form>
                                <h2>Inserta tu nombre de usuario</h2>
                                <input type="text" placeholder="Usuario" />
                                <h2>Inserta tu anterior contraseña</h2>
                                <input type="password" placeholder="Contraseña" />
                                <h2>Inserta tu nueva contraseña</h2>
                                <input type="password" placeholder="Nueva Contraseña" />
                            </form>
                        </Contenido>
                        <Boton>Confirmar</Boton>
                        <BotonCerrar onClick={handleCloseModal}><RiIcons.RiCloseFill className="IconClose" /></BotonCerrar>
                    </ContenedorModal>

                </Overlay>
            </div>)}
        </>
    );
};
export default PersonalInfo;




const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);

    display:flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorModal = styled.div`
    align-items: center;
    //justify-content: center;
    width: 60vw;
    min-height: 100px;
    background: #76a3aa;
    position: relative;
    border-radius: 25px;
    box-shadow:rgba(100,100,111,0.2);
    padding: 0px;
    border: 2px solid #E8E8E8;
    height: 80vh;
    display:flex;
    flex-direction: column;
    
`;

const EncabezadoModal = styled.div`
    height: 100px;
    display: flex;
    //align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    padding-bottom: 2px;
    border-bottom: 2px solid #E8E8E8;
    width: 70%;

    display:flex;
    justify-content: center;
    align-items: flex-start;
    h3{
        font-family: Coiny, cursive;
        font-weight: 500;
        font-size: 30px;
        color: #fff;
    }

`;

const BotonCerrar = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #fff;

    &:hover {
        background: #f2f2f2;
    }

`;

const Boton = styled.button`
  display: block;
  padding: 1px 3px;
  border-radius: 70px;
  color: #3289A0;
  background: #F7D4C1;
  cursor: pointer;
  font-family: Coiny, cursive;
  font-weight: 10px;
  transition: .3s ease all;
  border: none;
  font-size: 20px;

  &:hover{
    background: #fff;
  }

  width: 150px;
  height: 40px;
`;

const Contenido = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    h2{
        padding-left: 2rem;
        margin-left: 0px;
        font-size: 18px;
        font-weight: 700;
        font-family: Comfortaa, cursive;
        color: #fff; 
        align-items: left;
    }

    input{
        display: flex;
        text-align: center;
        margin-bottom: 50px;
        border-radius: 10px;
        height: 30px;
        border: none;
        margin-left: 15%;
        font-family: Coiny, cursive;
        color: #3289A0; 
    }
`;