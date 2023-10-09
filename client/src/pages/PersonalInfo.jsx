import React from "react";
import Sidebar from "./Sidebar";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import * as RiIcons from "react-icons/ri";
const PersonalInfo = () => {
    return (
        <>
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <div className="ItemsContainer-PersonalInfo">
                    <div className="divHeaderPersonalInfo">
                        <p><i><IoIcons.IoCaretBackOutline  className="IoIconsPersonalInfo"/></i> Volver</p>
                        <p className="photo">Nombre de usuario <img src="data:image/jpeg;base64,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" alt="" /></p>
                        
                        
                    </div>
                    <div className="divBodyPersonalInfo">
                        <div className="divLeftPersonalInfo">
                            <img className="imgLeftPersonalInfo" src="data:image/jpeg;base64,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" alt="" />
                            <h2 className="usernameTxt">Nombre de Usuario</h2>
                            <h2 className="rolTxt">"Rol"</h2>
                        </div>
                        <div className="divRightPersonalInfo">
                            <div className="top">    
                                <h1 className="tittle">Tus datos personales</h1>
                                <ul>
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número telefónico: </p>
                                            <p className="content">+57 ( 321 ) - 747 5876.</p>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Correo electrónico: </p>
                                            <p className="content">NombreU @ correo.ext.</p>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número identidad: </p>
                                            <p className="content">1231231231.</p>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Pregunta de seguridad: </p>
                                            <p className="content">"Pregunta seleccionada".</p>
                                        </div>
                                    </li><br />
                                </ul>
                            </div>
                            <div className="bottom">
                                <div className="flex">
                                    <div className="div">
                                        <p>¿Deseas cambiar tu contraseña?.</p>
                                        <button type="submit">Cambiar!</button>
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
        <div className="VentanaModel">
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
                <BotonCerrar><RiIcons.RiCloseFill className="IconClose"/></BotonCerrar>
            </ContenedorModal>
            
        </Overlay>
        </div>
        </>
    );
};
export default PersonalInfo;
  
    


const Overlay=styled.div`
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

const ContenedorModal=styled.div`
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

const EncabezadoModal= styled.div`
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

const BotonCerrar=styled.button`
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