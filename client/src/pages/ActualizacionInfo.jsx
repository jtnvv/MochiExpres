import React from "react";
import Sidebar from "./Sidebar";
import * as IoIcons from "react-icons/io5";


const Actualiza = () => {
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <div className="ItemsContainer-PersonalInfo">
                    <div className="divHeaderPersonalInfo">
                        <p><i><IoIcons.IoCaretBackOutline  className="IoIconsPersonalInfo"/></i> Volver</p>
                        <p className="photo">Nombre de usuario <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" /></p>
                                               
                    </div>
                    <div className="divBodyPersonalInfo">
                        <div className="divLeftPersonalInfo">
                            <img className="imgLeftPersonalInfo" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" />
                            <h2 className="usernameTxt">Nombre de Usuario</h2>
                             <input  type="text" placeholder="Nuevo nombre" />
                             <h2 className="rolTxt">"Rol"</h2>
                        </div>
                        <div className="divRightPersonalInfo">
                            <div className="top">    
                                <h1 className="tittle">Tus datos personales</h1>
                                <ul>
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número telefónico: </p>
                                            <input type="text" placeholder="+57 ( 321 ) - 747 5876." />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Correo electrónico: </p>
                                            <input type="text" placeholder="NombreU @ correo.ext" />
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
                                            <input type="text" placeholder="Respuesta pregunta" />

                                        </div>
                                    </li><br />
                                </ul>
                            </div>
                            <div className="bottomRegister">
                                <div className="flex">
                                    <div className="div">
                                        <p>¿Finalizaste tus cambios?.</p>
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
export default Actualiza;