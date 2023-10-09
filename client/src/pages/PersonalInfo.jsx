import React from "react";
import Sidebar from "./Sidebar";
import * as IoIcons from "react-icons/io5";
const PersonalInfo = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <div className="ItemsContainer-PersonalInfo">
                    <div className="divHeaderPersonalInfo">
                        <p><i><IoIcons.IoCaretBackOutline  className="IoIconsPersonalInfo"/></i> Volver</p>
                        <p className="photo">Nombre de usuario <img src="https://i.imgur.com/T9X0JHm.jpg" alt="" /></p>
                    </div>
                    <div className="divBodyPersonalInfo">
                        <div className="divLeftPersonalInfo">
                            <img className="imgLeftPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
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
                                        <button type="submit">Actualizar!</button>
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
export default PersonalInfo;