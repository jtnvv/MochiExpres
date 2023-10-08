import React, { useState } from "react";
import * as IoIcons from "react-icons/io5";
import axios from "axios";

const Registro = () => {

    const [inputs, setInputs] = useState({
        idCliente:"",
        nombrecliente:"",
        correocliente:"",
        direccioncliente:"",
        telefonocliente:"",
        contrasenacliente:"",
        identificadorpregcliente:"",
        respuestapregcliente:"",
    });

    // const [err, setError] = useState(null);

    // const navigate = useNavigate();

    const handleChange = (e) => {
        
        setInputs((prev) =>({...prev,[e.target.name]:e.target.value}));
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try{
            const res = await axios.post("/auth/register", inputs);
            console.log("Ha salido bien :D ", res);
        }catch(err){
            console.log("Ha pasado un error D: ", err);
        }
        
    }

    return (
        <div className="content-flex">
            <div className="divContent">
                <div className="ItemsContainer-PersonalInfo">
                    <div className="divHeaderPersonalInfo">
                        <p><i><IoIcons.IoCaretBackOutline  className="IoIconsPersonalInfo"/></i> Volver</p>
                        
                        
                    </div>
                    <div className="divBodyPersonalInfo">
                        <div className="divLeftPersonalInfo">
                            <img className="imgLeftPersonalInfo" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" />
                            <h2 className="usernameTxt">Nombre de Usuario</h2>
                             <input required type="text" placeholder="Nuevo nombre" name="nombrecliente" onChange={handleChange}/>
                             <h2 className="rolTxt">"Rol"</h2>
                        </div>
                        <div className="divRightPersonalInfo">
                            <div className="top">    
                                <h1 className="tittle">Tus datos personales</h1>
                                <ul>
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número telefónico: </p>
                                            <input type="text" placeholder="+57 ( 321 ) - 747 5876." name="telefonocliente" onChange={handleChange}/>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Dirección: </p>
                                            <input type="text" placeholder="Calle/Avenida/Carrera ..." name="direccioncliente" onChange={handleChange}/>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Correo electrónico: </p>
                                            <input type="text" placeholder="NombreU @ correo.ext" name="correocliente" onChange={handleChange}/>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Contraseña: </p>
                                            <input type="password" placeholder="Contraseña" name="contrasenacliente" onChange={handleChange}/>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número identidad: </p>
                                            <input type="text" placeholder="123456789" name="idCliente" onChange={handleChange}/>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Pregunta de seguridad: </p>
                                            </div>
                                            <div className="p">
                                            
                                            <select name="identificadorpregcliente" onChange={handleChange}>
                                                <option value="0">None</option>    
                                                <option value="1">Cual es tu color favorito</option>
                                                <option value="2">Ciudad en la que se casaron tus padres</option>
                                                <option value="3">Nombre de tu primera mascota</option>
                                            </select>
                                            </div>
                                             <div className="p">
                                             <input type="text" placeholder="Respuesta pregunta" name="respuestapregcliente" onChange={handleChange}/>
                                             </div>


                                    </li><br />
                                </ul>
                            </div>
                            <div className="bottomRegister">
                                <div className="flex">
                                    <div className="div">
                                        <p>¿Todo listo?.</p>
                                        <button onClick={handleSubmit} type="submit">Registrarse!</button>
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
export default Registro;